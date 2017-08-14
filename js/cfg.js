var submitData = {
  displayBlock:{'display':'block'},
  displayInline:{'display':'inline-block'},
  displayNone:{'display':'none'},
  recommend: 0,
  cycle: 0,
  testRandom: 0,
  subVal: '',
  subText: '',
  initFormatter : '{b}<br />{a0}: {c0}' + '（10K）',
  submitFormatter : '{b}<br />{a0}: {c0}' + '（10K）' + '<br />{a1}: {c1}' + '（10K）',
  initLegendData : ['suggested price'],
  submitLegendData : ['suggested price','manually pricing'],
  xData : function (data) {
    var ary = []
    data.map(function (item) {
      ary.push(item.date)
    })
    return ary
  },
  seriesText: {
    name: 'manually pricing',
    type: 'line',
    yAxisIndex: 0,
    smooth: true
  },
  seriesText1: {
    name: 'manually pricing',
    type: 'line',
    yAxisIndex: 0,
    smooth: true
  },
  seriesText2: {
    name: 'manually pricing',
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