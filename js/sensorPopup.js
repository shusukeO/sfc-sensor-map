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
