import "expo-dev-client"; 
import * as TaskManager from "expo-task-manager";
import * as SecureStore from "expo-secure-store";
import socket from "../services/webSocket";

const LOCATION_TASK_NAME = "background-location-task";

export const defineBackgroundLocationTask = () => {
    if (!TaskManager.isTaskDefined(LOCATION_TASK_NAME)) {
        
        TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
            if (error) {
                console.error("Background location error:", error);
                return;
            }

            if (data) {
                const { locations } = data;
                const loc = locations[0];

                if (loc) {
                    const coords = {
                        latitude: loc.coords.latitude,
                        longitude: loc.coords.longitude,
                    };

                    try {
                        const deviceId = await SecureStore.getItemAsync("deviceId");
                        if (deviceId) {
                            socket.emit("location_update", {
                                deviceId,
                                location: coords,
                            });

                            console.log("📤 Sent location:", coords);
                        } else {
                            console.warn("⚠️ No deviceId found in storage");
                        }
                    } catch (e) {
                        console.error("🔐 Error getting deviceId from SecureStore:", e);
                    }
                }
            }
        });
    }
};

export { LOCATION_TASK_NAME };
