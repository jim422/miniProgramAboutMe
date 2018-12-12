const res = wx.getSystemInfoSync();
const radius = 40;
const perAngle = Math.PI * 2 / 100;
let speed = 0.1;
let ctx
function drawSkill() {
  ctx = wx.createCanvasContext('skillTree');
  
  drawJS(ctx, speed);
  drawReact(ctx, speed);
  drawKnockout(ctx, speed);  
  drawHtml(ctx, speed);
  drawCss(ctx, speed);
  speed += 1;
  var interval = setTimeout(drawSkill, 30);
  ctx.draw()
  if(speed > 100) {
    clearInterval(interval);
  }
}

function drawJS(ctx, speed) {
  var centerX = parseInt(res.windowWidth / 4) - 20;
  var centerY = 100;

  drawCircle({
    ctx,
    centerX,
    centerY,
    color: 'rgba(253, 246, 121, .5)'
  });

  drawLine({
    ctx,
    centerX,
    centerY,
    n: speed,
    color: 'rgba(253, 246, 121, 1)',
    score: 80
  });

  drawText({
    ctx,
    centerX,
    centerY: 160,
    text: 'js: 80%'
  })
}

function drawReact(ctx, speed) {
  let centerX = parseInt(res.windowWidth / 2);
  let centerY = 100;

  drawLine({
    ctx,
    centerX,
    centerY,
    n: speed,
    color: 'rgba(157, 255, 255, 1)',
    score: 75,
  })

  drawCircle({
    ctx,
    centerX,
    centerY,
    color: 'rgba(157, 255, 255, .5)'
  })

  drawText({
    ctx,
    centerX,
    centerY: 160,
    text: 'react：75%'
  })
}

function drawKnockout(ctx, speed) {
  let centerX = parseInt(res.windowWidth * 3 / 4) + 20;
  let centerY = 100;

  drawLine({
    ctx,
    centerX,
    centerY,
    n: speed,
    color: 'rgba(180, 66, 169, 1)',
    score: 80,
  })

  drawCircle({
    ctx,
    centerX,
    centerY,
    color: 'rgba(180, 66, 169, .5)'
  })

  drawText({
    ctx,
    centerX,
    centerY: 160,
    text: 'knockout：80%'
  })
}

function drawHtml(ctx, speed) {
  let centerX = parseInt(res.windowWidth / 3);
  let centerY = 240;

  drawLine({
    ctx,
    centerX,
    centerY,
    n: speed,
    color: 'rgba(98, 199, 254, 1)',
    score: 70,
  })

  drawCircle({
    ctx,
    centerX,
    centerY,
    color: 'rgba(98, 199, 254, .5)'
  })

  drawText({
    ctx,
    centerX,
    centerY: 300,
    text: 'html：70%'
  })
}

function drawCss(ctx, speed) {
  let centerX = parseInt(res.windowWidth*2 / 3);
  let centerY = 240;

  drawLine({
    ctx,
    centerX,
    centerY,
    n: speed,
    color: 'rgba(146, 2, 255, 1)',
    score: 70,
  })

  drawCircle({
    ctx,
    centerX,
    centerY,
    color: 'rgba(146, 2, 255, .5)'
  })

  drawText({
    ctx,
    centerX,
    centerY: 300,
    text: 'css：70%'
  })
}

function drawLine({ctx, color, n, centerX, centerY, score}) {
  let percent = n < score 
    ? n
    : score;

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(centerX, centerY)
  ctx.setFillStyle(color);
  ctx.arc(centerX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + percent * perAngle, false);
  ctx.lineTo(centerX, centerY)
  ctx.fill();
  ctx.closePath();
  ctx.restore();
}

function drawCircle({ ctx, color, centerX, centerY}) {
  ctx.save();
  ctx.beginPath();
  ctx.setFillStyle(color);
  ctx.arc(centerX, centerY, radius-5, 0, Math.PI*2, false);
  ctx.fill();
  ctx.closePath();
  ctx.restore();
}

function drawText({ ctx, centerY, centerX, text}) {
  ctx.setFillStyle('white');
  ctx.setTextAlign('center');
  ctx.setFontSize(15);
  ctx.fillText(text, centerX, centerY)
}

function clearDraw(){
  ctx.clearRect(0, 0, res.windowWidth, res.windowHeight);
  ctx.draw();
  speed = 0.1
}

export {
  drawSkill,
  clearDraw
}