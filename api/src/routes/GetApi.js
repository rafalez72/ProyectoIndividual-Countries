const axios=require('axios')
const {Activities, Country }=require('../db');

module.exports={
    getApiInfo:async function (){
        const url= await axios.get('https://restcountries.com/v3/all')
            await url.data.forEach(async (element)=>{
                await  Country.create({
                    id:element.cca3,
                    name:element.name.common,
                    flag_img:element.flags[1],
                    continent:element.region,
                    capital:!element.capital?'Not capital':element.capital[0],
                    district:element.continents[0],
                    area:element.area + ' km cuadrados',
                    population:element.population
                })    
        })
        
    }
}