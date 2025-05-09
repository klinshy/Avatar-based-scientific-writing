/// <reference types="@workadventure/iframe-api-typings" />
import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { checkPlayerMaterial, mySound, playRandomSound } from "./footstep";
import { getChatAreas } from "./chatArea";
import { quests, levelUp } from "./quests";

WA.onInit().then(async () => {
    console.log('loading main.ts');
    WA.controls.disableInviteButton();
    WA.controls.disableMapEditor();
    WA.controls.disableRoomList();

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
        let playerName: string = WA.player.name;
        console.log("Player name:", playerName);
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
            WA.room.area.onLeave(area.name).subscribe(() => {WA.chat.close();});
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

   
    // Display the current quest banner if a quest is active
    const currentQuestId = WA.player.state.currentQuest;
    const currentQuest = quests.find((q: { questId: string }) => q.questId === currentQuestId);
    if (currentQuest) {
        createQuestBanner(currentQuest.questId);
    }

    // Event listener for changes in the current quest
    WA.player.state.onVariableChange('currentQuest').subscribe((newQuestId) => {
        levelUp("notlog", 10);
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
                timeToClose: 0,
                closable: false
            });
        }
    }
});

WA.onInit().then(() => {
    WA.room.area.onEnter("mumblecore_1").subscribe(() => {
        const playerName = WA.player.name;
        WA.chat.sendChatMessage(`🎉 **Willkommen zurück ${playerName} !** 🎉 \n\n \n\nDu hast **Großes getan** für unsere Universität. Du hast den **Virus neutralisiert** und **Lord Modrevolt** ein für alle Mal aus unserem System verbannt. ⚔️ \n\n \n\nUnsere Universität **Notlog** ist endlich wieder funktionstüchtig und wir können weiter **digitale Lehr- und Lernmaterialien** im **Kondensatorium** produzieren. 💻📚 \n\n \n\nWir sind dir zutiefst zu Dank verpflichtet. 🙏 `, "Mumblecore");
    });
});

export {};

