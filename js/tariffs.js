$(function () {
  $.getJSON('../json/home.json')
    .then(function (res) {
      //PI
      var tariffsBar = echarts.init(document.getElementById('tariffsBar'));
      var tariffsBarOption = {
        title: {
          text: 'PI',
          left: 10,
          top: 10
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: '{b}<br />{a0}: {c0}' + '<br />{a1}: {c1}'
        },
        legend: {
          left: '30%',
          top: 10,
          data: ['调价前', '调价后']
        },
        grid: {
          top: '30%',
          left: '5%',
          right: '5%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            axisLabel: {
              interval: 0,
            },
            data: res.area.map(function (item) {
              return item.name
            })
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '调价前',
            type: 'bar',
            data: res.area.map(function (item) {
              return item.tariff[0].value
            })
          },
          {
            name: '调价后',
            type: 'bar',
            data: res.area.map(function (item) {
              return item.tariff[1].value
            })
          }
        ]
      };
      tariffsBar.setOption(tariffsBarOption);

      //Lower%
      var tariffsBar2 = echarts.init(document.getElementById('tariffsBar2'));
      var tariffsBar2Option = {
        title: {
          text: 'Lower%',
          left: 10,
          top: 10
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: '{b}<br />{a0}: {c0}' + '% <br />{a1}: {c1}' + '%'
        },
        legend: {
          left: '40%',
          top: 10,
          data: ['调价前', '调价后']
        },
        grid: {
          top: '30%',
          left: '5%',
          right: '5%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            axisLabel: {
              interval: 0,
            },
            data: res.area.map(function (item) {
              return item.name
            })
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: "%",
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '调价前',
            type: 'bar',
            data: res.area.map(function (item) {
              return item.numberOfSheets[0].value
            })
          },
          {
            name: '调价后',
            type: 'bar',
            data: res.area.map(function (item) {
              return item.numberOfSheets[1].value
            })
          }
        ]
      };
      tariffsBar2.setOption(tariffsBar2Option);

      //Higer%
      var tariffsScatter = echarts.init(document.getElementById('tariffsScatter'));
      var tariffsScatterOption = {
        title: {
          text: 'Higer%',
          left: 10,
          top: 10
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: '{b}<br />{a0}: {c0}' + '% <br />{a1}: {c1}' + '%'
        },
        legend: {
          left: '40%',
          top: 10,
          data: ['调价前', '调价后']
        },
        grid: {
          top: '30%',
          left: '5%',
          right: '5%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            axisLabel: {
              interval: 0,
            },
            data: res.area.map(function (item) {
              return item.name
            })
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: "%",
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '调价前',
            type: 'bar',
            data: res.area.map(function (item) {
              return item.areatariffPie[0].value
            })
          },
          {
            name: '调价后',
            type: 'bar',
            data: res.area.map(function (item) {
              return item.areatariffPie[1].value
            })
          }
        ]
      };
      tariffsScatter.setOption(tariffsScatterOption);

      //模型优化效果评估
      var tariffsScatter2 = echarts.init(document.getElementById('tariffsScatter2'));
      var tariffsScatterOption2 = {
        title: {
          left: 'left',
            text: '模型优化效果评估',
            top: 6,
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b}<br />{a0}: {c0}' + '（万）' + '<br />{a1}: {c1}' + '（万）'
        },
        legend: {
          top: 10,
          left: '40%',
          data: ['真实数据','预测数据']
        },
        grid: {
          top: '33%',
          left: '5%',
          right: '5%',
          bottom: '8%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
            boundaryGap: false,
            data: res.effectAppraisal.map(function (item) {
            return item.date
          })
        },
        yAxis: [
          {
            type: 'value',
            name: "万元",
            splitLine: {
              show: false
            }
          }
        ],
          series: [
          {
            name: '真实数据',
            type: 'line',
            smooth: true,
            yAxisIndex: 0,
            data: res.effectAppraisal.map(function (item) {
              return item.sales / 10000
            })
          },
          {
            name: '预测数据',
            type: 'line',
            smooth: true,
            yAxisIndex: 0,
            data: res.effectAppraisal.map(function (item) {
              return item.sell / 10000
            })
          }
        ]
      };
      tariffsScatter2.setOption(tariffsScatterOption2);
    })
})
