class SensorModalElement {
  constructor(name, location) {
    this.name = name;
    this.location = location;
    this.temperature1;
    this.humidity1;
  }

  setTemperature1(value) {
    this.temperature1 = Math.round(value * 10) / 10;
  }

  setHumidity1(value) {
    this.humidity1 = Math.round(value * 10) / 10;
  }

  createModalElement(modalItems) {
    const html = `
    <div id="modal-${this.name}" class="mfp-hide white-popup"><input class="longitude" value="${this.location[0]}"type="hidden" /><input class="latitude" value="${this.location[1]}"type="hidden" />
    <p>${this.name}</p><canvas id="myChart"></canvas>
  </div>
  `;
    modalItems.prepend(html);

    const chartColors = {
      red: "rgb(255, 99, 132)",
      orange: "rgb(255, 159, 64)",
      yellow: "rgb(255, 205, 86)",
      green: "rgb(75, 192, 192)",
      blue: "rgb(54, 162, 235)",
      purple: "rgb(153, 102, 255)",
      grey: "rgb(201, 203, 207)",
    };

    const color = Chart.helpers.color;
    const self = this;
    const config = {
      type: "line",
      data: {
        datasets: [
          {
            label: "気温の変化",
            backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
            borderColor: chartColors.blue,
            fill: false,
            cubicInterpolationMode: "monotone",
            data: [],
          },
        ],
      },
      options: {
        // title: {
        //   display: false,
        //   text: "ここはタイトル",
        // },
        scales: {
          xAxes: [
            {
              type: "realtime",
              realtime: {
                duration: 86400000,
                refresh: 60000,
                delay: 120000,
                onRefresh: function (chart) {
                  chart.data.datasets[0].data.push({
                    x: Date.now(),

                    y: self.temperature1,
                  });
                },
              },
            },
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "value",
              },
            },
          ],
        },
        tooltips: {
          mode: "nearest",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: false,
        },
      },
    };

    const ctx = document.getElementById("myChart").getContext("2d");
    window.myChart = new Chart(ctx, config);
  }
}
