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
    


  

  
  


  /* --------------------------------------------------------------------- */