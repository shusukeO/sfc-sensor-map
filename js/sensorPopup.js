class SensorPopup {
  constructor(name, location) {
    this.name = name;
    this.location = location;
    this.temperature1 = 0;
    this.humidity1 = 0;
    this.isActive = false;
    this.config = liquidFillGaugeDefaultSettings();
    this.gauge;
  }

  setTemperature1(value) {
    this.temperature1 = Math.round(value * 10) / 10;
  }

  setHumidity1(value) {
    this.humidity1 = Math.round(value * 10) / 10;
  }

  getName() {
    return this.name;
  }

  setActive(value) {
    this.isActive = value;
  }

  createMarker(map) {
    L.marker(this.location)
      .addTo(map)
      .bindPopup(`<div id="${this.name}" class="modal-link"></div>`, {
        autoClose: false,
        closeButton: false,
        closeOnClick: false,
        className: "popup",
      })
      //ポップアップオープン時の処理
      .on("popupopen", () => {
        this.setActive(true);
        this.createGaugePopup();
        this.createModal(map);
      })
      //ポップアップクローズ時の処理
      .on("popupclose", () => {
        this.setActive(false);
      })

      .openPopup();
  }

  createModal(map) {
    $(".modal-link").magnificPopup({
      delegate: "a",
      type: "inline",
      gallery: {
        enabled: true,
      },
      callbacks: {
        open: function () {},
        close: function () {},
        // elementParse: function (item) {
        //   alert(item);
        // },
        change: function () {
          //モダールのスライドに合わせてマップの中心の移動
          map.setView([
            this.content.find(".longitude").val(),
            this.content.find(".latitude").val(),
          ]);
        },
      },
    });
  }

  createGaugePopup() {
    //表示状態でなければ処理を行わない
    if (!this.isActive) return;

    $(`#${this.name}`).html(
      `<a href="#modal-${this.name}"><svg id="fillgauge-${this.name}" class="gauge" onclick=""></svg><p>Temperature:${this.temperature1}&#8451;</p></a>`
    );

    this.config.circleThickness = 0.2;
    this.config.textVertPosition = 0.2;
    this.config.waveAnimateTime = 2000;

    this.config.circleColor = getBToRColorTemperature(this.temperature1);
    this.gauge = loadLiquidFillGauge(
      `fillgauge-${this.name}`,
      this.humidity1,
      this.config
    );
  }
}
