import { getLayersMap } from "@workadventure/scripting-api-extra/dist";

interface ChatArea {
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  chatText: string;
  npcName: string;
}



async function getChatAreas(): Promise<ChatArea[]> {
  try {
    const layers = await getLayersMap();
    const areas: ChatArea[] = [];

    for (const layer of layers.values()) {
      if (layer.type === "objectgroup") {
        for (const object of layer.objects) {
          if (!object.properties) continue;
          if (
            object.properties.some(
              (prop) => prop.name === "isNpc" && prop.value === true
            )
          ) {
            const chatText = object.properties.find(
              (prop) => prop.name === "chatText"
            )?.value;
            const npcName = object.properties.find(
              (prop) => prop.name === "npcName"
            )?.value;

            if (chatText && npcName) {
              areas.push({
                name: object.name,
                x: object.x,
                y: object.y,
                width: object.width ?? 0,
                height: object.height ?? 0,
                chatText: String(chatText),
                npcName: String(npcName),
              });
            }
          }
        }
      }
    }
    console.log("Found chat areas:", areas);
    return areas;
  } catch (error) {
    console.error("Error while getting chat areas:", error);
    return [];
  }
}


export { getChatAreas };
