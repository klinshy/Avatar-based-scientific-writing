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
WA.room.area.onEnter('triggerM3Quests').subscribe(() => {
    WA.player.state.currentQuest = 'quest17' ;
});})

            
            // Listen for terminal-related state changes
            WA.player.state.onVariableChange('terminal-1').subscribe((newValue) => {
                if (newValue === true) {
                    WA.player.state.module3 = '1';
                    WA.chat.sendChatMessage("Schön, dass du wieder da bist! Beginne am besten mit Element 1. Plane für den zweiten Raum ca. 40 Minuten ein. Du kannst jederzeit aufhören und wieder zurückkommen. Vergiss nicht weiterhin nach den Zahlencodes in den Materialien Ausschau zu halten und dir diese zu notieren. Neben den Zahlencodes musst du auch wieder Wortschnipsel finden, die durch Lord Modrevolts Angriff durcheinandergeraten sind.  Viel Erfolg!", "Zirze");
                    WA.player.state.currentQuest = 'quest21';
                    levelUp("modul_3", 10);
                }
            });

            WA.player.state.onVariableChange('terminal-2').subscribe((newValue) => {
                if (newValue === true) {
                    WA.player.state.module3 = '2';
                    WA.player.state.currentQuest = 'quest25';
                    levelUp("modul_3", 10);
                }
            });
WA.player.state.onVariableChange('currentQuest').subscribe((newQuest) => {
    if (newQuest === "quest26") {
        WA.chat.sendChatMessage("Wow, das ging schnell! Du hast beide Räume gemeistert. Ich hoffe du kannst dich noch an alle Wortschnipsel erinnern. Diese musst du nun in richtiger Reihenfolge im Sicherheitsterminal eingeben. Falls du Hilfe brauchst, frag doch deine Kolleg*innen, ob ihr diese Aufgabe zusammen lösen könnt. Ich darf nicht zu viel verraten, aber eine gezielte Recherche könnte durchaus hilfreich sein. Wenn du oder ihr es schafft, können wir Lord Modrevolt endlich aus unserem System entfernen und unsere Sicherheitseinstellungen des Kondensatoriums wieder herstellen. ", "Zirze");
    }
});
            // When module3 changes to "2", paint the room green and remove the red layer
            WA.player.state.onVariableChange('module3').subscribe((newValue) => {
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
                    WA.chat.sendChatMessage("Prima, du hast weitere verlorene Wortschnipsel gefunden. Diese sind wichtig, um Lord Modrevolt ein für alle Mal aus unserem System zu verbannen. Merk sie dir gut: zu/ denken/ Art", "Zirze");
                }
            });
            // List of variable keys that trigger events to do something (tbd)
            const eventVariableKeys = [
                'Textarten',
                'Allgemeine Regeln',
                'Sprache',
                'Zitieren',
                'Literaturverzeichnis',
                'Literaturverwaltung',
                'finalQuizThree'
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
                        levelUp("modul_3", 10);
                        console.log(`Variable "${key}" solved. Level up, +10XP`);

                        // Set the quest based on the order
                        switch (currentStep) {
                            case 0:
                                WA.player.state.currentQuest = "quest18";
                                break;
                            case 1:
                                WA.player.state.currentQuest = "quest19";
                                break;
                            case 2:
                                WA.player.state.currentQuest = "quest20";
                                break;
                            case 3:
                                WA.player.state.currentQuest = "quest22";
                                break;
                            case 4:
                                WA.player.state.currentQuest = "quest23";
                                break;
                            case 5:
                                WA.player.state.currentQuest = "quest24";
                                break;
                            case 6:
                                WA.player.state.currentQuest = "quest26";
                        }

                        currentStep++;
                    }
                });
            }

            function setupAreaTimer(areaName: string, stateKey: string) {
                let areaEnterTime: number | undefined;
                WA.room.area.onEnter(areaName).subscribe(() => {
                    areaEnterTime = Date.now();
                });
                WA.room.area.onLeave(areaName).subscribe(() => {
                    if (areaEnterTime) {
                        const secondsSpent = (Date.now() - areaEnterTime) / 1000;
                        if (secondsSpent > 10) {
                            WA.player.state[stateKey] = "solved";
                        }
                        areaEnterTime = undefined;
                    }
                });
            }

            setupAreaTimer("3_2_1Zitieren", "Zitieren");
            setupAreaTimer("3_2_2Literaturverzeichnis", "Literaturverzeichnis");
            setupAreaTimer("3_3Literaturverwaltung", "Literaturverwaltung");
export {};

