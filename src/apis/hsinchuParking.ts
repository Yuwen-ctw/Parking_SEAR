import axios from 'axios'

async function getHsinChuParking() {
  try {
    console.log('fetch')
    const { data } = await axios.get('/api')
    return data
  } catch (err) {
    console.error(`Get HsinChu Parking failed: ${err}`)
    console.log(err)
    return []
  }
}

export default getHsinChuParking
