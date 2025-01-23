/// <reference types="@workadventure/iframe-api-typings" />
import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { checkPlayerMaterial, mySound, playRandomSound } from "./footstep";
import { getChatAreas , } from "./chatArea";
import { quests, levelUp } from "./quests";

WA.onInit().then(() => {
    if (!WA.player.state.currentQuest) {
        WA.player.state.currentQuest = 'quest1'; //initialize the first quest
    }
    levelUp("notlog",0);
});



WA.onInit().then(() => {console.log('loading main.ts')});
WA.onInit().then(() => {
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));
}).catch(e => console.error(e));

WA.onInit().then(async () => {
    const chatAreas = await getChatAreas();
    for (const area of chatAreas) {
        let triggerMessage: any;

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

        WA.room.area.onLeave(area.name).subscribe(() => {
            if (triggerMessage) {
                triggerMessage.remove();
            }
        });
    }
});
//stepFX related stuff
WA.onInit().then(async () => {
    WA.player.onPlayerMove(async ({ x, y, moving }) => {
        const material = await checkPlayerMaterial({ x, y });
        console.log(material);

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
});

let isAutoMoving = false;

//misc stuff
WA.onInit().then(() => {
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
});

WA.onInit().then(() => {
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
});


WA.onInit().then(async () => {
    const solvedNotlog = WA.player.state.solvedNotlog;
    const isAdmin = WA.player.tags.includes('admin');
    if (solvedNotlog && !isAdmin) {
        WA.onInit().then(() => {
            console.log("Map URL: ", WA.room.mapURL);
            if (!WA.room.mapURL.includes('localhost')) {
                // Let's teleport the player to the entry named "matrix-hub"
                WA.nav.goToRoom("./matrix-hub.tmj");
            }
        });
    }
});

WA.onInit().then(() => {
    WA.room.area.onEnter('leaveNotlog').subscribe(() => {
        WA.player.state.solvedNotlog = false;
    });
});

// Quests
WA.onInit().then(() => {
    const currentQuestId = WA.player.state.currentQuest;
    const currentQuest = quests.find((q: { questId: string }) => q.questId === currentQuestId);
    if (currentQuest) {
       createQuestBanner(currentQuest.questId);
    }

    WA.player.state.onVariableChange('currentQuest').subscribe((newQuestId) => {
        const newQuest = quests.find((q: { questId: string }) => q.questId === newQuestId);
        if (newQuest) {createQuestBanner(newQuest.questId);
        }
    });

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


export {};