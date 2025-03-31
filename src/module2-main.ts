/// <reference types="@workadventure/iframe-api-typings" />
import { checkPlayerMaterial, mySound, playRandomSound } from "./footstep";
import { getChatAreas } from "./chatArea";
import { levelUp, quests } from "./quests";
import { bootstrapExtra } from "@workadventure/scripting-api-extra";

WA.onInit().then(async () => {
    try {
        // Initialize the Scripting API Extra
        await bootstrapExtra();
        WA.controls.disableInviteButton();
        WA.controls.disableMapEditor();
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
WA.onInit().then(async () => {
WA.room.area.onEnter('triggerM2Quests').subscribe(() => {
    WA.player.state.currentQuest = 'quest9' ;
});})

            
            // Listen for terminal-related state changes
            WA.player.state.onVariableChange('terminal-1').subscribe((newValue) => {
                if (newValue === true) {
                    WA.player.state.module2 = '1';
                    WA.chat.sendChatMessage("Code korrekt, fahre fort mit dem nächsten Raum!", "Zirze");
                    WA.player.state.currentQuest = 'quest12';
                    levelUp("modul_2", 10);
                }
            });

            WA.player.state.onVariableChange('terminal-2').subscribe((newValue) => {
                if (newValue === true) {
                    WA.player.state.module2 = '2';
                    WA.player.state.currentQuest = 'quest15';
                    levelUp("modul_2", 10);
                }
            });

            // When module2 changes to "2", paint the room green and remove the red layer
            WA.player.state.onVariableChange('module2').subscribe((newValue) => {
                if (newValue === '2') {
                    const greenTiles: any[] = [];
                    const redTiles: any[] = [];
                    for (let x = 0; x <= 19; x++) {
                        for (let y = 47; y <= 89; y++) {
                            greenTiles.push({ x, y, tile: "green", layer: "green" });
                            redTiles.push({ x, y, tile: null, layer: "red" });
                        }
                    }
                    WA.room.setTiles(greenTiles);
                    WA.room.setTiles(redTiles);
                    WA.chat.sendChatMessage("Prima, du hast die ersten verlorenen Wortschnipsel gefunden. Diese sind wichtig, um Lord Modrevolt ein für alle Mal aus unserem System zu verbannen. Merk sie dir gut: ist / Wissenschaft / mehr", "Zirze");
                }
            });
            // List of variable keys that trigger events to do something (tbd)
            const eventVariableKeys = [
                'PlanungSelbstmanagement',
                'ThemenfindungGliederung',
                'Literaturrecherche',
                'Lesen'
            ];

            // Object to track whether each key was solved
            const solvedStatus: { [key: string]: boolean } = {};
            eventVariableKeys.forEach(key => solvedStatus[key] = false);

            // Index to enforce the solving order
            let currentStep = 0;

            // Subscribe to changes for each variable key
            for (const key of eventVariableKeys) {
                WA.player.state.onVariableChange(key).subscribe((newValue) => {
                    // Only trigger if the event turns to "solved" and if it’s the expected key in the order
                    if (newValue === "solved" && key === eventVariableKeys[currentStep] && !solvedStatus[key]) {
                        solvedStatus[key] = true;
                        levelUp("modul_2", 10);
                        console.log(`Variable "${key}" solved. Level up, +10XP`);

                        // Set the quest based on the order
                        switch (currentStep) {
                            case 0:
                                WA.player.state.currentQuest = "quest10";
                                break;
                            case 1:
                                WA.player.state.currentQuest = "quest11";
                                break;
                            case 2:
                                WA.player.state.currentQuest = "quest13";
                                break;
                            case 3:
                                WA.player.state.currentQuest = "quest14";
                                break;
                        }

                        currentStep++;
                    }
                });
            }

            let literatureAreaEnterTime: number | undefined;

            WA.room.area.onEnter('2_3Literaturrecherche').subscribe(() => {
                literatureAreaEnterTime = Date.now();
            });

            WA.room.area.onLeave('2_3Literaturrecherche').subscribe(() => {
                if (literatureAreaEnterTime) {
                    const secondsSpent = (Date.now() - literatureAreaEnterTime) / 1000;
                    if (secondsSpent > 10) {
                        WA.player.state.Literaturrecherche = "solved";
                    }
                    literatureAreaEnterTime = undefined;
                }
            });
export {};

