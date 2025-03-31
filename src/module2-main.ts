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
        if (WA.player.state.currentQuest === 'quest8') {
            WA.player.state.currentQuest = 'quest9';
        }
    });
});
WA.onInit().then(async () => {

    // On start: if module2 is already "2", paint the room green and remove the red layer
    if (WA.player.state.module2 === '2') {
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
        WA.player.state.currentQuest = 'quest16';
    }
    
    // Listen for terminal-related state changes
    WA.player.state.onVariableChange('terminal1').subscribe(async (newValue) => {
        if (newValue === "correct") {
            WA.player.state.module2 = '1';
            WA.chat.sendChatMessage("Code korrekt, fahre fort mit dem nächsten Raum!", "Zirze");
            WA.player.state.currentQuest = 'quest12';
            levelUp("modul_2", 10);
            const cowebsites = await WA.nav.getCoWebSites();
            for (const cowebsite of cowebsites) {
                cowebsite.close();
            }
        }
    });

    WA.player.state.onVariableChange('terminal2').subscribe(async (newValue) => {
        if (newValue === "correct") {
            WA.player.state.module2 = '2';
            WA.player.state.currentQuest = 'quest15';
            levelUp("modul_2", 10);
            const cowebsites = await WA.nav.getCoWebSites();
            for (const cowebsite of cowebsites) {
                cowebsite.close();
            }
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
            WA.player.state.currentQuest = 'quest16';
        }
    });
});
            // Hardcoded step-by-step subscriptions for each variable key
WA.onInit().then(() => {
            // Step 1: PlanungSelbstmanagement
     
            WA.player.state.onVariableChange('PlanungSelbstmanagement').subscribe((newValue) => {
                if (newValue === "solved") {
                    levelUp("modul_2", 10);
                    console.log(`Variable "PlanungSelbstmanagement" solved. Level up, +10XP`);
                    WA.player.state.currentQuest = "quest10";
                }
            });

            // Step 2: ThemenfindungGliederung (only if previous step solved)

            WA.player.state.onVariableChange('ThemenfindungGliederung').subscribe((newValue) => {
                if (newValue === "solved" ) {
        
                    levelUp("modul_2", 10);
                    console.log(`Variable "ThemenfindungGliederung" solved. Level up, +10XP`);
                    WA.player.state.currentQuest = "quest11";
                }
            });

            // Step 3: Lesen (only if previous step solved)

            WA.player.state.onVariableChange('Lesen').subscribe((newValue) => {
                if (newValue === "solved" ) {
      
                    levelUp("modul_2", 10);
                    console.log(`Variable "Lesen" solved. Level up, +10XP`);
                    WA.player.state.currentQuest = "quest14";
                }
            });

            // Step 4: finalQuizTwo (only if previous step solved)
            WA.player.state.onVariableChange('finalQuizTwo').subscribe((newValue) => {
                if (newValue === "solved" ) {
                    levelUp("modul_2", 10);
                    console.log(`Variable "finalQuizTwo" solved. Level up, +10XP`);
                    WA.player.state.currentQuest = "quest16";
                }
            });
        });
WA.onInit().then(() => {
            let literatureAreaEnterTime: number | undefined;

            WA.room.area.onEnter('2_3Literaturrecherche').subscribe(() => {
                literatureAreaEnterTime = Date.now();
                console.log('Entered literature area');
            });

            WA.room.area.onLeave('2_3Literaturrecherche').subscribe(() => {
                if (literatureAreaEnterTime && WA.player.state.Literaturrecherche !== "solved") {
                    const secondsSpent = (Date.now() - literatureAreaEnterTime) / 1000;
                    if (secondsSpent > 10) {
                        WA.player.state.Literaturrecherche = "solved";
                        WA.player.state.currentQuest = 'quest13';
                        levelUp("modul_2", 10);
                        console.log(`Spent ${secondsSpent} seconds in literature area. Level up, +10XP`);
                    }
                    literatureAreaEnterTime = undefined;
                }
            });});
export {};

