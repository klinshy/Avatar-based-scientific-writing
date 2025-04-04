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

    // On start: if module2 is already "2", update the room colors in the m2terminal2 region.
    if (WA.player.state.module2 === '2') {
        const greenTiles: any[] = [];
        const redTiles: any[] = [];
        for (let x = 4; x <= 15; x++) {
            for (let y = 47; y <= 89; y++) {
                greenTiles.push({ x, y, tile: "green", layer: "green" });
                redTiles.push({ x, y, tile: null, layer: "red" });
            }
        }
        WA.room.setTiles(greenTiles);
        WA.room.setTiles(redTiles);
        WA.chat.sendChatMessage("Prima, du hast die ersten verlorenen Wortschnipsel gefunden. Diese sind wichtig, um Lord Modrevolt ein für alle Mal aus unserem System zu verbannen. Merk sie dir gut: ist / Wissenschaft / mehr", "Zirze");
    }
    
    // Listen for terminal-related state changes
    WA.player.state.onVariableChange('m2terminal1').subscribe(async (newValue) => {
        // Set module2 to "1" for terminal1.
        WA.player.state.module2 = '1';
        if (newValue === "correct") {
            WA.chat.sendChatMessage("Code korrekt, fahre fort mit dem nächsten Raum!", "Zirze");
            WA.player.state.currentQuest = 'quest12';
            // Change tiles in the m2terminal1 region: from (4,71) to (15,89)
            const greenTiles: any[] = [];
            const redTiles: any[] = [];
            for (let x = 4; x <= 15; x++) {
                for (let y = 71; y <= 89; y++) {
                    greenTiles.push({ x, y, tile: "green", layer: "green" });
                    redTiles.push({ x, y, tile: null, layer: "red" });
                }
            }
            WA.room.setTiles(greenTiles);
            WA.room.setTiles(redTiles);
            const cowebsites = await WA.nav.getCoWebSites();
            for (const cowebsite of cowebsites) {
                cowebsite.close();
            }
        }
    });

    WA.player.state.onVariableChange('m2terminal2').subscribe(async (newValue) => {
        // Set module2 to "2" for terminal2.
        WA.player.state.module2 = '2';
        if (newValue === "correct") {
            WA.player.state.currentQuest = 'quest15';
            // Change tiles in the m2terminal2 region: from (4,47) to (15,70)
            const greenTiles: any[] = [];
            const redTiles: any[] = [];
            for (let x = 4; x <= 15; x++) {
                for (let y = 47; y <= 89; y++) {
                    greenTiles.push({ x, y, tile: "green", layer: "green" });
                    redTiles.push({ x, y, tile: null, layer: "red" });
                }
            }
            WA.room.setTiles(greenTiles);
            WA.room.setTiles(redTiles);
            const cowebsites = await WA.nav.getCoWebSites();
            for (const cowebsite of cowebsites) {
                cowebsite.close();
            }
        }
    });

    // When module2 changes to "2", update the room colors in the m2terminal2 region.
    WA.player.state.onVariableChange('module2').subscribe((newValue) => {
        if (newValue === '2') {
            const greenTiles: any[] = [];
            const redTiles: any[] = [];
            for (let x = 4; x <= 15; x++) {
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
   
     
            WA.player.state.onVariableChange('PlanungSelbstmanagement').subscribe((newValue) => {
                if (newValue === "solved") {
                    levelUp("modul_2", 10);
                    console.log(`Variable "PlanungSelbstmanagement" solved. Level up, +10XP`);
                    WA.player.state.currentQuest = "quest10";
                }
            });

       

            WA.player.state.onVariableChange('ThemenfindungGliederung').subscribe((newValue) => {
                if (newValue === "solved" ) {
        
                    levelUp("modul_2", 10);
                    console.log(`Variable "ThemenfindungGliederung" solved. Level up, +10XP`);
                    WA.player.state.currentQuest = "quest11";
                }
            });

    

            WA.player.state.onVariableChange('Lesen').subscribe((newValue) => {
                if (newValue === "solved" ) {
      
                    levelUp("modul_2", 10);
                    console.log(`Variable "Lesen" solved. Level up, +10XP`);
                    WA.player.state.currentQuest = "quest14";
                }
            });
            WA.player.state.onVariableChange('Literaturrecherche').subscribe((newValue) => {
                if (newValue === "solved" ) {
      
                    levelUp("modul_2", 10);
                    console.log(`Variable "Literaturrecherche" solved. Level up, +10XP`);
                    WA.player.state.currentQuest = "quest13";
                }
            });

            // Step 4: finalQuizTwo (only if previous step solved)
            WA.player.state.onVariableChange('Abschlussquiz2').subscribe((newValue) => {
                if (newValue === "solved" ) {
                    levelUp("modul_2", 10);
                    console.log(`Variable "finalQuizTwo" solved. Level up, +10XP`);
                    WA.player.state.currentQuest = "quest16";
                }
            });
        });

export {};

