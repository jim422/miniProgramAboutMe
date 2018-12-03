const arrowArea = 6 // 为三角箭头预留10px
/**
 * params1 touch: 触屏信息
 * params2 params: component的 this 对象
 */

function leftBottom(positionInfo, params) {
  let left =  -params.properties.width - arrowArea + 'px';
  let top = 10 + 'px';

  params.setData({
    top: top,
    left: left,
    arrowClass: 'arrow-direct-left',
    arrowTop: positionInfo.elHeight / 2,
    arrowLeft: -arrowArea
  })
}

function leftTop(positionInfo, params) {

  let left = - params.properties.width - arrowArea + 'px';
  let top = -params.data.height + positionInfo.elHeight/2 + 5 + 'px';
  params.setData({
    top: top,
    left: left,
    arrowClass: 'arrow-direct-left',
    arrowTop: positionInfo.elHeight / 2 - 10,
    arrowLeft: -arrowArea
  })
}

function centerBottom(positionInfo, params) {
  let top = positionInfo.elHeight + arrowArea + 'px';
  let left = 0 + 'px';

  params.setData({
    top,
    left,
    arrowClass: 'arrow-direct-bottom',
    arrowTop: positionInfo.elHeight,
    arrowLeft: positionInfo.elWidth / 2
  })

}

function centerTop(positionInfo, params) {
  let left = '0px';
  let top = -params.data.height - arrowArea + 'px';

  params.setData({
    top,
    left,
    arrowClass: 'arrow-driect-top',
    arrowTop: - arrowArea,
    arrowLeft: positionInfo.elWidth / 2
  })
}

function rightBottom(positionInfo, params) {
  let left = positionInfo.elWidth + arrowArea + 'px';
  let top = 10 + 'px';

  params.setData({
    top: top,
    left: left,
    arrowClass: 'arrow-direct-right',
    arrowTop: positionInfo.elHeight / 2,
    arrowLeft: positionInfo.elWidth
  })
}

function rightTop(positionInfo, params) {
  let left = positionInfo.elWidth + arrowArea + 'px';
  let top = -params.data.height + positionInfo.elHeight/2 + 5 + 'px';

  params.setData({
    top: top,
    left: left,
    arrowClass: 'arrow-direct-right',
    arrowTop: positionInfo.elHeight / 2 - 10,
    arrowLeft: positionInfo.elWidth
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