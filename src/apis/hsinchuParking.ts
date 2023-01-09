import axios from 'axios'
import data from 'data/hcParkInfo.json'

async function getHsinChuParking() {
  try {
    console.log('fetch')
    // const { data } = await axios.get(
    //   'https://hispark.hccg.gov.tw/OpenData/GetParkInfo'
    // )
    return data
  } catch (err) {
    console.error(`Get HsinChu Parking failed: ${err}`)
    console.log(err)
    return []
  }
}

export default getHsinChuParking
