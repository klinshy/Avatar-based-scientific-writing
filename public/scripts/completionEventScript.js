/// <reference types="@workadventure/iframe-api-typings" />
(function () {
  // Dynamically load the external script
  const script = document.createElement("script");
  script.src = "https://play.workadventu.re/iframe_api.js";
  script.onload = () => {
    console.log("External iframe API loaded.");
  };
  document.head.appendChild(script);

  function handleModuleCompletionEvents(
    completionMessage,
    messageNpc,
    moduleName,
    moduleMax,
    workbookName
  ) {
    console.log("🚩 Completion Event Script loaded");

    // Validate H5P and externalDispatcher
    if (!window.H5P || !H5P.externalDispatcher) {
      console.error("H5P or externalDispatcher is not available.");
      return;
    }

    let instance;

    // Wait for H5P to initialize and grab the instance
    H5P.externalDispatcher.on("initialized", () => {
      instance = H5P.instances && H5P.instances[0] ? H5P.instances[0] : null;
    });

    // Listen to xAPI events
    H5P.externalDispatcher.on("xAPI", (event) => {
      if (!instance) return;

      // Trigger only on full completion
      if (instance.getScore() === instance.getMaxScore()) {
        console.log(
          `🚩 COMPLETED: ${instance.getScore()} / ${instance.getMaxScore()} for ${workbookName}`
        );
        if (WA.player.state[workbookName] !== "solved") {
          const currentState = Number(WA.player.state[moduleName]) || 0;
          const newState = Math.min(currentState + 1, moduleMax);
          WA.player.state[moduleName] = newState.toString();
        }
        // Send completion message if not already solved
        if (WA.player.state[workbookName] !== "solved") {
          WA.chat.sendChatMessage(completionMessage, messageNpc);
          WA.player.state[workbookName] = "solved";
          setTimeout(async () => {
            const cowebsites = await WA.nav.getCoWebSites();
            for (const cowebsite of cowebsites) {
              cowebsite.close();
            }
          }, 5000);
        }
      }
    });
  }
  window.handleModuleCompletionEvents = handleModuleCompletionEvents;
})();
