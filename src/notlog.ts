/// <reference types="@workadventure/iframe-api-typings" />

let isAutoMoving = false;

function initNotLogScript() {
    console.log('loading secondary notlog script');





    // Event listener for entering the downstairs area to the lab
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

    // Event listener for entering the upstairs area from the lab
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

    // Check if the player has solved the notlog quest and is not an admin
    const solvedNotlog = WA.player.state.solvedNotlog;
    const isAdmin = WA.player.tags.includes('admin');
    const mapURL = WA.room.mapURL;

    console.log("solvedNotlog:", solvedNotlog);
    console.log("isAdmin:", isAdmin);
    console.log("mapURL:", mapURL);

    if (solvedNotlog === true && !isAdmin && mapURL.includes('notlog') && !mapURL.includes('localhost')) {
        console.log("Map URL: ", mapURL);
        // Teleport the player to the entry named "matrix-hub"
        WA.nav.goToRoom("./matrix-hub.tmj");
    }

    // Event listener for entering the notlog area
    WA.room.area.onEnter('notlog').subscribe(() => {
        console.log("Entered notlog area");
        if (solvedNotlog === true && !isAdmin) {
            console.log("Map URL: ", mapURL);
            if (!mapURL.includes('localhost')) {
                // Teleport the player to the entry named "matrix-hub"
                WA.nav.goToRoom("./matrix-hub.tmj");
            }
        }
    });

    // Event listener for leaving the notlog area
    WA.room.area.onEnter('leaveNotlog').subscribe(() => {
        console.log("Leaving notlog area");
        WA.player.state.solvedNotlog = true;
    });
};
export default initNotLogScript;