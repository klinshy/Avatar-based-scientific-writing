//the general idea is to load up module data and make it available to this function from an external source, also referenced by the main.ts file and any others that might need it
//IDEALLY, moduleMax would be derived directly from the config file below
//TODO THIS IS WRONG, and will not work because this script is not a javascript module
//import { modulesConfig } from "../../src/models/modules-config";
console.log("🚩 Completion Event Script loaded");
function handleModuleCompletionEvents(
  message,
  messageNpc,
  moduleName,
  moduleMax,
  workbookName
) {

  // Ensure H5P and its externalDispatcher are available
  if (!window.H5P || !H5P.externalDispatcher) {
    console.error("H5P or its externalDispatcher is not available.");
    return;
  }
  
  // If the workbook isn't solved, proceed with initializing event listeners
  if (WA.player.state[workbookName] === "unsolved") {
    let instance;
    console.log("🚩 Workbook:", workbookName, "loaded");

    H5P.externalDispatcher.on("initialized", () => {
      // Assuming there's only one relevant instance here
      instance = H5P.instances[0];
    });

    H5P.externalDispatcher.on("xAPI", (event) => {
      console.log("👁️👁️ H5P xAPI EventListener:", event.data.statement);
      if (!instance) return;

      // Only triggers on completion
      if (instance.getScore() === instance.getMaxScore()) {
        console.log(
          `🚩 COMPLETED: Player has reached ${instance.getScore()} out of ${instance.getMaxScore()} points at ${workbookName}`,
          WA.chat.sendChatMessage(message, messageNpc)
        );
        try {
          WA.player.state[workbookName] = "solved";
          console.log("🚩 Workbook:", workbookName, "updated to solved");
        } catch (error) {
          console.error("Error updating workbookName to solved:", error);
        }

        // Get the current state, increment by 1, and don't exceed moduleMax.
        let currentState = Number(WA.player.state[moduleName]) || 0;
        let newState = currentState + 1;
        if (newState > moduleMax) {
          newState = moduleMax;
        }
        WA.player.state[moduleName] = newState.toString();
      }
    });
    } else if (WA.player.state[workbookName] === "solved") {
      WA.chat.sendChatMessage("AHA! You have already completed this workbook!", messageNpc);
    }
  }
