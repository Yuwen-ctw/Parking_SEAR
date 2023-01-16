import axios from 'axios'
import proj4 from 'proj4'

proj4.defs([
  [
    'EPSG:3826',
    '+title=TWD97 TM2+proj=tmerc +lat_0=0 +lon_0=121 +k=0.9999 +x_0=250000 +y_0=0 +ellps=GRS80 +units=公尺 +no_defs',
  ],
])

export async function getHSCParking() {
  try {
    const { data } = await axios.get('/api-hsc')
    return data
  } catch (err) {
    console.error(`Get Hsinchu Parking failed: ${err}`)
    console.log(err)
    return []
  }
}

export async function getTPEParking() {
  try {
    // fetch data
    const parkingInfoPromise = axios.get('/api-tpeInfo')
    const parkingAvailablePromise = axios.get('/api-tpeData')
    const results = await Promise.all([
      parkingInfoPromise.then((result) => result.data.data),
      parkingAvailablePromise.then((result) => result.data.data),
    ])
    const [infoData, availableData] = results
    const updateTime = availableData.UPDATETIME.replace('CST', '')

    // merge "info" and "available" data
    const data = infoData.park.map((park: any) => {
      // transform coords from EPSG3826 to EPSG4326
      const EPSG4326Coordinates = proj4('EPSG:3826', 'EPSG:4326', [
        Number(park.tw97x),
        Number(park.tw97y),
      ])
      park.updateTime = updateTime
      park.lat = EPSG4326Coordinates[1]
      park.lng = EPSG4326Coordinates[0]
      const getAvlData = availableData.park.find(
        (avlPark: any) => avlPark.id === park.id
      )
      return getAvlData ? { ...park, ...getAvlData } : park
    })
    return data
  } catch (err) {
    console.error(`Get Taipei Parking failed: ${err}`)
    console.log(err)
    return []
  }
}
