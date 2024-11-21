// Get the latitude, longitude, altitude, and angle of the device
let debug = true;

if (debug) {
  console.log("Script loaded");
}

if (debug) {
  document.addEventListener("DOMContentLoaded", () => {
    const latElement = document.createElement("div");
    const lonElement = document.createElement("div");
    const altitudeElement = document.createElement("div");

    latElement.id = "latitude";
    lonElement.id = "longitude";
    altitudeElement.id = "altitude";
    altitudeElement.id = "angle";

    latElement.style.position = "absolute";
    latElement.style.top = "10px";
    latElement.style.left = "10px";
    latElement.style.color = "white";

    lonElement.style.position = "absolute";
    lonElement.style.top = "30px";
    lonElement.style.left = "10px";
    lonElement.style.color = "white";

    altitudeElement.style.position = "absolute";
    altitudeElement.style.top = "50px";
    altitudeElement.style.left = "10px";
    altitudeElement.style.color = "white";

    document.body.appendChild(latElement);
    document.body.appendChild(lonElement);
    document.body.appendChild(altitudeElement);

    navigator.geolocation.watchPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const altitude = position.coords.altitude;

        latElement.textContent = `Latitude: ${latitude}`;
        lonElement.textContent = `Longitude: ${longitude}`;
        altitudeElement.textContent = `Altitude: ${altitude}`;
      },
      (error) => {
        console.error("Error getting location", error);
      }
    );
    const scene = document.querySelector("a-scene");
    scene.addEventListener("loaded", () => {
      console.log("Scene loaded");
    });

    const entity = document.querySelector("a-entity");
    entity.addEventListener("loaded", () => {
      console.log("Entity loaded");
    });

    const models = document.querySelectorAll("a-asset-item");
    models.forEach((model) => {
      model.addEventListener("loaded", () => {
        console.log(`Model loaded: ${model.getAttribute("src")}`);
      });
    });
  });
}

window.onload = () => {
  let testEntityAdded = false;
  console.log("GPS Debug script loaded");
  const el = document.querySelector("[gps-new-camera]");

  el.addEventListener("gps-camera-update-position", (e) => {
    if (!testEntityAdded) {
      console.warn(
        `Got first GPS position: lon ${e.detail.position.longitude} lat ${e.detail.position.latitude}`
      );
      // Add a box to the north of the initial GPS position
      const entity = document.createElement("a-box");
      entity.setAttribute("scale", {
        x: 20,
        y: 20,
        z: 20,
      });
      entity.setAttribute("material", { color: "red" });
      entity.setAttribute("gps-new-entity-place", {
        latitude: e.detail.position.latitude,
        longitude: e.detail.position.longitude + 0.0001,
      });
      document.querySelector("a-scene").appendChild(entity);
    }
    testEntityAdded = true;
  });
};
