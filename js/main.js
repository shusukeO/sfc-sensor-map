const sensors = [
  //本館
  [35.38842480417413, 139.42791340013696],
  //生協
  [35.38723962995367, 139.42599830372242],
  //中高部
  [35.385887600519254, 139.42571612055917],
  //i前
  [35.38841346727527, 139.42666895800951],
  //i中
  [35.388332449013454, 139.42665726646885],
  //i後
  [35.38823713342666, 139.42663388334776],
];

//温度
const maxTemperature = 40;
const minTemperature = -5;
const p5LikeMapFunc = (n, start1, stop1, start2, stop2) => {
  return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
};

let mapCenter = [35.38742695145222, 139.42699632079737];

const mymap = L.map("mapid").setView(mapCenter, 18);

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
  {
    maxZoom: 18,
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
  }
).addTo(mymap);

for (let i = 0; i < sensors.length; i++) {
  let config = liquidFillGaugeDefaultSettings();
  let temperatureBase;

  config.circleThickness = 0.2;
  config.textVertPosition = 0.2;
  config.waveAnimateTime = 3000;

  L.marker(sensors[i])
    .addTo(mymap)
    .bindPopup(
      `<svg id="fillgauge${i}" class="gauge" onclick="gauge1.update(NewValue());"></svg><p>Temperature: ${i}&#8451;</p>`,
      {
        autoClose: false,
        closeButton: false,
        className: "popup",
      }
    )
    .on("click", () => {
      temperatureBase = p5LikeMapFunc(
        i,
        minTemperature,
        maxTemperature,
        0,
        255
      );
      config.circleColor =
        "rgb(" + [temperatureBase, 128, 255 - temperatureBase].join(",") + ")";
      loadLiquidFillGauge(`fillgauge${i}`, i, config);
    })
    .openPopup();

  temperatureBase = p5LikeMapFunc(i, minTemperature, maxTemperature, 0, 255);
  config.circleColor =
    "rgb(" + [temperatureBase, 128, 255 - temperatureBase].join(",") + ")";

  loadLiquidFillGauge(`fillgauge${i}`, i, config);
}
