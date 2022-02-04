 const countries = document.querySelector(".main_country")
 const card1 = document.querySelector(".foot_card1")
 const card2 = document.querySelector(".foot_card2")
 const card3 = document.querySelector(".foot_card3")
 const card4 = document.querySelector(".foot_card4")
 const card5 = document.querySelector(".foot_card5")
  

fetch('https://disease.sh/v3/covid-19/countries?sort=cases')
  .then(response => response.json()) 
  .then(data => { 
       console.log(data)
    const limit = 10;
    let datas = data.slice(0, limit)
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
  const select = document.querySelector("#form")
  const totle = document.querySelector(".totle")
  const sec = document.querySelector(".sec")
  const third = document.querySelector(".third")
  const fourth = document.querySelector(".fourth")
  const fifth = document.querySelector(".fifth")
  const sixth = document.querySelector(".sixth")

  const getData = async()=>{
  const resp = await fetch("https://disease.sh/v3/covid-19/all")
  const data = await resp.json()
  
     
    total.innerHTML=` <h6>Total Case</h6><p>${data.cases}</p>`
    active.innerHTML=` <h6>Active Case</h6><p>${data.active}</p>`
    recovered.innerHTML=` <h6>Recovered Case</h6><p>${data.recovered}</p>`
    death.innerHTML=` <h6>Deaths Case</h6><p>${data.deaths}</p>`
    card1.innerHTML=`<h4>${data.cases}</h4>`
    card2.innerHTML=`<h4>${data.recovered}</h4>`
    card3.innerHTML=`<h4>${data.deaths}</h4>`
    card4.innerHTML=`<h4>${data.todayDeaths}</h4>`
        
}

getData()

const getCounCountry = async()=>{
  const resp = await fetch('https://disease.sh/v3/covid-19/countries/afghanistan')
  const data = await resp.json()
  console.log(data)

  totle.innerHTML=`<li><h1 class="title1">${data.cases}</h1></li>`
      sec.innerHTML=` <li><h1 class="title2">${data.deaths}</h1></li>`
      third.innerHTML=`<li><h1 class="title3">${data.recovered}</h1></li>`
      fourth.innerHTML=`<li><h1 class="title4">${data.active}</h1></li>`
      fifth.innerHTML=`<li><h1 class="title5">${data.todayCases}</h1></li>`
      sixth.innerHTML=` <li><h1 class="title6">${data.todayDeaths}</h1></li>`
}

 getCounCountry()

const getCount = async()=>{
  const resp = await fetch('https://disease.sh/v3/covid-19/countries')
  const data = await resp.json()
  
  data.map(dat => {
    
      select.innerHTML += `<option> ${dat.country}</option>
   `

});

      
   select.addEventListener("change", ()=>{
    console.log(select)
    console.log(select.selectedOptions[0].innerText)
     const getCountry = async()=>{
      const resp = await fetch(`https://disease.sh/v3/covid-19/countries/${select.selectedOptions[0].innerText}`)
      const data = await resp.json()
      
      totle.innerHTML=`<li><h1 class="title1">${data.cases}</h1></li>`
      sec.innerHTML=` <li><h1 class="title2">${data.deaths}</h1></li>`
      third.innerHTML=`<li><h1 class="title3">${data.recovered}</h1></li>`
      fourth.innerHTML=`<li><h1 class="title4">${data.active}</h1></li>`
      fifth.innerHTML=`<li><h1 class="title5">${data.todayCases}</h1></li>`
      sixth.innerHTML=` <li><h1 class="title6">${data.todayDeaths}</h1></li>`
     }
     getCountry()
   })    
    
}

getCount()



 