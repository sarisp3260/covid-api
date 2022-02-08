

/* 
USA https://disease.sh/v3/covid-19/countries/USA
India https://disease.sh/v3/covid-19/countries/India
Brazil 
France
UK
Russia
Turkey
Italy 
Germany https://disease.sh/v3/covid-19/countries/Germany

*/
let totalBox = document.querySelector("#textBlue")
let deathBox = document.querySelector("#textRed")
let recoveredBox = document.querySelector("#textGreen")
let activeBox = document.querySelector("#textLigth")
let newCases = document.querySelector("#textOrange")
let newDeaths = document.querySelector("#textDarker")
/* ----------------------------------------------------- */
let buttonUs = document.querySelector("#buttonUs")
let buttonIn = document.querySelector("#buttonIn")
let buttonBr = document.querySelector("#buttonBr")
let buttonFr = document.querySelector("#buttonFr")
let buttonUK = document.querySelector("#buttonUK")
let buttonRu = document.querySelector("#buttonRu")
let buttonTr = document.querySelector("#buttonTr")
let buttonIt = document.querySelector("#buttonIt")
let buttonGr = document.querySelector("#buttonGr")

const getDataF = async(url)=>{
    let resp = await fetch(url);
    let data = await resp.json()
    return data
}

window.addEventListener('DOMContentLoaded', () =>{

    const setFilterB = async() => {
        /* Urls */
      let usa = await getDataF("https://disease.sh/v3/covid-19/countries/USA") 
        
        /* print Data */
      totalBox.innerHTML=` <li class="list-group-item numberData" id="textBlue">${usa.cases}</li>`
      deathBox.innerHTML=` <li class="list-group-item numberData" id="textRed">${usa.deaths}</li>`
      recoveredBox.innerHTML=` <li class="list-group-item numberData" id="textGreen">${usa.recovered}</li>`
      activeBox.innerHTML=` <li class="list-group-item numberData" id="textLigth">${usa.active}</li>`
      newCases.innerHTML=` <li class="list-group-item numberData" id="textOrange">${usa.todayCases}</li>`
      newDeaths.innerHTML=` <li class="list-group-item numberData" id="textDarker">${usa.todayDeaths}</li>`
    
    }
    
    setFilterB()
  })

const setFilter = async(country) => {
    /* Urls */
  let usa = await getDataF(`https://disease.sh/v3/covid-19/countries/${country}`) /* `https://disease.sh/v3/covid-19/countries/${country}` */
    
    /* print Data */
  totalBox.innerHTML=` <li class="list-group-item numberData" id="textBlue">${usa.cases}</li>`
  deathBox.innerHTML=` <li class="list-group-item numberData" id="textRed">${usa.deaths}</li>`
  recoveredBox.innerHTML=` <li class="list-group-item numberData" id="textGreen">${usa.recovered}</li>`
  activeBox.innerHTML=` <li class="list-group-item numberData" id="textLigth">${usa.active}</li>`
  newCases.innerHTML=` <li class="list-group-item numberData" id="textOrange">${usa.todayCases}</li>`
  newDeaths.innerHTML=` <li class="list-group-item numberData" id="textDarker">${usa.todayDeaths}</li>`

}

setFilter()


 /* ----------------------------------------------------------------------------- */

/* USA */
 buttonUs.addEventListener('click', ()=>{
    setFilter("USA")
 })

/* India */
 buttonIn.addEventListener('click', ()=>{
    setFilter("India")
 })

/* Brazil */
 buttonBr.addEventListener('click', ()=>{
    setFilter("Brazil")
 })

/* France */
 buttonFr.addEventListener('click', ()=>{
    setFilter("France")
 })

/* UK */
 buttonUK.addEventListener('click', ()=>{
    setFilter("UK")
 })

/* Russia */
 buttonRu.addEventListener('click', ()=>{
    setFilter("Russia")
 })

/* Turkey */
 buttonTr.addEventListener('click', ()=>{
    setFilter("Turkey")
 })

/* Italy */
 buttonIt.addEventListener('click', ()=>{
    setFilter("Italy")
 })

/* Germany */
 buttonGr.addEventListener('click', ()=>{
    setFilter("Germany")
 })


 /* --------------------------------Sidebar print data Api------------------------------------------------------ */


 const countries = document.querySelector(".main_country")

  /*Consumo de api y renderizado top 10 country con banderas*/
fetch('https://disease.sh/v3/covid-19/countries?sort=cases')
.then(response => response.json()) 
.then(data => { 
     /* console.log(data) */
     /*Muestra solo 10 elementos*/
  const limit = 10;
  let datas = data.slice(0, limit)
   /*Recorre el array y extrae las propiedades que se mostraran*/
     datas.map(dat => {
          
          countries.innerHTML += `<div class="first_div">
                                    <div class="second_div">
                                        <img src="${dat.countryInfo.flag}">
                                        <p class="name">${dat.country}</p>
                                    </div>
                                    <p class="cases">${dat.cases}</p>
                                  </div>
                                `
           
          
      }); 
});

const total = document.querySelector(".total_case")
 const active = document.querySelector(".active_case")
 const recovered = document.querySelector(".recovered_case")
 const death = document.querySelector(".death_case")
 /*Consumo de api y renderizado de casos a nivel mundial*/
 const getData = async()=>{
    const resp = await fetch("https://disease.sh/v3/covid-19/all")
    const data = await resp.json()
    
        /*Al ser un objeto no es becesario recorrerlo, se accede directamente a cada propiedad*/
        /*Seccion primera superior*/
      total.innerHTML=` <h6>Total Case</h6><p>${data.cases}</p>`
      active.innerHTML=` <h6>Active Case</h6><p>${data.active}</p>`
      recovered.innerHTML=` <h6>Recovered Case</h6><p>${data.recovered}</p>`
      death.innerHTML=` <h6>Deaths Case</h6><p>${data.deaths}</p>`
          
  }

  
getData()

