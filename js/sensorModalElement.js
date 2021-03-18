class SensorModalElement {
  constructor(name, label, location) {
    this.name = name;
    this.label = label;
    this.location = location;
    this.temperature1 = 0;
    this.humidity1 = 0;
    this.chartItems = [
      { title: '気温', unitLabel: '℃', value: 0 },
      { title: '湿度', unitLabel: '%', value: 0 },
    ];
  }

  setTemperature1(value) {
    this.temperature1 = Math.round(value * 10) / 10;
  }

  setHumidity1(value) {
    this.humidity1 = Math.round(value * 10) / 10;
  }

  createModalElement(modalItems) {
    let html = `<div id="modal-${this.name}" class="mfp-hide white-popup"><input class="longitude" value="${this.location[0]}"type="hidden" /><input class="latitude" value="${this.location[1]}"type="hidden" /><p>${this.label}</p>`;

    for (let i = 0; i < this.chartItems.length; i++) {
      html += `<canvas id=${this.chartItems[i].title}></canvas>`;
    }
    html += '</div>';

    modalItems.prepend(html);

    const chartColors = {
      red: 'rgb(255, 99, 132)',
      orange: 'rgb(255, 159, 64)',
      yellow: 'rgb(255, 205, 86)',
      green: 'rgb(75, 192, 192)',
      blue: 'rgb(54, 162, 235)',
      purple: 'rgb(153, 102, 255)',
      grey: 'rgb(201, 203, 207)',
    };

    const color = Chart.helpers.color;
    const self = this;
    let config;
    let ctx;

    for (let i = 0; i < this.chartItems.length; i++) {
      config = {
        type: 'line',
        data: {
          datasets: [
            {
              label: this.chartItems[i].title,
              backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
              borderColor: chartColors.blue,
              fill: false,
              cubicInterpolationMode: 'monotone',
              data: [],
            },
          ],
        },
        options: {
          scales: {
            xAxes: [
              {
                type: 'realtime',
                realtime: {
                  duration: 43200000,
                  refresh: 60000,
                  delay: 120000,
                  onRefresh: function (chart) {
                    //チャート用のデータをアップデート
                    self.chartItems = [
                      { value: self.temperature1 },
                      { value: self.humidity1 },
                    ];

                    if (chart.data.datasets[0].data.length > 722) {
                      chart.data.datasets[0].data.shift();
                    }

                    chart.data.datasets[0].data.push({
                      x: Date.now(),

                      y: self.chartItems[i].value,
                    });
                  },
                },
              },
            ],
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: this.chartItems[i].unitLabel,
                },
              },
            ],
          },
          tooltips: {
            mode: 'nearest',
            intersect: false,
          },
          hover: {
            mode: 'nearest',
            intersect: false,
          },
        },
      };

      ctx = document.getElementById(this.chartItems[i].title).getContext('2d');
      window.myChart = new Chart(ctx, config);
    }
  }
}
