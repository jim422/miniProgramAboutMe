function transit(coots) {
  let polylineList = [];
  let pl = [];
  let markers =[]
  let kr = 1000000;
  coots.steps.forEach(item => {
    if (item.mode == 'WALKING') {
      polylineList = caculateWalkPoly(item, polylineList)
    } else if (item.mode == 'TRANSIT') {
      console.log(item)
      polylineList = polylineList.concat(item.lines[0].polyline)
    }
  })
  
  for (var i = 2; i < polylineList.length; i++) {
    polylineList[i] = Number(polylineList[i - 2]) + Number(polylineList[i]) / kr;
  }

  for (var j = 0; j < polylineList.length; j+= 2) {
    pl.push({ latitude: polylineList[j], longitude: polylineList[j + 1] })
  }
  

  return {
    pl
  }
}

function caculateWalkPoly(item, polyLineList) {
  if (item.polyline) {
    return polyLineList.concat(item.polyline)
  } else {
    return polyLineList
  }
}

function driving(coots) {
  
}

var coostsType = {
  transit: transit,
  driving: driving
}

export {
  coostsType
}