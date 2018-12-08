import { drawPie } from './drawCanvas.js';
const STATUS = {
  1: '😄', //简单
  2: '🙂', //一般
  3: '☹️' // 困难
}

function howFarFromMe(result) {
  let transferBus = 0;
  let transferSubWay = 0;
  let distance = Number((result.distance / 1000).toFixed(2));
  let duration = caculateDuration(result.duration);

  result.steps.forEach(item => {
    if (item.mode == 'WALKING') {
      return false
    } else {
      item.lines.forEach(val => {
        if (val.vehicle === 'BUS') {
          transferBus = 2
        }
        if (val.vehicle === 'SUBWAY') {
          transferSubWay = 1
        }
      })
    }
  });
  //statisticeDistance(result)

  let vehicleScore = getStatus(transferBus + transferSubWay);
  let vehicleDes = getVehicleDes(transferBus + transferSubWay);
  let distanceScore = caculateDistanceScore(distance);
  let durationSocre = caculateDurationScore(result.duration)

  return {
    transferBus,
    transferSubWay,
    distance,
    duration,
    vehicleScore,
    distanceScore,
    durationSocre,
    vehicleDes
  }
}

function caculateDuration(time) {
  if (time < 60) {
    return `${time}分钟`
  } else {
    let hour = Math.floor(time / 60);
    let minute = time % 60 < 10
      ? '0' + time % 60
      : time % 60

    return `${hour}小时${minute}分钟`
  }
}

function caculateDistanceScore(distance) {
  if (distance < 15) {
    return getStatus(1)
  } else if (15 <= distance && distance <= 30) {
    return getStatus(2)
  } else {
    return getStatus(3)
  }
}

function caculateDurationScore(time) {
  if (time < 35) {
    return getStatus(1)
  } else if (35 <= time && time <= 70) {
    return getStatus(2)
  } else {
    return getStatus(3)
  }
}

function getStatus(score) {
  return STATUS[score]
}

function getVehicleDes(score) {
  return {
    1: '只需乘坐地铁',
    2: '只需乘坐公交',
    3: '需要从地铁换乘公交'
  }[score]
}

function statisticeDistance(result) {
  var statistic = {}

  result.steps.forEach(item => {
    if (item.mode == 'TRANSIT') {
      let vehicleType = item.lines[0].vehicle
      statistic[vehicleType] = (statistic[vehicleType] || 0) + item.lines[0].distance
    } else {
      statistic[item.mode] = (statistic[item.mode] || 0) + item.distance
    }
  })
  console.log(statistic, result.distance)
  drawPie(statistic, result.distance)
}

export {
  howFarFromMe,
  statisticeDistance
}