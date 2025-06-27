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
            const myDeviceId = await SecureStore.getItemAsync("myDeviceId");

            if (myDeviceId) {
              socket.emit("location_update", {
                deviceId: myDeviceId,
                location: coords,
              });

              console.log("📤 Sent location from this device:", coords);
            } else {
              console.warn("⚠️ No myDeviceId found in SecureStore");
            }
          } catch (e) {
            console.error("🔐 SecureStore error while getting myDeviceId:", e);
          }
        }
      }
    });
  }
};

export { LOCATION_TASK_NAME };
