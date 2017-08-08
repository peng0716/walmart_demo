$(function () {
  $.getJSON('../json/home.json')
    .then(function (res) {
      var provinces = res.selectOne;
      var allDate;

      //KPI
      $('.inventory').html(res.init_KPI.inventory + '万件');
      $('.price').html(res.init_KPI.price + '元');
      $('.profits').html(res.init_KPI.profits + '元');
      $('.rain').html(res.init_KPI.rain + '元');
      $('.kpi_select').html(res.KPI_select[0] + '元');

      // KPI select选择事件
      $('#KPI_select').change(function(){
        var val = $('#KPI_select').val()
        $('.kpi_select').html(res.KPI_select[val] + '元')
      })

      //销售额趋势预测
      var homeLineZH = echarts.init(document.getElementById('homeLineZH'));
      var lineZHOption = {
        title: {
          left: 'left',
          text: '销售额趋势预测',
          top: 6,
        },
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%'];
          },
          formatter: '{b}<br />{a0}: {c0}' + '（万）'
        },
        legend: {
          top: 35,
          left: 10,
          data: ['By 建议价格']
        },
        grid: {
          top: '33%',
          left: '5%',
          right: '10%',
          bottom: '8%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: res.allDate.map(function (item) {
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
            name: 'By 建议价格',
            type: 'line',
            smooth: true,
            yAxisIndex: 0,
            data: res.allDate.map(function (item) {
              return item.sales / 10000
            })
          }
        ]
      };
      homeLineZH.setOption(lineZHOption);

      //毛利趋势预测
      var homeLineXS = echarts.init(document.getElementById('homeLineXS'));
      var lineXSOption = {
        title: {
          left: 'left',
          text: '毛利趋势预测',
          top: 6,
        },
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%'];
          },
          formatter: '{b}<br />{a0}: {c0}' + '（万）'
        },
        legend: {
          top: 35,
          left: 10,
          data: ['By 建议价格']
        },
        grid: {
          top: '33%',
          left: '5%',
          right: '10%',
          bottom: '8%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: res.allDate.map(function (item) {
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
            name: 'By 建议价格',
            type: 'line',
            smooth: true,
            yAxisIndex: 0,
            data: res.allDate.map(function (item) {
              return item.benefit / 10000
            })
          }
        ]
      };
      homeLineXS.setOption(lineXSOption);

      //销售量
      var homeLine = echarts.init(document.getElementById('homeLine'));
      var lineOption =  {
        title: {
          left: 'left',
          text: '销售量趋势预测',
          top: 6,
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b}<br />{a0}: {c0}' + '（万）'
        },
        legend: {
          top: 35,
          left: 10,
          data: ['By 建议价格']
        },
        grid: {
          top: '33%',
          left: '5%',
          right: '10%',
          bottom: '8%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: res.allDate.map(function (item) {
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
            name: 'By 建议价格',
            type: 'line',
            smooth: true,
            yAxisIndex: 0,
            data: res.allDate.map(function (item) {
              return item.sell / 10000
            })
          }
        ]
      };
      homeLine.setOption(lineOption);

      //提交
      $('#dateSubmit2').on('click', function () {
        var val = $('.threeSelect').val()
        var text = $('#select_text').val()
        if(val == '0' && text != ''){  //输入框有内容
          lineZHOption.tooltip.formatter = lineXSOption.tooltip.formatter = lineOption.tooltip.formatter = submitData.submitFormatter
          lineZHOption.legend.data = lineXSOption.legend.data = lineOption.legend.data = submitData.submitLegendData
          lineZHOption.xAxis.data = lineXSOption.xAxis.data = lineOption.xAxis.data = submitData.xData(res.allDate2)
          lineZHOption.series[0].data = submitData.seriesData(res.allDate2,0)
          lineZHOption.series[1] = submitData.seriesText
          lineZHOption.series[1].data = submitData.seriesData(res.allDate2,3)

          lineXSOption.series[0].data = submitData.seriesData(res.allDate2,1)
          lineXSOption.series[1] = submitData.seriesText1
          lineXSOption.series[1].data = submitData.seriesData(res.allDate2,4)

          lineOption.series[0].data = submitData.seriesData(res.allDate2,2)
          lineOption.series[1] = submitData.seriesText2
          lineOption.series[1].data = submitData.seriesData(res.allDate2,5)

        }else if(val == '1' && text == ''){  // 选择薯片，且输入框没有
          lineZHOption.tooltip.formatter = lineXSOption.tooltip.formatter = lineOption.tooltip.formatter = submitData.initFormatter
          lineZHOption.legend.data = lineXSOption.legend.data = lineOption.legend.data = submitData.initLegendData
          lineZHOption.xAxis.data = lineXSOption.xAxis.data = lineOption.xAxis.data = submitData.xData(res.allDate)
          /*销售额趋势预测*/
          lineZHOption.series[0].data = submitData.seriesData(res.allDateChips,0)
          lineZHOption.series[1] != undefined ? lineZHOption.series[1].data = '' : null

          lineXSOption.series[0].data = submitData.seriesData(res.allDateChips,1)
          lineXSOption.series[1] != undefined ? lineXSOption.series[1].data = '' : null

          lineOption.series[0].data = submitData.seriesData(res.allDateChips,2)
          lineOption.series[1] != undefined ? lineOption.series[1].data = '' : null

        }else if(val == '1' && text != ''){ // 选择薯片，且输入框有数据
          lineZHOption.tooltip.formatter = lineXSOption.tooltip.formatter = lineOption.tooltip.formatter = submitData.submitFormatter
          lineZHOption.legend.data = lineXSOption.legend.data = lineOption.legend.data = submitData.submitLegendData
          lineZHOption.xAxis.data = lineXSOption.xAxis.data = lineOption.xAxis.data = submitData.xData(res.allDate2)
          lineZHOption.series[0].data = submitData.seriesData(res.allDateChips2,0)
          lineZHOption.series[1] = submitData.seriesText
          lineZHOption.series[1].data = submitData.seriesData(res.allDateChips2,3)

          lineXSOption.series[0].data = submitData.seriesData(res.allDateChips2,1)
          lineXSOption.series[1] = submitData.seriesText1
          lineXSOption.series[1].data = submitData.seriesData(res.allDateChips2,4)

          lineOption.series[0].data = submitData.seriesData(res.allDateChips2,2)
          lineOption.series[1] = submitData.seriesText2
          lineOption.series[1].data = submitData.seriesData(res.allDateChips2,5)
          /*
          lineZHOption.tooltip.formatter = submitData.submitFormatter
          lineZHOption.legend.data = submitData.submitLegendData
          lineZHOption.xAxis.data = submitData.xData(res.allDate2)
          lineZHOption.series[0].data = submitData.seriesData(res.allDateChips2,0)
          lineZHOption.series[1] = submitData.seriesText
          lineZHOption.series[1].data = submitData.seriesData(res.allDateChips2,3)*/
        }else {
          lineZHOption.tooltip.formatter = lineXSOption.tooltip.formatter = lineOption.tooltip.formatter = submitData.initFormatter
          lineZHOption.legend.data = lineXSOption.legend.data = lineOption.legend.data = submitData.initLegendData
          lineZHOption.xAxis.data = lineXSOption.xAxis.data = lineOption.xAxis.data = submitData.xData(res.allDate)
          /*销售额趋势预测*/
          lineZHOption.series[0].data = submitData.seriesData(res.allDate,0)
          lineZHOption.series[1] != undefined ? lineZHOption.series[1].data = '' : null

          lineXSOption.series[0].data = submitData.seriesData(res.allDate,1)
          lineXSOption.series[1] != undefined ? lineXSOption.series[1].data = '' : null

          lineOption.series[0].data = submitData.seriesData(res.allDate,2)
          lineOption.series[1] != undefined ? lineOption.series[1].data = '' : null
        }
        homeLineZH.setOption(lineZHOption);
        homeLineXS.setOption(lineXSOption);
        homeLine.setOption(lineOption);
      })


    })
})
