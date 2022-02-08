/* trae el contenedor del html donde se crearan la filas con la funcion generateRow */
const tableNewRow = document.querySelector(".newRow")

/* trae el selector del html*/
const selectNum = document.getElementById("dataShow")

/* trae un spand con un numero que se desea combiar */
const changeSpan = document.getElementById("changeSpan")



const getDataTable = async(url)=>{
    let resp = await fetch(url);
    let data = await resp.json()
    return data
}

/* Funcion Generadora del codigo html por cada dato del API*/
const generateRow = (flag, country, cases, todayCases, deaths, todayDeaths, recovered, active, critical, tests )=> {
    let row =
        `
        <tr>
        <th scope="row"><img src="${flag}" class="flag" alt="" style="width:20px"></th>
        <td class="country">${country}</td>
        <td class="cases">${cases}</td>
        <td class="newCases">${todayCases}</td>
        <td class="deaths">${deaths}</td>
        <td class="newDeaths">${todayDeaths}</td>
        <td class="recovered">${recovered}</td>
        <td class="active">${active}</td>
        <td class="critical">${critical}</td>
        <td class="tested">${tests}</td>
        </tr>
        ` 
    return row
  }

  /* Funcion que optiene el valor del select y lo tranforma en numero*/
  function showSelected()
    {
    
    let option = Number(document.getElementById("dataShow").value);
    
    return option
    }

  /* Carga una funcion que muestra la data con el cambio del numero del select  */

  selectNum.addEventListener('change', () =>{

    const setRows = async() => {
    
      let data = await getDataTable("https://disease.sh/v3/covid-19/countries?sort=cases")
  
      const limit = showSelected();
  
      /* console.log(limit) */
      
  
      let datas = data.slice(0, limit)
      
      
      tableNewRow.innerHTML = ""

      changeSpan.innerHTML = limit;

      

      datas.forEach(row => {
        tableNewRow.innerHTML += generateRow(row.countryInfo.flag, row.country, row.cases, row.todayCases, row.deaths, row.todayDeaths, row.recovered, row.active, row.critical, row.tests)

      })
      
      }

      

      setRows()
  })


  

  /* Carga una funcion inicial que muestra la data con una cantidad de datos del select  */
  
  window.addEventListener('DOMContentLoaded', () =>{

    const setRows2 = async() => {
    
      let data = await getDataTable("https://disease.sh/v3/covid-19/countries?sort=cases")
  
      const limit = showSelected();
  
      /* console.log(limit) */
      
  
      let datas = data.slice(0, limit)
      
      
      tableNewRow.innerHTML = ""

      datas.forEach(row => {
        
        tableNewRow.innerHTML += generateRow(row.countryInfo.flag, row.country, row.cases, row.todayCases, row.deaths, row.todayDeaths, row.recovered, row.active, row.critical, row.tests)
        
      })
      
      
      let data1 = data

      data1.forEach(dat =>{
        /* console.log(dat.country) */

        return console.log(dat.country)
      })

      
      }

      setRows2()
  })
    

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
