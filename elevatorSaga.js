const elevatorSaga = {
    init: function (elevators, floors) {
        const upButtons = floors.reduce((acc, floor) => ({ ...acc, [floor.floorNum]: 0 }), {});
        const downButtons = { ...upButtons };

        const updateElevatorQueue = (elevator) => {
            const { destinationQueue, loadFactor, currentFloor } = elevator;
            if (loadFactor > 0.7) {
                return;
            }
        }

        const updateElevatorIndicator = (elevator) => { 
            const { destinationQueue, loadFactor, currentFloor } = elevator;
            if (loadFactor > 0.7) {
                elevator.goingUpIndicator(true);
                elevator.goingDownIndicator(true);
                return;
            }
            if (destinationQueue.length === 0) {
                elevator.goingUpIndicator(false);
                elevator.goingDownIndicator(false);
                return;
            }
            const nextFloor = destinationQueue[0];
            if (nextFloor > currentFloor) {
                elevator.goingUpIndicator(true);
                elevator.goingDownIndicator(false);
            } else {
                elevator.goingUpIndicator(false);
                elevator.goingDownIndicator(true);
            }
        }
        
        for(const elevator of elevators) {
            elevator.on("idle", function () {
                elevator.goToFloor(0);
            });
            elevator.on("floor_button_pressed", function (floorNum) {
                elevator.goToFloor(floorNum);
            });
        }
        for (const floor of floors) {
            floor.on("up_button_pressed", function () {
                upButtons[floor.floorNum] += 1;
            });
            floor.on("down_button_pressed", function () {
                downButtons[floor.floorNum] += 1;
            });
        }
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}