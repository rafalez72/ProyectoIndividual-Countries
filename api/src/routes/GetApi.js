const axios=require('axios')
const {Activities, Country }=require('../db');

module.exports={
    
/*     GetApiAll:async function (){
        const url= await axios.get('https://restcountries.com/v3/all')
        await url.data.forEach(async (element)=>{
            if (element.ccn3 && element.capital && element.flags[1]){
                await  Country.create({
                    id:element.ccn3,
                    name:element.name.official,
                    flag_img:element.flags[1],
                    continent:element.continents[0],
                    capital:element.capital[0],
                    district:element.region,
                    area:element.area,
                    population:element.population
                })   
            }
        })
       
    },
 */

/*     GetApiName: async function(name){
        const url= await axios.get(`https://restcountries.com/v3/name/${name}`)
        const country= await url.data.map(element=>{
        return{
            code:element.cca3,
            name:element.name,
            flag:element.flags,
            continent:element.continents,
            capital:element.capital,
            district:element.region,
            area:element.area,
            population:element.population
        }
        })
    return country 
    },
    GetApiCode: async function(code){
        const url= await axios.get(`https://restcountries.com/v3/alpha/${code}`)
        const country= await url.data.map(element=>{
        return{
            code:element.ccn3,
            name:element.name,
            flag:element.flags,
            continent:element.continents,
            capital:element.capital,
            district:element.region,
            area:element.area,
            population:element.population
        }
        })
        return country
    } */
}