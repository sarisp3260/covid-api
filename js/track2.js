 const countries = document.querySelector(".main_country")


fetch('https://disease.sh/v3/covid-19/countries?sort=cases')
  .then(response => response.json()) 
  .then(data => { 
   
    const limit = 10;
    let datas = data.slice(0, limit)
       datas.map(dat => {
        console.log(data)       
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

  const getData = async()=>{
  const resp = await fetch("https://disease.sh/v3/covid-19/all")
  const data = await resp.json()
  console.log(data)
     
    total.innerHTML=` <h6>Total Case</h6><p>${data.cases}</p>`
    active.innerHTML=` <h6>Active Case</h6><p>${data.active}</p>`
    recovered.innerHTML=` <h6>Recovered Case</h6><p>${data.recovered}</p>`
    death.innerHTML=` <h6>Deaths Case</h6><p>${data.deaths}</p>`
}

getData()