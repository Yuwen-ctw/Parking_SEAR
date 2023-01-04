import axios from 'axios'
import data from 'data/hcParkInfo.json'

async function getHsinChuParking() {
  try {
    console.log('fetch')
    const res = await axios.get(
      'https://cors-anywhere.herokuapp.com/https://hispark.hccg.gov.tw/OpenData/GetParkInfo'
    )
    return res.data
  } catch (err) {
    console.log(err)
  }
}

export default getHsinChuParking
