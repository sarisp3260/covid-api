const topCases = document.querySelector(".topCases")
const todayCases = document.querySelector(".todayCases")
const topDeaths = document.querySelector(".topDeaths")
const todayDeaths = document.querySelector(".todayDeaths")
const topActive = document.querySelector(".topActive")
const topRecover = document.querySelector(".topRecover")

const getDataTop = async(url)=>{
    let resp = await fetch(url);
    let data = await resp.json()
    return data
}

const generateTop = (flags, countries, num )=> {
    let top =
        `
        <div class="cardTop d-flex align-items-center mx-0">
            <picture>
                <img src="${flags}" alt="" >
            </picture>
            <div class="textTop d-flex flex-column ps-1">
            <span>${countries}</span>
            <h2>${num}</h2>
            </div>
        </div>
        ` 
       
    return top
  }


  const setTop = async() => {
      /* Urls */
      let top_cases = await getDataTop("https://disease.sh/v3/covid-19/countries?sort=cases")
      let today_cases = await getDataTop("https://disease.sh/v3/covid-19/countries?sort=todayCases")
      let top_deaths = await getDataTop("https://disease.sh/v3/covid-19/countries?sort=deaths")
      let today_deaths = await getDataTop("https://disease.sh/v3/covid-19/countries?sort=todayDeaths")
      let top_active = await getDataTop("https://disease.sh/v3/covid-19/countries?sort=active")
      let top_recover = await getDataTop("https://disease.sh/v3/covid-19/countries?sort=recovered")
      
      const limite = 10;
      /* Limites */
      let casesLimit = top_cases.slice(0, limite)
      let limitNewCases = today_cases.slice(0, limite)
      let deathsLimit = top_deaths.slice(0, limite)
      let limitNewDeaths= today_deaths.slice(0, limite)
      let limitAvtive = top_active.slice(0, limite)
      let limitRecover = top_recover.slice(0, limite)
      
      /* print Data */
      casesLimit.forEach(topCase => {

          topCases.innerHTML += generateTop(topCase.countryInfo.flag, topCase.country, topCase.cases)
        
        })

      limitNewCases.forEach(todayCase => {

          todayCases.innerHTML += generateTop(todayCase.countryInfo.flag, todayCase.country, todayCase.todayCases)
        
        })

      deathsLimit.forEach(topCase => {

          topDeaths.innerHTML += generateTop(topCase.countryInfo.flag, topCase.country, topCase.deaths)
        
        })
        
      limitNewDeaths.forEach(topCase => {

          todayDeaths.innerHTML += generateTop(topCase.countryInfo.flag, topCase.country, topCase.todayDeaths)
        
        })
        
      limitAvtive.forEach(topCase => {

          topActive.innerHTML += generateTop(topCase.countryInfo.flag, topCase.country, topCase.active)
        
        })

      limitRecover.forEach(topCase => {

          topRecover.innerHTML += generateTop(topCase.countryInfo.flag, topCase.country, topCase.recovered)
        
        })
  }
  
  setTop()

 /* --------------------------------Sidebar print data Api------------------------------------------------------ */

  const countries = document.querySelector(".main_country")

  /*Consumo de api y renderizado top 10 country con banderas*/
fetch('https://disease.sh/v3/covid-19/countries?sort=cases')
.then(response => response.json()) 
.then(data => { 
     console.log(data)
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
