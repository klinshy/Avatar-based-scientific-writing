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
        if (WA.player.state.currentQuest === 'quest16') {
            WA.player.state.currentQuest = 'quest17';
        }
    });
});








WA.onInit().then(async () => {

    // On start: if module2 is already "2", update the room colors in the m2terminal2 region.
    if (WA.player.state.module3 === '2') {
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
        WA.chat.sendChatMessage("Prima, du hast weitere verlorene Wortschnipsel gefunden. Diese sind wichtig, um Lord Modrevolt ein für alle Mal aus unserem System zu verbannen. Merk sie dir gut: zu/ denken/ Art", "Zirze");
    }
    
    // Listen for terminal-related state changes
    WA.player.state.onVariableChange('m3terminal1').subscribe(async (newValue) => {
        // Set module2 to "1" for terminal1.
        WA.player.state.module3 = '1';
        if (newValue === "correct") {
            WA.chat.sendChatMessage("Schön, dass du wieder da bist! Beginne am besten mit Element 1. Plane für den zweiten Raum ca. 40 Minuten ein. Du kannst jederzeit aufhören und wieder zurückkommen. Vergiss nicht weiterhin nach den Zahlencodes in den Materialien Ausschau zu halten und dir diese zu notieren. Neben den Zahlencodes musst du auch wieder Wortschnipsel finden, die durch Lord Modrevolts Angriff durcheinandergeraten sind.  Viel Erfolg!", "Zirze");
            WA.player.state.currentQuest = 'quest21';
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

    WA.player.state.onVariableChange('m3terminal2').subscribe(async (newValue) => {
        // Set module2 to "2" for terminal2.
        WA.player.state.module3 = '2';
        if (newValue === "correct") {
            WA.player.state.currentQuest = '';
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
    WA.player.state.onVariableChange('module3').subscribe((newValue) => {
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
            WA.chat.sendChatMessage("Prima, du hast weitere verlorene Wortschnipsel gefunden. Diese sind wichtig, um Lord Modrevolt ein für alle Mal aus unserem System zu verbannen. Merk sie dir gut: zu/ denken/ Art", "Zirze");
            WA.player.state.currentQuest = 'quest25';
        }
    });
});
       


WA.player.state.onVariableChange('currentQuest').subscribe((newQuest) => {
    if (newQuest === "quest26") {
        WA.chat.sendChatMessage("Wow, das ging schnell! Du hast beide Räume gemeistert. Ich hoffe du kannst dich noch an alle Wortschnipsel erinnern. Diese musst du nun in richtiger Reihenfolge im Sicherheitsterminal eingeben. Falls du Hilfe brauchst, frag doch deine Kolleg*innen, ob ihr diese Aufgabe zusammen lösen könnt. Ich darf nicht zu viel verraten, aber eine gezielte Recherche könnte durchaus hilfreich sein. Wenn du oder ihr es schafft, können wir Lord Modrevolt endlich aus unserem System entfernen und unsere Sicherheitseinstellungen des Kondensatoriums wieder herstellen. ", "Zirze");
    }
});
 

            // Hardcoded subscriptions for each event variable key in the required order
    
    WA.player.state.onVariableChange('Textarten').subscribe((newValue) => {
        if (newValue === "solved") {
            levelUp("modul_3", 10);
            console.log(`Variable "Textarten" solved. Level up, +10XP`);
            WA.player.state.currentQuest = "quest18";
        }
    });

    WA.player.state.onVariableChange('AllgemeineRegeln').subscribe((newValue) => {
        if (newValue === "solved") {
            levelUp("modul_3", 10);
            console.log(`Variable "AllgemeineRegeln" solved. Level up, +10XP`);
            WA.player.state.currentQuest = "quest19";
        }
    });

    WA.player.state.onVariableChange('Sprache').subscribe((newValue) => {
        if (newValue === "solved") {
            levelUp("modul_3", 10);
            console.log(`Variable "Sprache" solved. Level up, +10XP`);
            WA.player.state.currentQuest = "quest20";
        }
    });

    WA.player.state.onVariableChange('Zitieren').subscribe((newValue) => {
        if (newValue === "solved") {
            levelUp("modul_3", 10);
            console.log(`Variable "Zitieren" solved. Level up, +10XP`);
            WA.player.state.currentQuest = "quest22";
        }
    });

    WA.player.state.onVariableChange('Literaturverzeichnis').subscribe((newValue) => {
        if (newValue === "solved") {
            levelUp("modul_3", 10);
            console.log(`Variable "Literaturverzeichnis" solved. Level up, +10XP`);
            WA.player.state.currentQuest = "quest23";
        }
    });

    WA.player.state.onVariableChange('Literaturverwaltung').subscribe((newValue) => {
        if (newValue === "solved") {
            levelUp("modul_3", 10);
            console.log(`Variable "Literaturverwaltung" solved. Level up, +10XP`);
            WA.player.state.currentQuest = "quest24";
        }
    });

    WA.player.state.onVariableChange('Abschlussquiz3').subscribe((newValue) => {
        if (newValue === "solved") {
            levelUp("modul_3", 10);
            console.log(`Variable "finalQuizThree" solved. Level up, +10XP`);
            WA.player.state.currentQuest = "quest26";
        }
    });
export {};

