import { getLayersMap } from "@workadventure/scripting-api-extra/dist";

interface WorkbookArea {
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  XP: string;
  completionMessage: string;
  h5pPath: string;
  messageNpc: string;
  moduleMax: string;
  moduleName: string;
}

async function getWorkbookAreas(): Promise<WorkbookArea[]> {
  try {
    const layers = await getLayersMap();
    const areas: WorkbookArea[] = [];

    for (const layer of layers.values()) {
      if (layer.type === "objectgroup") {
        for (const object of layer.objects) {
          if (!object.properties) continue;
          if (
            object.properties.some(
              (prop) => prop.name === "isWorkbook" && prop.value === true
            )
          ) {
            const XP = object.properties.find(
              (prop) => prop.name === "XP"
            )?.value;
            const completionMessage = object.properties.find(
              (prop) => prop.name === "completionMessage"
            )?.value;
            const h5pPath = object.properties.find(
              (prop) => prop.name === "h5pPath"
            )?.value;
            const messageNpc = object.properties.find(
              (prop) => prop.name === "messageNpc"
            )?.value;
            const moduleMax = object.properties.find(
              (prop) => prop.name === "moduleMax"
            )?.value;
            const moduleName = object.properties.find(
              (prop) => prop.name === "moduleName"
            )?.value;

            if (h5pPath && moduleName) {
              areas.push({
                name: object.name,
                x: object.x,
                y: object.y,
                width: object.width ?? 0,
                height: object.height ?? 0,
                XP: String(XP),
                completionMessage: String(completionMessage),
                h5pPath: String(h5pPath),
                messageNpc: String(messageNpc),
                moduleMax: String(moduleMax),
                moduleName: String(moduleName),
              });
            }
          }
        }
      }
    }
    console.log("Found workbook areas:", areas);
    return areas;
  } catch (error) {
    console.error("Error while getting workbook areas:", error);
    return [];
  }
}

export { getWorkbookAreas };
