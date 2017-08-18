$(function () {
  $.getJSON('../json/home.json')
    .then(function (res) {
      var provinces = res.selectOne;  //筛选数据
      var allDate;

      /*因子选择按钮点击事件*/
      $('#factorSelection').on('click',function () {
        $('.factorSelection').toggle(1000)
      })

      /*人工调价点击事件*/
      $('#artificiAldjustment').on('click',function () {
        $('#optimal').css(submitData.displayNone)
        $('.artificiAldjustment').toggle(1000)
      })

      //三级下拉菜单
      var options = provinces.map(function (item, index) {
        return '<option value="' + item.value + '" data-index="' + index + '">' + item.name + '</option>';
      })

      $('.oneSelectRule').html('<option data-index="-1">--please select--</option>' + options);

      $('.oneSelectRule').on('change', function () {

        var index = $(this).find('option:selected').data('index');

        if (index == -1) {
          $('.twoSelectRule').html('<option data-index="-1">--please select--</option>');
          return;
        }

        var provinceIevel = provinces[index]['provinceIevel'];

        var option_dep = provinceIevel.map(function (item, index) {
          return '<option value="' + item.value + '" data-index="' + index + '">' + item.name + '</option>';
        })
        $('.twoSelectRule').html('<option data-index="-1">--please select--</option>' + option_dep);
      })

      $('.twoSelectRule').on('change', function () {
        var index = $(this).find('option:selected').data('index');
        var p_index = $('.oneSelectRule').find('option:selected').data('index');

        if (index == -1) {
          $('.twoSelectRule').html('<option data-index="-1">--please select--</option>');
          return;
        }

        var area = provinces[p_index]['provinceIevel'][index]['department'];
        if (!provinces[p_index]['provinceIevel'][index]['department']) {
          $('.threeSelectRule').css('display', 'none');
          return;
        } else {
          $('.threeSelectRule').css('display', 'inline-block');
          var area_dep_option = area.map(function (item, index) {
            return '<option value="' + item.value + '" data-index="' + index + '">' + item.name + '</option>';
          })
          $('.threeSelectRule').html('<option data-index="-1">--please select--</option>' + area_dep_option);
        }

      })

      // 人工调价第三级 选择事件
      $('.threeSelectRule').change(function(){
        var text = $('.threeSelectRule option:selected').text()
        if(text == 'percentage' || text == 'amount' || text == 'max' || text == 'min'){
          $('.fourSelectRule').val('0')
          $('.fourSelectRule').css(submitData.displayNone)
          $('#pricing_text').css(submitData.displayInline)
        }else if(text == 'priority' || text == 'worst'){
          $('#pricing_text').val('')
          $('#pricing_text').css(submitData.displayNone)
          $('.fourSelectRule').css(submitData.displayInline)
        }
      })

      // 人工调价 提交按钮
      $('#artificiAldjustmentSubmit').on('click',function () {
        var selectText = $('.fourSelectRule').val()
        var inputText = $('#pricing_text').val()
        if(selectText != '0' || inputText != ''){
          submitData.recommend = Math.floor(Math.random()*10+65)
          submitData.cycle = Math.floor(Math.random()*3+1)
          $('#input1').attr('placeholder',submitData.recommend)
          $('#input2').attr('placeholder',submitData.cycle + 'months')
          $('#optimal').css(submitData.displayInline)
          $('#select_text').val(submitData.recommend)
          submitData.subVal = $('.threeSelect').val()
          submitData.subText = $('#select_text').val()
          sub(submitData.subVal,submitData.subText)
        } else {
          alert('Please select the conditions first！！！')
        }
      })

      //KPI
      $('.inventory').html(res.init_KPI.inventory /  100 + 'M');
      $('.price').html('￥' + res.init_KPI.price);
      $('.profits').html('￥' + res.init_KPI.profits);
      $('.rain').html('￥' + res.init_KPI.rain);
      $('.kpi_select').html('￥' + res.KPI_select[0]);

      // KPI select选择事件
      $('#KPI_select').change(function(){
        var val = $('#KPI_select').val()
        $('.kpi_select').html('￥' + res.KPI_select[val])
      })

      //销售额趋势预测
      var homeLineZH = echarts.init(document.getElementById('homeLineZH'));
      var lineZHOption = {
        title: {
          left: 'left',
          text: 'Forecast trend of sales',
          top: 6,
        },
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%'];
          },
          formatter: '{b}<br />{a0}: {c0}' + '（10K）'
        },
        legend: {
          top: 35,
          left: 10,
          data: ['suggested price']
        },
        grid: {
          top: '33%',
          left: '10%',
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
            name: "￥10K",
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: 'suggested price',
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
          text: 'Forecast trend of margin',
          top: 6,
        },
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%'];
          },
          formatter: '{b}<br />{a0}: {c0}' + '（10K）'
        },
        legend: {
          top: 35,
          left: 10,
          data: ['suggested price']
        },
        grid: {
          top: '33%',
          left: '10%',
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
            name: "￥10K",
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: 'suggested price',
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
          text: 'Forecast trend of sales volume',
          top: 6,
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b}<br />{a0}: {c0}' + '（10K）'
        },
        legend: {
          top: 35,
          left: 10,
          data: ['suggested price']
        },
        grid: {
          top: '33%',
          left: '10%',
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
            name: "￥10K",
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: 'suggested price',
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

      // 人工调价 提交
      /*$('#changeSub').change(function () {
        var changeText = $('#changeSub').val()
        if(changeText > submitData.min && changeText < submitData.max){
          $('#select_text').val(changeText)
          submitData.subVal = $('.threeSelect').val()
          submitData.subText = $('#select_text').val()
          sub(submitData.subVal,submitData.subText)
        }else if(changeText != ''){
          alert('请输入最优价格区间值！！！')
        }else{
          $('#select_text').val('')
        }
      })*/

      //提交
      $('#dateSubmit2').on('click', function () {
        submitData.subVal = $('.threeSelect').val()
        submitData.subText = $('#select_text').val()
        sub(submitData.subVal,submitData.subText)
      })

      function sub(val,text) {
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
      }
    })
})
