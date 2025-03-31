/// <reference types="@workadventure/iframe-api-typings" />
import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { checkPlayerMaterial, mySound, playRandomSound } from "./footstep";
import { getChatAreas } from "./chatArea";
import { quests, levelUp } from "./quests";

WA.onInit().then(async () => {
    console.log('loading main.ts');
    WA.controls.disableInviteButton();
    WA.controls.disableMapEditor();

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
    WA.onInit().then(async () => {
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
    });
    
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
        WA.controls.disablePlayerControls();
        WA.controls.disableRightClick();
        WA.room.hideLayer('fg-objects/stair-2');
        if (isAutoMoving) return;
        isAutoMoving = true;
        let result = await WA.player.moveTo(1199, 996);
        while (result.cancelled) {
            result = await WA.player.moveTo(1199, 996);
        }
        result = await WA.player.moveTo(1200, 900);
        while (result.cancelled) {
            result = await WA.player.moveTo(1200, 900);
        }
        WA.room.showLayer('fg-objects/stair-2');
        result = await WA.player.moveTo(1355, 1035);
        while (result.cancelled) {
            result = await WA.player.moveTo(1355, 1035);
            WA.controls.restorePlayerControls();
            WA.controls.restoreRightClick();
        }
        isAutoMoving = false;
    });

    // Event listener for entering the upstairs area from the lab
    WA.room.area.onEnter('upstairs_fromLab').subscribe(async () => {
        WA.room.showLayer('fg-objects/stair-2');
        WA.controls.disablePlayerControls();
        WA.controls.disableRightClick();
        if (isAutoMoving) return;
        isAutoMoving = true;
        let result = await WA.player.moveTo(1200, 900);
        while (result.cancelled) {
            result = await WA.player.moveTo(1200, 900);
        }
        result = await WA.player.moveTo(1199, 996);
        while (result.cancelled) {
            result = await WA.player.moveTo(1199, 996);
        }
        WA.room.hideLayer('fg-objects/stair-2');
        result = await WA.player.moveTo(1355, 871);
        while (result.cancelled) {
            result = await WA.player.moveTo(1355, 871);
            WA.controls.restorePlayerControls();
            WA.controls.restoreRightClick();
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
        WA.player.state.currentQuest = 'quest6';
    });

    // Display the current quest banner if a quest is active
    const currentQuestId = WA.player.state.currentQuest;
    const currentQuest = quests.find((q: { questId: string }) => q.questId === currentQuestId);
    if (currentQuest) {
        createQuestBanner(currentQuest.questId);
    }

    // Event listener for changes in the current quest
    WA.player.state.onVariableChange('currentQuest').subscribe((newQuestId) => {
        levelUp("notlog", 1);
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


WA.room.area.onLeave('H5P_video_1').subscribe(() => {
    console.log("Entered H5P_video_1 area, triggering quest5");
    WA.player.state.currentQuest = 'quest5';
});

export {};

