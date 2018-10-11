//This file is for creating event listeners.

function addEvents() {
    document.addEventListener('keydown',
        function (event) {
            if (event.key == "d") {
                app.keys.d = true;
            }

            if (event.key == "a") {
                app.keys.a = true;
            }
            if (event.key == "w") {
                app.keys.w = true;
            }
            if (event.key == "s") {
                app.keys.s = true;
            }

            if (event.key == "ArrowRight") {
                app.keys.d = true;
            }

            if (event.key == "ArrowLeft") {
                app.keys.a = true;
            }
            if (event.key == "ArrowUp") {
                app.keys.w = true;
            }
            if (event.key == "ArrowDown") {
                app.keys.s = true;
            }

            if (event.key == "e") {
                if (app.keys.autofire == false) {
                    app.keys.autofire = true;
                } else {
                    app.keys.autofire = false;
                }
            }

            if (event.key == "x") {
                if (app.mouse.curSlot.slot != null) {
                    app.money.curMoney += app.mouse.curSlot.slot.power * 0.9;
                    app.mouse.curSlot.slot = null;
                    var i = app.mouse.curSlot.pos;

                    app.mouse.curSlot.removeChildAt(1);

                    while (app.inventory.slotAreas[i + 1].slot != null) {
                        swapItems(app.inventory.slotAreas[i], app.inventory.slotAreas[i + 1]);
                        i += 1;
                    }

                    app.inventory.slotAreas[i].mouseout();
                    app.inventory.slotAreas[i].mouseover();
                }
            }

            if (event.key == "p") {
                if (app.keys.pause == false) {
                    app.keys.pause = true;
                    app.stage.addChild(app.pauseText);
                } else {
                    app.keys.pause = false;
                    app.stage.removeChild(app.pauseText);
                }
            }
            if (event.key == "i") {
                if (app.inventory.inventoryArea.enabled) {
                    app.inventory.inventoryArea.position.x += app.inventory.inventoryArea.width;
                    app.keys.pause = false;
                    app.stage.removeChild(app.pauseText);

                } else {
                    app.inventory.inventoryArea.position.x -= app.inventory.inventoryArea.width;
                    app.keys.pause = true;
                    app.stage.removeChild(app.pauseText);
                    app.upgrades.upgradesArea.close();
                }
                app.inventory.inventoryArea.enabled = !app.inventory.inventoryArea.enabled;
            }

            if (event.key === "u") {
                if (app.upgrades.upgradesArea.enabled) {
                    app.upgrades.upgradesArea.position.x += app.upgrades.upgradesArea.width;
                    app.keys.pause = false;
                    app.stage.removeChild(app.pauseText);

                } else {
                    app.upgrades.upgradesArea.position.x -= app.upgrades.upgradesArea.width;
                    app.keys.pause = true;
                    app.stage.removeChild(app.pauseText);
                    app.inventory.inventoryArea.close();
                }
                app.upgrades.upgradesArea.enabled = !app.upgrades.upgradesArea.enabled;
            }
        
            if (event.key == "b") {
                app.keys.hideBullets = !app.keys.hideBullets;
            }

            if (event.key == "n") {
                newWeapon();
            }
            if (event.key == "m") {
                newArmour();
            }
        });

    document.addEventListener('keyup',
        function (event) {
            if (event.key == "d") {
                app.keys.d = false;
            }

            if (event.key == "a") {
                app.keys.a = false;
            }
            if (event.key == "w") {
                app.keys.w = false;
            }
            if (event.key == "s") {
                app.keys.s = false;
            }

            if (event.key == "ArrowRight") {
                app.keys.d = false;
            }

            if (event.key == "ArrowLeft") {
                app.keys.a = false;
            }
            if (event.key == "ArrowUp") {
                app.keys.w = false;
            }
            if (event.key == "ArrowDown") {
                app.keys.s = false;
            }

            if (event.key == "x") {
                app.keys.sell = false;
            }
        });

    playerCol.addEventListener("change", function (event) {
        app.player.colour = getPlayerColour();
        app.player.tint = app.player.colour;
    }, false);

    document.addEventListener('mousedown',
        function (event) {
            app.keys.mouseLeft = true;
        });

    document.addEventListener('mouseup',
        function (event) {
            app.keys.mouseLeft = false;
        });

}

document.onmousemove = function (event) {
    var dot, eventDoc, doc, body, pageX, pageY;

    event = event || window.event; // IE-ism

    // If pageX/Y aren't available and clientX/Y are,
    // calculate pageX/Y - logic taken from jQuery.
    // (This is to support old IE)
    if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        event.pageX = event.clientX +
            (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
            (doc && doc.clientLeft || body && body.clientLeft || 0);
        event.pageY = event.clientY +
            (doc && doc.scrollTop || body && body.scrollTop || 0) -
            (doc && doc.clientTop || body && body.clientTop || 0);
    }

    app.mouse.position.set(event.pageX - app.transform.x, event.pageY - app.transform.y);
}
