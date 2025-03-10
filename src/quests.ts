
import { getLayersMap } from "@workadventure/scripting-api-extra/dist";

export interface QuestArea {
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
    const currentQuestId = WA.player.state.currentQuest;
    const currentQuest = quests.find((q) => q.questId === currentQuestId);
    if (currentQuest) {
        createQuestBanner(currentQuest.questId, quests);
    }
    
    WA.player.state.onVariableChange('currentQuest').subscribe((newQuestId) => {
        createQuestBanner(String(newQuestId), quests);
    });
}

export default {
    getQuestAreas,
    initQuests
};


const quests = [
    // Notlog
    {
        questName: 'Einführung in Notlog',
        questId: 'quest1',
        questDescription: 'Triff Prof. McDongle am Eingang von Notlog.',
        questXp: 100,
        requireQuest: null,
        questKey: 'notlog'
    },
    {
        questName: 'Erkundung des Saals',
        questId: 'quest2',
        questDescription: 'Sprich mit Prof. Mumblecore am nördlichen Ende der großen Halle.',
        questXp: 150,
        requireQuest: 'quest1',
        questKey: 'notlog'
    },
    {
        questName: 'Laborbesuch',
        questId: 'quest3',
        questDescription: 'Geh runter ins Labor und sprich mit Prof. Sake.',
        questXp: 200,
        requireQuest: 'quest2',
        questKey: 'notlog'
    },
    {
        questName: 'Das Video im Labor ansehen',
        questId: 'quest4',
        questDescription: 'Sehen dir das Video im Labor an.',
        questXp: 50,
        requireQuest: 'quest3',
        questKey: 'notlog'
    },
    {
        questName: 'Betreten Sie den Matrix Hub',
        questId: 'quest5',
        questDescription: 'Verlasse Notlog und betrete den Matrix Hub.',
        questXp: 250,
        requireQuest: 'quest4',
        questKey: 'notlog'
    },
    // Matrix Hub

{
    questName: "Durch das Chaos im Labor navigieren",
    questId: "modul2_quest1",
    questDescription: "Komm mit der Unordnung im Farblabor zurecht und finde heraus, wer das Chaos angerichtet hat.",
    questXp: 10,
    requireQuest: "quest5",
    questKey: "modul2"
},
{
    questName: "materialien ordnen",
    questId: "modul2_quest2",
    questDescription: "Bringe die Materialien von Alex in Ordnung und erhalte mehr Einblicke in den Kurs 'Wissenschaftliches Arbeiten'.",
    questXp: 10,
    requireQuest: "modul2_quest1",
    questKey: "modul2"
},
{
    questName: "Meistere 3.2",
    questId: "modul2_quest3",
    questDescription: "Schaffe es, 3.2 zu bewältigen, und erhalte Respekt für deinen Einsatz.",
    questXp: 10,
    requireQuest: "modul2_quest2",
    questKey: "modul2"
},
{
    questName: "Überwinde 3.3",
    questId: "modul2_quest4",
    questDescription: "Meistere das nächste Kapitel, 3.3, und lerne noch mehr von Alex' Materialien.",
    questXp: 10,
    requireQuest: "modul2_quest3",
    questKey: "modul2"
},