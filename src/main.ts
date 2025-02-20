/// <reference types="@workadventure/iframe-api-typings" />
import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { checkPlayerMaterial, mySound, playRandomSound } from "./footstep";
import { getChatAreas , } from "./chatArea";

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
<<<<<<< Updated upstream
=======
                    if (area.triggerQuest) {
                        // Get the current quest before updating it
                        const currentQuestId = WA.player.state.currentQuest;
                        const currentQuest = quests.find((q: { questId: string; questXp: number }) => q.questId === currentQuestId);
                        if (currentQuest) {
                            // Award the XP for the quest that was solved
                            levelUp(currentQuest.questId, currentQuest.questXp);
                        }
                        // Update the current quest only if the requirement is met
                        const requiredQuest = quests.find(q => q.questId === area.triggerQuest)?.requireQuest;
                        if (currentQuestId === requiredQuest) {
                            WA.player.state.currentQuest = area.triggerQuest;
                        }
                    }
>>>>>>> Stashed changes
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

let currentTask = 0;

const tasks = [
    {
        id: 'task1',
        text: 'Sprich mit Prof. McDongle',
        area: 'mcdongle_1'
    },
    {
        id: 'task2',
        text: 'Sprich mit Prof. Mumblecore am nördlichen Ende der großen Halle.',
        area: 'mumblecore_1'
    },
    {
        id: 'task3',
        text: 'Gehe runter ins Labor und sprechen Sie mit Prof. Sake',
        area: 'sake_1'
    },
    {
        id: 'task4',
        text: 'Schau dir das Video im Labor an',
        area: 'leaveNotlog'
    },
    {
        id: 'task5',
        text: 'Verlasse Notlog und betrete den Matrix Hub',
        area: 'leaveNotlog'
    }

];

function showTask(taskIndex: number) {
    const task = tasks[taskIndex];
    WA.ui.banner.openBanner({
        id: task.id,
        text: task.text,
        bgColor: '#1B1B29',
        textColor: '#FFFFFF',
        closable: false
    });
}

function completeTask(taskIndex: number) {
    if (taskIndex < tasks.length - 1) {
        currentTask++;
        showTask(currentTask);
    } else {
        WA.ui.banner.closeBanner();
    }
}

WA.onInit().then(() => {
    showTask(currentTask);

    for (const task of tasks) {
        WA.room.area.onLeave(task.area).subscribe(() => {
            if (tasks[currentTask].area === task.area) {
                completeTask(currentTask);
            }
<<<<<<< Updated upstream
        });
=======
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
>>>>>>> Stashed changes
    }
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
export {};