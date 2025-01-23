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
        WA.room.area.onEnter(area.name).subscribe(() => {
            WA.chat.sendChatMessage(area.chatText, area.npcName);
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

export {};