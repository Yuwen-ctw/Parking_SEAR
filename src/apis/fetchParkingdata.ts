import axios from 'axios'

export async function getHsinchuParking() {
  try {
    console.log('fetch hc')
    const { data } = await axios.get('/api')
    return data
  } catch (err) {
    console.error(`Get Hsinchu Parking failed: ${err}`)
    console.log(err)
    return []
  }
}

// export async function getTaipeiParking() {
//   try {
//     console.log('fetch tp')
//     const parkingInfoPromise = axios.get('http://localhost:3001/tpInfo')
//     const parkingAvailablePromise = axios.get('http://localhost:3001/tpdata')

//     const results = await Promise.all([
//       parkingInfoPromise.then((result) => result.data.data),
//       parkingAvailablePromise.then((result) => result.data.data),
//     ])

//     console.log(results)
//     return []
//   } catch (err) {
//     console.error(`Get Taipei Parking failed: ${err}`)
//     console.log(err)
//     return []
//   }
// }
