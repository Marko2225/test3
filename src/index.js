import { getUpcomingLaunches } from "./service"
const PLACEHOLDER_IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN89e1VPQAI5wNLn0/opgAAAABJRU5ErkJggg=='

import { getCompanyInfo } from './service.js';
import { getSatelite } from './service.js';
//import { getUpcomingLaunches} from './service.js';

const header = document.querySelector('#header')
const satelite = document.querySelector('#satelite')
const divLaunches = document.querySelector('.launch-list')
const btnUpcomingLaunches = document.querySelector('#btn-upcoming')

let launches = []
getCompanyInfo().then(res => {
    console.log(res.data)

    const naziv = document.createElement('p')
    naziv.textContent = res.data.name


    const godinaOsnivanja = document.createElement('p')
    godinaOsnivanja.textContent = res.data.founded

    const headquartersAdd = document.createElement('p')
    headquartersAdd.textContent = res.data.headquarters.address

    const hState = document.createElement('p')
    hState.textContent = res.data.headquarters.state

    const hCity = document.createElement('p')
    hCity.textContent = res.data.headquarters.city


    header.append(naziv, godinaOsnivanja, headquartersAdd, hState, hCity)
})

const LaunchVersion = element => {
    const version = document.createElement('p')
    version.textContent = element.version
    const TLO = document.createElement('p')
    TLO.textContent = element.spaceTrack.TLE_LINE0


    satelite.append(version, TLO)
}

getSatelite().then(res => {
    console.log(res.data[0].spaceTrack)

    //treba forEach
    res.data.forEach(element => {
        LaunchVersion(element)

    })


    let options = res.data.map(element => {
        console.log(element.version)
        return element.version
    })

    //  let options = res.data
    const Select = (options) => {
        options = new Set(options)
        const select = document.createElement('select')
        const defOption = document.createElement('option')
        defOption.value = '-1'
        defOption.selected = true
        defOption.disabled = true
        defOption.hidden = true
        defOption.textContent = 'Choose version'
        select.appendChild(defOption)

        options.forEach(option => {
            const opt = document.createElement('option')
            opt.value = option
            opt.textContent = option ? option : 'Other'
            select.appendChild(opt)
            header.prepend(select)
        })
        select.addEventListener('change', (event) => {
            satelite.innerHTML = ''
            let tmp = res.data
            tmp = res.data.filter(element => {
                console.log(event.target.value);
                console.log(element.version === event.target.value);
                return element.version == event.target.value

            })
            console.log(res.data)
            tmp.forEach(element => {

                LaunchVersion(element)

            })


        })

        return select
    }
    Select(options)


})



const Launch = (launch) => {
    const divContainer = document.createElement('div')
    divContainer.className = 'launch'
    divContainer.innerHTML = `
            <div class="inner-div-0">
                <img src="${launch.links.patch.small ? launch.links.patch.small : PLACEHOLDER_IMG}" alt="">
            </div>
            <div class="inner-div-1">
                <span>${launch.name}</span>
            </div>
           
        `
    return divContainer
}

const Launches = (launches) => launches.map(launch => Launch(launch))
btnUpcomingLaunches.addEventListener('click', () => {
    divLaunches.innerHTML = ''
    getUpcomingLaunches().then(res => {
        console.log([res.data])
        //resenje za next
        launches = [res.data]
        //resenje za upcoming
        // launches = [res.data[0]]
        divLaunches.append(...Launches(launches))
    })
})