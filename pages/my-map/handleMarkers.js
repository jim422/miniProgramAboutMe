const myPointMarker = [{
  id: 0,
  title: '应聘者位置',
  latitude: 40.072019,
  longitude: 116.360161,
  label: {
    content: '应聘者位置',
    color: 'white'
  }
}]

/**
 * @ markersKeyMap = {
 *  id1: {locaitonInfo},
 *  id2: {locaitonInfo}
 * }
 */
let markersKeyMap = {
  0: myPointMarker[0]
}
/**
 * 为了方便使用scroll-into-view属性，在每个Id前加上字符串，（api 要求id不能以  * 数字开头）
 * 
 */
function handleMarkers(res) {
  let data = res.data;
  return data.map((item, index) => {
    let packaged = {
      id: 'w_' + item.id,
      title: item.title,
      latitude: item.location.lat,
      longitude: item.location.lng,
      distance: item._distance,
      index: index,
      callout: {
        content: item.title,
        color: '#fff',
        borderRadius: 3,
        padding: 3,
        bgColor: '#FC2B56'
      },
      label: {
        content: index + 1,
        color: 'white'
      },
      alpha: 0.7
    }
    markersKeyMap[packaged.id] = packaged;
    return packaged
  })
}

function hrPointMarker(longitude, latitude) {
  return [{
    id: 'hr',
    title: '我的位置',
    latitude: latitude,
    longitude: longitude,
    label: {
      content: '我的位置',
      color: 'white'
    }
  }]
}

function removeCompanyMarkers(markers, selectedMarkerId) {
  return markers.filter(item => item.id === 0 || item.id === selectedMarkerId )
}

function markTransferPoints(marker, coots) {
  let list = [];
  coots.steps.forEach(item => {
    if(item.mode == 'TRANSIT') {
      let info = item.lines[0]
      list.push(putItIn(info.geton, 'on', info.vehicle))
      list.push(putItIn(info.getoff, 'off', info.vehicle))
    }
  })
  return list
}

function putItIn(data, action, type) {
  let tips = action == 'on' ? '站上车' : '站下车';
  let iconPath = type === 'SUBWAY' 
    ? '../../assets/images/subway.png'
    : '../../assets/images/bus.png'
  return {
    id: data.id,
    title: data.title,
    latitude: data.location.lat,
    longitude: data.location.lng,
    callout: {
      content: data.title + tips,
      color: '#fff',
      borderRadius: 3,
      padding: 3,
      bgColor: '#FC2B56'
    },
    iconPath
  }
}

export {
  handleMarkers,
  myPointMarker,
  markersKeyMap,
  hrPointMarker,
  removeCompanyMarkers,
  markTransferPoints
}