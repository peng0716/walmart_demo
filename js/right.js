
  $.ajaxSettings.async = false  // 同步
  var res = $.getJSON('../json/home.json',function (data) {
    res = data
    })
  res = res.responseJSON
  //树形结构图
  var channelForce = echarts.init(document.getElementById('channelForce'));
  var channelForce_option = {
    title: {
      text: 'Analysis of competition situation',
      left: 10,
      top: 10
    },
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove',
    },
    series: [
      {
        type: 'sankey',
        layout: 'none',
        data: res.nodes,
        links: res.links,
        nodeWidth: 50,
        nodeGap: 14,
        label: {
          normal: {
            show: true,
            formatter: '{b}:{c}（10K）'
          },
        },
        itemStyle: {
          normal: {
            borderWidth: 1,
            borderColor: '#aaa'
          }
        },
        lineStyle: {
          normal: {
            curveness: 0.5
          }
        }
      }
    ]
  };
  channelForce.setOption(channelForce_option);

  //中国地图
  $.ajax({
    url: '../json/geoJson/area.geo.json',
    async: false,
    success: function (chinaJson) {
      echarts.registerMap('china', chinaJson);
    }
  })
  var homeChina = echarts.init(document.getElementById('homeChina'));
  var chinaOption = {
    color: ['#FF4455', '#568EFD'],
    title: {
      text: 'The regional price distribution',
      top: 10,
      left: 10,
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a}：<br />{b}：{c}',
    },
    visualMap: {
      min: 20,
      max: 120,
      left: 'left',
      top: 'bottom',
      text: ['high', 'low'],           // 文本，默认为数值文本
      calculable: true,
      color: ['orangered', 'yellow', 'lightskyblue']
    },
    series: [
      {
        name: 'PI Value',
        type: 'map',
        mapType: 'china',
        selectedMode: 'single',
        left: 120,
        zoom: 1.2,
        label: {
          normal: {
            show: true
          },
          emphasis: {
            show: true
          }
        },
        data: res.provinceIevel.map(function (item) {
          var value = item.value / 10000
          return {name: item.name, value: value}
        })
      }
    ]
  };
  homeChina.setOption(chinaOption);

  //柱状图
  var homeBar = echarts.init(document.getElementById('homeBar'));
  var barOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      },
      formatter: '{b}<br />{a0}: {c0}' + '<br />{a1}: {c1}'
    },
    legend: {
      data: ['Current price', 'profit'],
      top: 25,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      axisLabel: {
        interval: 0,
      },
      data: res.provinceIevel.map(function (item) {
        return item.name
      })
    },
    yAxis: [
      {
        type: 'value',
        name: 'yuan'
      },
      {
        type: 'value',
        name: 'yuan',
        max: 70
      }
    ],
    series: [
      {
        name: 'Current price',
        type: 'bar',
        yAxisIndex: 0,
        label: {
          normal: {
            show: false
          }
        },
        data: res.provinceIevel.map(function (item) {
          return item.areaSales / 10000
        })
      },
      {
        name: 'profit',
        type: 'line',
        yAxisIndex: 1,
        label: {
          normal: {
            show: false
          }
        },
        data: res.provinceIevel.map(function (item) {
          return item.areaProxy / 10000
        })
      }
    ]
  };
  homeBar.setOption(barOption);
  echarts.connect([homeChina, homeBar]);

  //地图点击方法
  function homeChinaClick(data) {
    barOption.xAxis.data = data.map(function (item) {
      return item.name
    });
    barOption.series[0].data = data.map(function (item) {
      return item.departmentSales / 10000
    });
    barOption.series[1].data = data.map(function (item) {
      return item.departmentProxy / 10000
    });
    homeBar.setOption(barOption);
    homeChina.group = ' ';   //取消图形联动
  }

  //柱状图点击方法
  function homeBarClick(data) {
    barOption.xAxis.data = data.map(function (item) {
      return item.name
    })
    barOption.series[0].data = data.map(function (item) {
      return item.areaSales / 10000
    })
    barOption.series[1].data = data.map(function (item) {
      return item.areaProxy / 10000
    })
    homeBar.setOption(barOption);
    echarts.connect([homeChina, homeBar]);
    window.flag = 0;
  }

  // 标识，是否筛选
  var allDate

  //地图初始化点击事件  层叠柱状图下钻
  homeChina.on('click', function (param) {
    /*if(!window.flag) {*/
    if (allDate == undefined) {  //初始化点击
      window.flag = 1;
      var dataIndex = param.dataIndex;
      var data = res.provinceIevel[dataIndex].department;
      homeChinaClick(data)
    } else {
      window.flag = 1;
      var dataIndex = param.dataIndex;
      var data = res.provinceIevel2[dataIndex].department;
      homeChinaClick(data)
    }
  })

  //柱状图初始化点击事件返回
  homeBar.on('click', function (param) {
    if (allDate == undefined) {  //初始化点击
      var data = res.provinceIevel
      homeBarClick(data)
    } else {
      var data = res.provinceIevel2;
      homeBarClick(data)
    }
  });

  /*预警详情点击事件*/
  $('#warningParticulars').on('click',function () {
    var state = $('#warningState option:selected').text()
    $('.stateData').text(state)
    $('.warningParticulars').toggle(1000)
  })

  function warningSub(data) {
    var parentsTr = $(data).parents('tr'),
      category = parentsTr.children('td').eq(2).text(),
      itemName = parentsTr.children('td').eq(1).text()
    $('#categoryId option:selected').text(category)
    $('#itemNameId option:selected').text(itemName)
    submitData.testRandom = (Math.random()*3+1).toFixed(2)
    /*地图*/
    chinaOption.visualMap.min = 20 * submitData.testRandom
    chinaOption.visualMap.max = 120 * submitData.testRandom
    console.log(chinaOption.visualMap.max)
    chinaOption.series[0].data = res.provinceIevel.map(function (item) {
      var value = (item.value / 10000 * submitData.testRandom).toFixed(3)
      return {name: item.name, value: value}
    })
    /*柱状图*/
    barOption.series[0].data = res.provinceIevel.map(function (item) {
      return (item.areaSales / 10000 * submitData.testRandom).toFixed(4)
    })
    barOption.yAxis[1].max = (70 * submitData.testRandom).toFixed()
    barOption.series[1].data = res.provinceIevel.map(function (item) {
      return (item.areaProxy / 10000 * submitData.testRandom).toFixed(4)
    })

    homeChina.setOption(chinaOption);
    homeBar.setOption(barOption);
  }
