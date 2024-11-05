// Get the latitude, longitude, altitude, and angle of the device
let isdebug = true;

if (isdebug) {
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

      const nft = document.querySelector("a-nft");
      nft.addEventListener("markerFound", () => {
        console.log("Marker found");
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("assets/anchors.json");
  const anchors = await response.json();
  console.log("Anchors JSON file loaded:", anchors);

  const scene = document.querySelector("a-scene");

  anchors.forEach((anchor) => {
    const entity = document.createElement("a-entity");
    entity.setAttribute(
      "gps-entity-place",
      `latitude: ${anchor.latitude}; longitude: ${anchor.longitude}`
    );
    entity.setAttribute("gltf-model", anchor.modelPath);
    entity.setAttribute("scale", anchor.scale);

    scene.appendChild(entity);
    console.log(
      `Model added at (${anchor.latitude}, ${anchor.longitude}): ${anchor.modelPath}`
    );
  });
});
