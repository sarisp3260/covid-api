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
  

              const infoModal = result => {
              $("#region-new-confirmed").text(`Confirmed : ${result.NewConfirmed}`);
              $("#region-new-deaths").text(`Deaths : ${result.NewDeaths}`);
              $("#region-new-recovered").text(`Recovered : ${result.NewRecovered}`);
              $("#region-total-confirmed").text(
                `Confirmed : ${result.TotalConfirmed}`
              );
              $("#region-total-deaths").text(`Deaths : ${result.TotalDeaths}`);
              $("#region-total-recovered").text(
                `Recovered : ${result.TotalRecovered}`
              );
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


	
	

