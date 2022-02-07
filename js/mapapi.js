jQuery(document).ready(function() {
    jQuery('#vmap').vectorMap({
        map: 'world_en',
        color: '#ffffff',
        hoverOpacity: 0.7,
        selectedColor: '#666666',
        enableZoom: true,
        showTooltip: true,
        values: sample_data,
        scaleColors: ['#3639AE', '#C4C5ED'],
        normalizeFunction: 'polynomial',
        onRegionClick: function()
        {
             /*Conexion api rest*/ 
             fetch("https://api.covid19api.com/summary")
             .then(res => res.json()) 
             .then(data => { 
                // console.log(data)
                 getData(data);
                 upDate = true;
                 includeData();
             
             });

          /*Declaracion de variables*/
        
          var allCountries = [];  /*Array de paises*/
          var allData = {    /*objeto con los datos especificos de cada pais*/
          totalConfirmed: 0,
          totalDeaths: 0,
          totalRecovered: 0,
          newDeaths: 0,
            };
           var upDate = false;

         
     

              const getData = data => {
              /*trae todos los paises y los guarda en una variable*/
              allCountries = data.Countries;
              /*Recorre el array y extrae por cada pais los datos requeridos*/
              allCountries.forEach(country => {
                 /*Y los incorpora en el objeto ya declarado*/
                allData.totalConfirmed += country.TotalConfirmed;
                allData.totalDeaths += country.TotalDeaths;
                allData.totalRecovered += country.TotalRecovered;
                allData.newDeaths += country.NewDeaths;
              });
              };

              /*Unifica los valores de la api con cada region del mapa */
              const includeData = () => {
              
                $("#mapa_covid").append($("<div>").attr("id", "vmap"));
                $("#vmap").vectorMap({
                
              /*Trae los parametros que hacen referencia a cada pais desde la libreria*/  
                  onRegionClick: function(element, code, region) {
                  console.log(code); /*Muestra el nombre del pais abreviado */
                  console.log(region); /*Muestra el nombre del pais completo */

              /*devuelve el valor del primer elemento del array que cumpla con la solicitud. */
                  let result = allCountries.find(item => { 
                    return (
                       /*Une los dos valores y los guarda en la variable result*/
                    item["Country"] === region ||
                    item["Country"].toLowerCase() === code
                    );
                  });
                  console.log(result);/*muestra el objeto con toda la informacion(parametros) del pais seleccionado*/
                  if (result !== undefined) { /*si se ha devuelto un valor:*/
                    infoModal(result); /*se envia como parametro la variable que aloja toda la info*/
                    $("#modal-title").text(region);/*text method inserta en el div del titulo el nombre del pais*/
                    $("#alert-modal").modal("show");/*Abre la ventana modal*/
                 
                  }
                  }
                });
                };
  
              /*Ventana modal*/
              const infoModal = result => {
              $("#new_confirmed").text(`Confirmed : ${result.NewConfirmed}`);
              $("#new_deaths").text(`Deaths : ${result.NewDeaths}`);
              $("#new_recovered").text(`Recovered : ${result.NewRecovered}`);
              $("#total_confirmed").text(
                `Confirmed : ${result.TotalConfirmed}`
              );
              $("#total_deaths").text(`Deaths : ${result.TotalDeaths}`);
              $("#total_recovered").text(
                `Recovered : ${result.TotalRecovered}`
              );
              
              /*Graficos estadisticos del modal*/

               const $grafica = document.querySelector("#grafica");
              
               const globalCases = {
                label: ["Confirmed"],
                data: [result.TotalConfirmed, result.TotalDeaths, result.TotalRecovered], // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
                backgroundColor: 'rgba(148, 222, 66, 0.7)', // Color de fondo
                borderColor: 'rgba(19, 49, 14, 1)', // Color del borde
                borderWidth: 2,// Ancho del borde
            };

            new Chart($grafica, {
                type: 'line',// Tipo de gráfica
                data: {
                  labels: ["Total Confirmed", "Total Deaths", "Total Recovered"], // Informacion que se mostrara
                  datasets: [
                   globalCases, // Objeto que aloja los datos que se mostraran en la grafica
                        // Aquí se pueden poner más datos...
                    ]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }],
                    },
                }
            });
            cerra.addEventListener('click',e=>{
              e.preventDefault()
              let back=document.getElementById("alert-modal")
                
                 back.style.display="none"
                 })
              
              };
              
                    },

        onRegionOver: function(element, code, region)
        {
            /*var message = 'You estas encima de  "'
                + region
                + '" which has the code: '
                + code.toUpperCase();

            alert(message);*/
        }
    });
});

	
	

