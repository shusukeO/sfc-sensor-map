class SensorPopup {
  constructor(name, location) {
    this.name = name;
    this.location = location;
    this.temperature1 = 0;
    this.humidity1 = 0;
    this.isActive = false;
    this.config = liquidFillGaugeDefaultSettings();
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
      .bindPopup(`<div id="${this.name}" class="test-popup-link"></div>`, {
        autoClose: false,
        closeButton: false,
        closeOnClick: false,
        className: "popup",
      })
      //ポップアップオープン時の処理
      .on("popupopen", () => {
        this.setActive(true);
        this.createGaugePopup();

        $(".test-popup-link").magnificPopup({
          items: [
            {
              src: "img1.jpg",
            },
            {
              src: "img2.jpg",
            },
          ],
          gallery: {
            enabled: true,
          },
          type: "image",
          // other options
        });
      })
      //ポップアップクローズ時の処理
      .on("popupclose", () => {
        this.setActive(false);
      })

      .openPopup();
  }

  createGaugePopup() {
    //表示状態でなければ処理を行わない
    if (!this.isActive) return;

    $(`#${this.name}`).html(
      `<svg id="fillgauge-${this.name}" class="gauge" onclick="popupClickedFunc();;"></svg><p>Temperature:${this.temperature1}&#8451;</p>`
    );

    this.config.circleThickness = 0.2;
    this.config.textVertPosition = 0.2;
    this.config.waveAnimateTime = 2000;

    this.config.circleColor = getBToRColorTemperature(this.temperature1);
    loadLiquidFillGauge(`fillgauge-${this.name}`, this.humidity1, this.config);
  }
}
