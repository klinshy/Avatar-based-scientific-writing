//the general idea is to load up module data and make it available to this function from an external source, also referenced by the main.ts file and any others that might need it
//IDEALLY, moduleMax would be derived directly from the config file below
//TODO THIS IS WRONG, and will not work because this script is not a javascript module
//import { modulesConfig } from "../../src/models/modules-config";

function handleModuleCompletionEvents(
  completionMessage,
  messageNpc,
  moduleName,
  moduleMax
) {
  let instance;

  H5P.externalDispatcher.on("initialized", () => {
    //assuming there's only one relevant instance here
    instance = H5P.instances[0];
  });

  H5P.externalDispatcher.on("xAPI", function (event) {
    console.log("👁️👁️ H5P xAPI EventListener:", event.data.statement);
    if (!instance) return;

    //only triggers on completion
    if (instance.getScore() === instance.getMaxScore()) {
      console.log(
        `🚩 COMPLETED: Player has reached ${instance.getScore()} out of ${instance.getMaxScore()} points`
      );

      WA.chat.sendChatMessage(completionMessage, messageNpc);

      // Get the current state, increment by 1, and don't exceed 3.
      let currentState = Number(WA.player.state[moduleName]) || 0;
      let newState = currentState + 1;

      if (newState > moduleMax) {
        newState = moduleMax;
      }

      WA.player.state[moduleName] = newState.toString();
    }
  });
}
