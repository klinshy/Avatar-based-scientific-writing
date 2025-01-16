/// <reference types="@workadventure/iframe-api-typings" />
import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { checkPlayerMaterial, mySound, playRandomSound } from "./footstep";

WA.onInit().then(() => {console.log('loading main.ts')});
WA.onInit().then(() => {
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));
}).catch(e => console.error(e));

WA.onInit().then(async () => {
    WA.player.onPlayerMove(async ({ x, y, moving }) => {
      const material = await checkPlayerMaterial({ x, y });
      console.log(material);

      if (!material) {
      return mySound?.stop();
      }

      if (!moving && !material) {
      return mySound?.stop();
      } else {
      mySound?.stop();
      return playRandomSound(material);
      }
    });
    });


    WA.onInit().then(() => {
        WA.room.onEnterLayer('mumbelcore_1').subscribe(() => {
            const chatText = WA.state.mumbelcore_1 as string; 
            WA.chat.sendChatMessage(chatText,"Mumbelcore");
        });
    });



export {};