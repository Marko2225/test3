import axios from 'axios'
const BASE_URL = 'https://api.spacexdata.com/v4'
const LAUNCHES = '/launches'

const UPCOMING_LAUNCHES = `${LAUNCHES}/upcoming`

//export const getUpcomingLaunches = () => axios.get(`${BASE_URL}${UPCOMING_LAUNCHES}`)
//moze i ovako https://api.spacexdata.com/v4/launches/next
 export const getUpcomingLaunches = () => {
return axios.get(`https://api.spacexdata.com/v4/launches/next`)}

export const getCompanyInfo = () => {
    return axios.get('https://api.spacexdata.com/v3/info')
}

export const getSatelite = () => {
    return axios.get('https://api.spacexdata.com/v4/starlink')
}