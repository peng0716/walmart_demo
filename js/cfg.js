var submitData = {
  displayBlock:{'display':'block'},
  displayInline:{'display':'inline-block'},
  displayNone:{'display':'none'},
  recommend: 0,
  cycle: 0,
  testRandom: 0,
  subVal: '',
  subText: '',
  initFormatter : '{b}<br />{a0}: {c0}' + '（万）',
  submitFormatter : '{b}<br />{a0}: {c0}' + '（万）' + '<br />{a1}: {c1}' + '（万）',
  initLegendData : ['By 建议价格'],
  submitLegendData : ['By 建议价格','By 人工调价'],
  xData : function (data) {
    var ary = []
    data.map(function (item) {
      ary.push(item.date)
    })
    return ary
  },
  seriesText: {
    name: 'By 人工调价',
    type: 'line',
    yAxisIndex: 0,
    smooth: true
  },
  seriesText1: {
    name: 'By 人工调价',
    type: 'line',
    yAxisIndex: 0,
    smooth: true
  },
  seriesText2: {
    name: 'By 人工调价',
    type: 'line',
    yAxisIndex: 0,
    smooth: true
  },
  seriesData : function (data,identify) {
    var ary = [],text = ['sales','benefit','sell','salesArtificial','benefitArtificial','sellArtificial']
    data.map(function (item) {
      ary.push(item[text[identify]] / 10000)
    })
    return ary
  }
}