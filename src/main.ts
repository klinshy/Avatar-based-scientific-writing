/// <reference types="@workadventure/iframe-api-typings" />
import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { getChatAreas } from "./chatArea";
import { getLayersMap } from "@workadventure/scripting-api-extra/dist";

try {
    await bootstrapExtra();
    console.log('Scripting API Extra ready');
} catch (e) {
    console.error(e);
}

// QUESTS:
interface QuestArea {
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
    questId: string;
    questKey: string;
    questName: string;
    questXp: number;
    requireQuest: string;
    triggerQuest: string;
    questDescription: string;
}

async function getQuestAreas(): Promise<QuestArea[]> {
    try {
        const layers = await getLayersMap();
        const questAreas: QuestArea[] = [];
        for (const layer of layers.values()) {
            if (layer.type === "objectgroup") {
                for (const object of layer.objects) {
                    if (!object.properties) continue;
                    if (
                        object.properties.some(
                            (prop) => prop.name === "isQuest" && prop.value === true
                        )
                    ) {
                        const questId = object.properties.find(
                            (prop) => prop.name === "questId"
                        )?.value;
                        const questKey = object.properties.find(
                            (prop) => prop.name === "questKey"
                        )?.value;
                        const questName = object.properties.find(
                            (prop) => prop.name === "questName"
                        )?.value;
                        const questXpProp = object.properties.find(
                            (prop) => prop.name === "questXp"
                        );
                        const requireQuest = object.properties.find(
                            (prop) => prop.name === "requireQuest"
                        )?.value;
                        const triggerQuest = object.properties.find(
                            (prop) => prop.name === "triggerQuest"
                        )?.value ?? "";
                        const questDescription = object.properties.find(
                            (prop) => prop.name === "questDescription"
                        )?.value;
    
                        if (questId && questName) {
                            const xpValue = questXpProp?.value;
                            const questXp = xpValue ? parseInt(String(xpValue), 10) : 0;
                            questAreas.push({
                                name: object.name,
                                x: object.x,
                                y: object.y,
                                width: object.width ?? 0,
                                height: object.height ?? 0,
                                questId: String(questId),
                                questKey: String(questKey ?? ""),
                                questName: String(questName),
                                questXp,
                                requireQuest: String(requireQuest ?? ""),
                                triggerQuest: String(triggerQuest),
                                questDescription: String(questDescription ?? ""),
                            });
                        }
                    }
                }
            }
        }
        console.log("All retrieved quests:", questAreas);
        return questAreas;
  
    } catch (error) {
        console.error("Error while getting quest areas:", error);
        return [];
    }
}

function createQuestBanner(questId: string, quests: QuestArea[]) {
    const quest = quests.find((q) => q.questId === questId);
    if (quest) {
        WA.ui.banner.openBanner({
            id: quest.questId,
            text: quest.questDescription,
            bgColor: '#1B1B29',
            textColor: '#FFFFFF',
            closable: false
        });
    }
}

async function initQuests() {
    const quests = await getQuestAreas();
    // Store the current quest as the last quest for comparison on changes.
    let lastQuestId = String(WA.player.state.currentQuest);
    const currentQuest = quests.find((q) => q.questId === lastQuestId);
    
    // Only show banner if either no prerequisite is required, or the prerequisite matches lastQuestId.
    if (currentQuest && (!currentQuest.requireQuest || currentQuest.requireQuest === lastQuestId)) {
        createQuestBanner(currentQuest.questId, quests);
    }
    
    WA.player.state.onVariableChange("currentQuest").subscribe((newQuestIdRaw) => {
        const newQuestId = String(newQuestIdRaw);
        const quest = quests.find((q) => q.questId === newQuestId);
        // Only update if there's no prerequisite or if the prerequisite matches the previous quest.
        if (quest && (!quest.requireQuest || quest.requireQuest === lastQuestId)) {
            createQuestBanner(quest.questId, quests);
        }
        lastQuestId = newQuestId;
    });
}

const mapURL = WA.room.mapURL;
(async () => {
    // Map of map identifiers to their corresponding dynamic import functions.
    const mapActions: { [key: string]: () => Promise<void> } = {
        'notlog': async () => {
            const initNotlogScript = (await import('./notlog')).default;
            initNotlogScript();
        },
        'modules': async () => {
            const initModulesScript = (await import('./modules')).default;
            initModulesScript();
        },
        'finalChallenge': async () => {
            const initFinalChallengeScript = (await import('./finalChallenge')).default;
            initFinalChallengeScript();
        },
        'matrix': async () => {
            const initMatrixScript = (await import('./matrix')).default;
            initMatrixScript();
        }
    };

    // Loop through mapActions to dynamically load the appropriate script.
    for (const key in mapActions) {
        if (mapURL.includes(key)) {
            await mapActions[key]();
            return;
        }
    }
})();

// Get chat areas and set up event listeners for entering and leaving them
initQuests();

// Get chat areas and set up event listeners for entering and leaving them
(async () => {
    const chatAreas = await getChatAreas();
    for (const area of chatAreas) {
        let triggerMessage: any;

        // When player enters a chat area
        WA.room.area.onEnter(area.name).subscribe(() => {
            triggerMessage = WA.ui.displayActionMessage({
                message: `[LEERTASTE] drücken um mit ${area.npcName} zu sprechen.`,
                callback: () => {
                    WA.chat.sendChatMessage(area.chatText, area.npcName);
                    // If the area triggers a quest, update the current quest state
                    if (area.triggerQuest) {
                        WA.player.state.currentQuest = area.triggerQuest;
                    }
                }
            });
        });

        // When player leaves a chat area
        WA.room.area.onLeave(area.name).subscribe(() => {
            triggerMessage?.remove();
        });
    }
})();
