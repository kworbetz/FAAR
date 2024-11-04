// Get the latitude, longitude, altitude, and angle of the device
let isdebug = true;
if (isdebug) {
  document.addEventListener("DOMContentLoaded", () => {
    const latElement = document.createElement("div");
    const lonElement = document.createElement("div");
    const altitudeElement = document.createElement("div");
    const angleElement = document.createElement("div");

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

    angleElement.style.position = "absolute";
    angleElement.style.top = "70px";
    angleElement.style.left = "10px";
    angleElement.style.color = "white";

    document.body.appendChild(latElement);
    document.body.appendChild(lonElement);
    document.body.appendChild(altitudeElement);
    document.body.appendChild(angleElement);

    navigator.geolocation.watchPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const altitude = position.coords.altitude;
        const angle = position.coords.heading;

        latElement.textContent = `Latitude: ${latitude}`;
        lonElement.textContent = `Longitude: ${longitude}`;
        altitudeElement.textContent = `Altitude: ${altitude}`;
        angleElement.textContent = `Angle: ${angle}`;
      },
      (error) => {
        console.error("Error getting location", error);
      }
    );
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const nftImage = document.querySelector("img.nft-image");
  if (nftImage) {
    const downloadButton = document.createElement("button");
    downloadButton.textContent = "Download program discription";
    downloadButton.style.position = "absolute";
    downloadButton.style.top = "90px";
    downloadButton.style.left = "10px";
    downloadButton.style.color = "white";
    downloadButton.style.backgroundColor = "blue";
    downloadButton.style.border = "none";
    downloadButton.style.padding = "10px";
    downloadButton.style.cursor = "pointer";

    downloadButton.addEventListener("click", () => {
      const link = document.createElement("a");
      link.href = nftImage.src;
      link.download = link.click();
    });

    document.body.appendChild(downloadButton);
  }
});

document.querySelector("a-scene").addEventListener("click", function (evt) {
  if (evt.target.classList.contains("clickable")) {
    window.location.href =
      "https://drive.google.com/file/d/1YdRAPJHmukU8T5nx4DBpkVTynXBbnycq/view?usp=sharing";
  }
});
