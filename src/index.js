import {  getUpcomingLaunches } from "./service"
const PLACEHOLDER_IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN89e1VPQAI5wNLn0/opgAAAABJRU5ErkJggg=='

import { getCompanyInfo } from './service.js';
import { getSatelite } from './service.js';
//import { getUpcomingLaunches} from './service.js';

const header = document.querySelector('#header')
const satelite = document.querySelector('#satelite')
const divLaunches = document.querySelector('.launch-list')
const btnUpcomingLaunches = document.querySelector('#btn-upcoming')

let launches = []
    getCompanyInfo().then(res=> {
        console.log(res.data)

        const naziv = document.createElement('p')
        naziv.textContent= res.data.name

      
        const godinaOsnivanja = document.createElement('p')
        godinaOsnivanja.textContent= res.data.founded

        const headquartersAdd= document.createElement('p')
        headquartersAdd.textContent=res.data.headquarters.address

        const hState= document.createElement('p')
        headquartersAdd.textContent=res.data.headquarters.state

        const hCity= document.createElement('p')
        headquartersAdd.textContent=res.data.headquarters.city


    header.append(naziv,godinaOsnivanja,headquartersAdd,hState,hCity)
    })

    getSatelite().then(res=> {
        console.log(res.data[0].spaceTrack)

        //treba forEach
        res.data.forEach(element => {
          //  console.log(element.spaceTrack)
           // console.log(element.version)
             const version = document.createElement('p')
        version.textContent= element.version
         const TLO = document.createElement('p')
        TLO.textContent= element.spaceTrack.TLE_LINE0
        satelite.append(version,TLO )

        });

       // const TLO = document.createElement('p')
        //TLO.textContent= res.data.spaceTrack.TLE_LINE0

      
        // const version = document.createElement('p')
        // version.textContent= res.data.spaceTrack.version

        

        // satelite.append(version )
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
    btnUpcomingLaunches.addEventListener('click',() => {
        divLaunches.innerHTML = ''
        getUpcomingLaunches().then(res => {
            console.log([res.data])
            launches = [res.data]
            divLaunches.append(...Launches(launches))
        })
    })