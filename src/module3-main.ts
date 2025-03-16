/// <reference types="@workadventure/iframe-api-typings" />
import { checkPlayerMaterial, mySound, playRandomSound } from "./footstep";
import { getChatAreas } from "./chatArea";
import { levelUp, quests } from "./quests";
import { bootstrapExtra, getLayersMap } from "@workadventure/scripting-api-extra";


WA.onInit().then(async () => {
    
    try {
        // Initialize the Scripting API Extra
        await bootstrapExtra();
        console.log('Scripting API Extra ready');
    } catch (e) {
        console.error(e);
    }
    // Get chat areas and set up event listeners for entering and leaving them
    const chatAreas = await getChatAreas();
    for (const area of chatAreas) {
        let triggerMessage: any;

        // When player enters a chat area
        WA.room.area.onEnter(area.name).subscribe(() => {
            triggerMessage = WA.ui.displayActionMessage({
                message: `[LEERTASTE] drücken um mit ${area.npcName} zu sprechen.`,
                callback: () => {
                    WA.chat.sendChatMessage(area.chatText, area.npcName);
                    if (area.triggerQuest) {
                        const currentQuest = WA.player.state.currentQuest;
                        const requiredQuest = quests.find((q: { questId: string }) => q.questId === area.triggerQuest)?.requireQuest;
                        if (currentQuest === requiredQuest) {
                            WA.player.state.currentQuest = area.triggerQuest;
                        }
                    }
                }
            });
        });

        // When player leaves a chat area
        WA.room.area.onLeave(area.name).subscribe(() => {
            if (triggerMessage) {
                triggerMessage.remove();
                WA.chat.close();
            }
        });
    }

    // Event listener for player movement to play footstep sounds
    WA.player.onPlayerMove(async ({ x, y, moving }) => {
        const material = await checkPlayerMaterial({ x, y });
        if (!material) {
            mySound?.stop();
            return;
        }

        if (!moving && !material) {
            mySound?.stop();
            return;
        } else {
            mySound?.stop();
            playRandomSound(material);
        }
    });


    // Display the current quest banner if a quest is active
    const currentQuestId = WA.player.state.currentQuest;
    const currentQuest = quests.find((q: { questId: string }) => q.questId === currentQuestId);
    if (currentQuest) {
        createQuestBanner(currentQuest.questId);
    }

    // Event listener for changes in the current quest
    WA.player.state.onVariableChange('currentQuest').subscribe((newQuestId) => {
        const newQuest = quests.find((q: { questId: string }) => q.questId === newQuestId);
        if (newQuest) {
            createQuestBanner(newQuest.questId);
        }
    });

    // Function to create a quest banner
    function createQuestBanner(questId: string) {
        const quest = quests.find((q: { questId: string }) => q.questId === questId);
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
});

interface WorkbookArea {
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
    XP: string;
    completionMessage: string;
    h5pPath: string;
    messageNpc: string;
    moduleMax: string;
    moduleName: string;
    workbookName: string;
}

async function getWorkbookAreas(): Promise<WorkbookArea[]> {
    try {
        const layers = await getLayersMap();
        const areas: WorkbookArea[] = [];

        for (const layer of layers.values()) {
            if (layer.type === "objectgroup") {
                for (const object of layer.objects) {
                    if (!object.properties) continue;
                    if (
                        object.properties.some(
                            (prop) => prop.name === "isWorkbook" && prop.value === true
                        )
                    ) {
                        const XP = object.properties.find(
                            (prop) => prop.name === "XP"
                        )?.value;
                        const completionMessage = object.properties.find(
                            (prop) => prop.name === "completionMessage"
                        )?.value;
                        const h5pPath = object.properties.find(
                            (prop) => prop.name === "h5pPath"
                        )?.value;
                        const messageNpc = object.properties.find(
                            (prop) => prop.name === "messageNpc"
                        )?.value;
                        const moduleMax = object.properties.find(
                            (prop) => prop.name === "moduleMax"
                        )?.value;
                        const moduleName = object.properties.find(
                            (prop) => prop.name === "moduleName"
                        )?.value;
                        const workbookName = object.properties.find(
                            (prop) => prop.name === "workbookName"
                        )?.value;

                        if (h5pPath && moduleName) {
                            areas.push({
                                name: object.name,
                                x: object.x,
                                y: object.y,
                                width: object.width ?? 0,
                                height: object.height ?? 0,
                                XP: String(XP),
                                completionMessage: String(completionMessage),
                                h5pPath: String(h5pPath),
                                workbookName: String(workbookName),
                                messageNpc: String(messageNpc),
                                moduleMax: String(moduleMax),
                                moduleName: String(moduleName),
                            });
                        }
                    }
                }
            }
        }
        console.log("Found workbook areas:", areas);
        return areas;
    } catch (error) {
        console.error("Error while getting workbook areas:", error);
        return [];
    }
};


   
        
        // Get workbook areas and set up event listeners for entering and leaving them
        const workbookAreas = await getWorkbookAreas();
        for (const area of workbookAreas) {
                let messagePrompt: any;

                WA.room.area.onEnter(area.name).subscribe({ next: () => {
                    messagePrompt = WA.ui.displayActionMessage({
                        message: "Drücke LEERTASTE zum Öffnen des Workbooks",
                        callback: () => {
                            WA.ui.modal.openModal({
                                title: area.moduleName,
                                src: area.h5pPath,
                                allowApi: true,
                                position: "left",
                                allow: null
                            });
                        }
                    });
                
                   
                }});

                // When player leaves a workbook area
                WA.room.area.onLeave(area.moduleName).subscribe(() => {
                        if (messagePrompt) {
                                messagePrompt.remove();
                                WA.chat.close();
                        }
                });
        }
        // Single dynamic tile update system
        interface ModuleTileConfig {
            moduleKey: string;
            triggerValue: string;
            startX: number;
            endX: number;
            startY: number;
            endY: number;
        }

        const moduleConfigs: ModuleTileConfig[] = [
            { moduleKey: "module_3_1", triggerValue: "3", startX: 4, endX: 15, startY: 71, endY: 89 },
            { moduleKey: "module_3_2", triggerValue: "4", startX: 4, endX: 15, startY: 47, endY: 85 }
        ];

        function updateTiles(config: ModuleTileConfig) {
            const { moduleKey, triggerValue, startX, endX, startY, endY } = config;
            if (WA.player.state[moduleKey] !== triggerValue) return;
            const green: any[] = [], red: any[] = [];
            for (let x = startX; x <= endX; x++) {
            for (let y = startY; y <= endY; y++) {
                green.push({ x, y, tile: "green", layer: "green" });
                red.push({ x, y, tile: null, layer: "red" });
            }
            }
            WA.room.setTiles(green);
            WA.room.setTiles(red);
        }

        WA.onInit().then(() => {
            // Prepare module_3_2 state
            WA.player.state.module_1_1 = {};
            
            // Initial updates
            moduleConfigs.forEach(config => updateTiles(config));
        });

        // Subscribe to changes
        moduleConfigs.forEach(config => {
            WA.player.state.onVariableChange(config.moduleKey).subscribe((newValue) => {
            if (newValue === config.triggerValue) updateTiles(config);
            });
        });
        // List of variable keys that trigger events to do something (tbd)
        const eventVariableKeys = [
            'Textarten',
            'allgemeineRegeln',
            'Sprache',
            'Zitiren',
            'ZitierenImText',
            'Literaturverzeichnis',
            'Literaturverwaltung'
             // The key used to track the current quest state
            // Add additional keys here when needed
        ];

        // Subscribe to changes for each variable key
        for (const key of eventVariableKeys) {
            WA.player.state.onVariableChange(key).subscribe((newValue) => {
                
                levelUp("modul_3",10)
                console.log(`Variable "${key}" changed to:`, newValue, "Level up, +10XP");
            });
        }

export {};

