/**
 * params1 touch: 触屏信息
 * params2 params: component的 this 对象
 */

function leftBottom(positionInfo, params) {
  let left = positionInfo.offsetLeft - params.properties.width + 'px';
  let top = positionInfo.offsetTop - params.properties.height + 'px';

  params.setData({
    top: top,
    left: left
  })
}

function leftTop(positionInfo, params) {

  let left = positionInfo.clientX - params.properties.width + 'px';

  //如果距离顶部高度小自身高度的1/2（因为有一半的内容会被截取） 那就在点击的坐标高度上显示，
  let top = positionInfo.clientY < params.properties.height/ 2 
    ? positionInfo.pageY + 'px'
    : positionInfo.clientY - params.properties.height/3 + 'px'
  params.setData({
    top: top,
    left: left
  })
}

function centerBottom(positionInfo, params) {
  //let left = 

}

function centerTop(positionInfo, params) {

}

function rightBottom(positionInfo, params) {
  let left = positionInfo.pageX + 'px';
  let top = positionInfo.offsetTop - params.properties.height + 'px';

  params.setData({
    top: top,
    left: left
  })
}

function rightTop(positionInfo, params) {
  let left = positionInfo.pageX + 'px';
  let top = positionInfo.pageY + 'px';

  params.setData({
    top: top,
    left: left
  })
}


var positionList = {
  left_bottom: leftBottom,
  left_top: leftTop,
  center_bottom: centerBottom,
  center_top: centerTop,
  right_bottom: rightBottom,
  right_top: rightTop
}

export {
  positionList
}