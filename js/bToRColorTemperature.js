function bToRColorTemperatureDefaultSettings() {
  return {
    maxTemperature: 40,
    minTemperature: -5,
  };
}

function getBToRColorTemperature(temperature, config) {
  if (config == null) config = bToRColorTemperatureDefaultSettings();
  const temperatureBase = Math.round(
    ((temperature - config.minTemperature) /
      (config.maxTemperature - config.minTemperature)) *
      255
  );
  return "rgb(" + [temperatureBase, 128, 255 - temperatureBase].join(",") + ")";
}

// how to use
// const config = bToRColorTemperatureDefaultSettings();
// config.maxTemperature = 50;
// alert(getBToRColorTemperature(40, config));
//or just use like this
// alert(getbToRColorTemperature(40));
