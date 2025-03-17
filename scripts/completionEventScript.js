(function () {
  function handleModuleCompletionEvents(
    message,
    messageNpc,
    moduleName,
    moduleMax,
    workbookName
  ) {
    console.log("🚩 Okay, Completion Event Script loaded");

    // Validate H5P and externalDispatcher
    if (!window.H5P || !H5P.externalDispatcher) {
      console.error("H5P or its externalDispatcher is not available.");
      return;
    }

    // Check if workbook is unsolved
    if (WA.player.state[workbookName] === "unsolved") {
      let instance;
      console.log("🚩 Workbook:", workbookName, "loaded");

      H5P.externalDispatcher.on("initialized", () => {
        // Safely get H5P instance
        instance = H5P.instances && H5P.instances[0] ? H5P.instances[0] : null;
        if (!instance) {
          console.warn("No H5P instance found.");
          return;
        }

        // Listen for xAPI events
        H5P.externalDispatcher.on("xAPI", (event) => {
          console.log("👁️👁️ H5P xAPI EventListener:", event.data.statement);
          if (instance.getScore() !== instance.getMaxScore()) return;

          console.log(
            `🚩 COMPLETED: ${instance.getScore()} out of ${instance.getMaxScore()} at ${workbookName}`,
            WA.chat.sendChatMessage(message, messageNpc)
          );
          try {
            WA.player.state[workbookName] = "solved";
          } catch (error) {
            console.error("Error updating workbook state to solved:", error);
          }

          // Update module state, ensuring we don't exceed moduleMax
          const currentState = Number(WA.player.state[moduleName]) || 0;
          const newState = Math.min(currentState + 1, moduleMax);
          WA.player.state[moduleName] = newState.toString();
        });
      });
    } else if (WA.player.state[workbookName] === "solved") {
      WA.chat.sendChatMessage(
        "AHA! You have already completed this workbook!",
        messageNpc
      );
    }
  }

  // Expose function if needed
  window.handleModuleCompletionEvents = handleModuleCompletionEvents;
})();
