/**
 * @ markersKeyMap = {
 *  id1: {locaitonInfo},
 *  id2: {locaitonInfo}
 * }
 */

let markersKeyMap = {}
const myPointMarker = [{
  id: 0,
  title: '应聘者位置',
  latitude: 40.072019,
  longitude: 116.360161,
  callout: {
    content: '应聘者位置',
    color: '#fff',
    borderRadius: 3,
    bgColor: '#FC2B56',
    padding: 3,
  }
}]
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

export {
  handleMarkers,
  myPointMarker,
  markersKeyMap
}