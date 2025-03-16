/// <reference types="@workadventure/iframe-api-typings" />
import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { checkPlayerMaterial, mySound, playRandomSound } from "./footstep";
import { getChatAreas } from "./chatArea";
import { quests, levelUp } from "./quests";

WA.onInit().then(async () => {
    console.log('loading main.ts');

    // Initialize the first quest if not already set
    if (!WA.player.state.currentQuest) {
        WA.player.state.currentQuest = 'quest1';
    }
    levelUp("notlog", 0);

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

    // Event listener for entering the downstairs area to the lab
    WA.room.area.onEnter('downstairs_toLab').subscribe(async () => {
        WA.room.hideLayer('fg-objects/stair-2');
        if (isAutoMoving) return;
        isAutoMoving = true;
        let result = await WA.player.moveTo(1300, 1728);
        while (result.cancelled) {
            result = await WA.player.moveTo(1300, 1728);
        }
        result = await WA.player.moveTo(1325, 1643);
        while (result.cancelled) {
            result = await WA.player.moveTo(1325, 1643);
        }
        WA.room.showLayer('fg-objects/stair-2');
        result = await WA.player.moveTo(1503, 1754);
        while (result.cancelled) {
            result = await WA.player.moveTo(1503, 1754);
        }
        isAutoMoving = false;
    });

    // Event listener for entering the upstairs area from the lab
    WA.room.area.onEnter('upstairs_fromLab').subscribe(async () => {
        WA.room.showLayer('fg-objects/stair-2');
        if (isAutoMoving) return;
        isAutoMoving = true;
        let result = await WA.player.moveTo(1325, 1643);
        while (result.cancelled) {
            result = await WA.player.moveTo(1325, 1643);
        }
        result = await WA.player.moveTo(1300, 1728);
        while (result.cancelled) {
            result = await WA.player.moveTo(1300, 1728);
        }
        WA.room.hideLayer('fg-objects/stair-2');
        result = await WA.player.moveTo(1513, 1568);
        while (result.cancelled) {
            result = await WA.player.moveTo(1513, 1568);
        }
        isAutoMoving = false;
    });

    // Check if the player has solved the notlog quest and is not an admin
    const solvedNotlog = WA.player.state.solvedNotlog;
    const isAdmin = WA.player.tags.includes('admin');
    const mapURL = WA.room.mapURL;

    console.log("solvedNotlog:", solvedNotlog);
    console.log("isAdmin:", isAdmin);
    console.log("mapURL:", mapURL);

    if (solvedNotlog === true && !isAdmin && mapURL.includes('notlog') && !mapURL.includes('localhost')) {
        console.log("Map URL: ", mapURL);
        // Teleport the player to the entry named "matrix-hub"
        WA.nav.goToRoom("./matrix-hub.tmj");
    }

    // Event listener for entering the notlog area
    WA.room.area.onEnter('notlog').subscribe(() => {
        console.log("Entered notlog area");
        if (solvedNotlog === true && !isAdmin) {
            console.log("Map URL: ", mapURL);
            if (!mapURL.includes('localhost')) {
                // Teleport the player to the entry named "matrix-hub"
                WA.nav.goToRoom("./matrix-hub.tmj");
            }
        }
    });

    // Event listener for leaving the notlog area
    WA.room.area.onEnter('leaveNotlog').subscribe(() => {
        console.log("Leaving notlog area");
        WA.player.state.solvedNotlog = true;
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

// Variable to track if the player is auto-moving
let isAutoMoving = false;

WA.onInit().then(() => {

    const currentModule3_1 = WA.player.state.module_3_1;
    WA.player.state.module_3_1 = currentModule3_1;
});

WA.player.state.onVariableChange("module_3_1").subscribe((newValue) => {
    if (newValue === "3") {
        const greenTiles = [];
        const redTiles = [];
        for (let x = 4; x <= 15; x++) {
            for (let y = 71; y <= 89; y++) {
                greenTiles.push({ x, y, tile: "green", layer: "green" });
                redTiles.push({ x, y, tile: null, layer: "red" });
            }
        }
        WA.room.setTiles(greenTiles);
        WA.room.setTiles(redTiles);
    }
});
WA.onInit().then(() => {
    const Module_3_2: any = {}; // initialize Module_1_1 with a default value
    WA.player.state.module_1_1 = Module_3_2;
});

WA.player.state.onVariableChange("module_3_2").subscribe((newValue) => {
    if (newValue === "4") {
        const greenTiles = [];
        const redTiles = [];
        for (let x = 4; x <= 15; x++) {
            for (let y = 47; y <= 85; y++) {
                greenTiles.push({ x, y, tile: "green", layer: "green" });
                redTiles.push({ x, y, tile: null, layer: "red" });
            }
        }
        WA.room.setTiles(greenTiles);
        WA.room.setTiles(redTiles);
    }
});


export {};

