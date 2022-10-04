const axios=require('axios')
const {Activities, Country }=require('../db');

module.exports={
    getApiInfo:async function (all){
        const url= await axios.get('https://restcountries.com/v3/all')
        await url.data.forEach(async (element)=>{
            if (!all){
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
            }else{                
                if (!all.find((e)=>e.id===element.cca3)){
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
                }
                
            }
            
        })
        
    },
    generateRandomString: function  (){
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result1= ' ';
        const charactersLength = characters.length;
        for ( let i = 0; i < 3; i++ ) {
            result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
    
        return result1;
    }
    
}