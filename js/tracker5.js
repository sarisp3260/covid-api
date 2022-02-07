const filterCountry = document.querySelector("#filterCountry")

const getData = async(url)=> {
    let resp = await fetch(url);
    let data = await resp.json(); 

    return data
}


const generatefilter = async (flags, countries)=> {

    let countFilter =
    `
    <div class="boxCountry">
        <picture>
            <img src="${flags}" alt="">
        </picture>
        <span>${countries}</span>
    </div>
    `

    return countFilter
}

const setCountry = async () => {

    let topCountries = await getData("https://disease.sh/v3/covid-19/countries?sort=cases")
    console.log(topCountries)

    const limite = 10;

    let limitCountry = topCountries.slice(0, limite)

    limitCountry.forEach(fra => {

        filterCountry.innerHTML += generatefilter(fra.countryInfo.flag, fra.country)
    })
}
setCountry()

console.log("hola")