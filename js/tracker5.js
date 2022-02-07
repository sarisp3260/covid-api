const countryFilter = document.querySelector(".filterCountry")
/* const countryFilter = document.querySelectorAll(".boxCountry") */


/* const test = document.querySelectorAll('#buttonBox') */



const getDataF = async(url)=>{
    let resp = await fetch(url);
    let data = await resp.json()
    return data
}

const generateF = (flags, countries)=> {
    let top =
        `
        <button class="boxCountry" id="buttonBox">
            <img src="${flags}" alt=""> ${countries}
        </button>
        ` 
       
    return top
  }


  const setFilter = async() => {
      /* Urls */
      let top_cases = await getDataF("https://disease.sh/v3/covid-19/countries?sort=cases")

      const limite = 9;
      /* Limites */
      let casesLimit = top_cases.slice(0, limite)

      
      /* print Data */
      casesLimit.forEach(topCase => {

        countryFilter.innerHTML += generateF(topCase.countryInfo.flag, topCase.country)
        
        })

  }
  
  setFilter()

 /*  window.addEventListener('DOMContentLoaded', () => {

    const setFilter = async() => {
        /* Urls * /
        let top_cases = await getDataF("https://disease.sh/v3/covid-19/countries?sort=cases")
  
        const limite = 5;
        /* Limites * /
        let casesLimit = top_cases.slice(0, limite)
  
        
        /* print Data * /
        casesLimit.forEach(topCase => {
  
          countryFilter.innerHTML += generateF(topCase.countryInfo.flag, topCase.country)
          
          })
  
    }
    console.log('hi it works?')
    setFilter()

  }) */

 /* ----------------------------------------------------------------------------- */


 const generateCard = (numbers) =>{

    let cardD =
    `
    
    `

 }

 /*test.addEventListener('click', ()=>{

    /* console.log(test.innerText) * /

    let textButton = test.innerText
    console.log(textButton)

    /* const dataCountryF = async() => {
        /* Urls * /
        let dataCard = await getDataF("https://disease.sh/v3/covid-19/countries?sort=cases")
  
        const limite = 10;
        /* Limites * /
        let casesLimit = dataCard.slice(0, limite)
  
        
        /* print Data * /
        casesLimit.forEach(topCase => {
  
          countryFilter.innerHTML += generateF(topCase.countryInfo.flag, topCase.country)
          
          })
  
    }
    
    dataCountryF() * /
 })*/