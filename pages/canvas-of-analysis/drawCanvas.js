const Fill_STYLE = {
  BUS: '#F65D9C',
  WALKING: '#6C6DFF',
  SUBWAY: '#61E0C5'
}
const VEHICLE = {
  BUS: '公交',
  WALKING: '步行',
  SUBWAY: '地铁'
}
const ARC_X = 150; //圆心的x坐标
const ARC_Y = 80; //圆心的y坐标
const RADIUS = 60

function drawPie(statistic, amount) {
  var ctx = wx.createCanvasContext('pieChart');
  //计算每一米所占比重，最后化成百分比
  let perProportion = 100 / amount / 100;

  let beginAngle = 0;
  let endAngle = 0;
  let keys = Object.keys(statistic);

  keys.forEach(item => {
    beginAngle = endAngle;
    endAngle = beginAngle + 2 * Math.PI * statistic[item] * perProportion;
    ctx.beginPath();
    ctx.moveTo(ARC_X, ARC_Y);
    ctx.arc(ARC_X, ARC_Y, RADIUS, beginAngle, endAngle);
    ctx.lineTo(ARC_X, ARC_Y);
    ctx.setFillStyle(Fill_STYLE[item]);
    ctx.fill();
  })
  drawPieText({ ctx, statistic, perProportion })
  ctx.draw()
}

function drawPieText({ statistic, perProportion, ctx }) {
  const WIDTH = 30;
  const HEIGHT = 5;
  const RECT_BASE_LINE_X = 250;
  const RECT_LINE_Y_START = 90;
  const MARGIN = 9 //上间距
  let keys = Object.keys(statistic);
  keys.forEach((item, index) => {
    let y = RECT_LINE_Y_START + (HEIGHT * index) + (index == 0 ? 0 : MARGIN * index);
    let text = `${VEHICLE[item]}: ${statistic[item]}`
    ctx.beginPath();
    ctx.rect(RECT_BASE_LINE_X, y, WIDTH, HEIGHT);
    ctx.setFillStyle(Fill_STYLE[item]);
    ctx.fill();

    ctx.setTextBaseline('middle')
    ctx.setFontSize(12);
    ctx.setFillStyle('white');
    ctx.fillText(text, RECT_BASE_LINE_X + WIDTH + MARGIN, y + 3)
  })
}

export {
  drawPie
}