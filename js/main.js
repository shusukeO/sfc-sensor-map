//sox接続設定
const boshService = "http://sox.sfc.keio.ac.jp:5280/http-bind/";
const xmppServer = "sox.sfc.keio.ac.jp";
const jid = "guest@sox.sfc.keio.ac.jp";
const password = "cnsguest";

let mapCenter = [35.38742695145222, 139.42699632079737];

//地図作成
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

//センサーポップアップのオブジェクトをセンサーの数作成
const sensorPopupObjs = [];
for (let i = 0; i < sensorsData.length; i++) {
  sensorPopupObjs.push(
    new SensorPopup(sensorsData[i].name, sensorsData[i].location)
  );
  //マーカー作成
  sensorPopupObjs[i].createMarker(mymap);
}

window.onload = function () {
  const client = new SoxClient(boshService, xmppServer, jid, password);
  const soxEventListener = new SoxEventListener();
  soxEventListener.connected = function (soxEvent) {
    console.log("[main.js] Connected " + soxEvent.soxClient);

    soxEvent.soxClient.discoverDevices();
  };

  soxEventListener.discovered = function (soxEvent) {
    try {
      console.log("[main.js] Discovered " + soxEvent.devices);
      for (var i = 0; i < soxEvent.devices.length; i++) {
        //必要なセンサーのみ登録
        if (
          sensorsData.findIndex(
            ({ name }) => name === soxEvent.devices[i].nodeName
          ) !== -1
        ) {
          client.subscribeDevice(soxEvent.devices[i]);
          // alert(soxEvent.devices[i] + "を登録しました");
        }
      }
    } catch (e) {
      printStackTrace(e);
    }
  };

  //データ受信イベント
  soxEventListener.sensorDataReceived = function (soxEvent) {
    let temperature1 = "";
    let humidity1 = "";
    let identifier = "";
    // alert(soxEvent.device.name + "の情報を受け取りました");

    for (var i = 0; i < soxEvent.device.transducers.length; i++) {
      if (soxEvent.device.transducers[i].sensorData != null) {
        switch (soxEvent.device.transducers[i].id) {
          case "identifier":
            identifier = soxEvent.device.transducers[i].sensorData.rawValue;
            // alert(identifier + "の情報を受け取りました");

            break;
          case "temperature1":
            temperature1 = soxEvent.device.transducers[i].sensorData.rawValue;
            console.log(soxEvent.device.transducers[i].sensorData.rawValue);
            break;
          case "humidity1":
            humidity1 = soxEvent.device.transducers[i].sensorData.rawValue;
            console.log(soxEvent.device.transducers[i].sensorData.rawValue);
            break;
        }
      }
    }

    for (let i = 0; i < sensorPopupObjs.length; i++) {
      if (sensorPopupObjs[i].getName() === `greenblue_sensor_${identifier}`) {
        sensorPopupObjs[i].setTemperature1(temperature1);
        sensorPopupObjs[i].setHumidity1(humidity1);
        sensorPopupObjs[i].createGaugePopup();
      }
    }
  };

  client.setSoxEventListener(soxEventListener);
  client.connect();
};
