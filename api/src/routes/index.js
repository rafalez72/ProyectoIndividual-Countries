const { Router } = require('express');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const {Activities, Country, CountryActivities, Favorites }=require('../db');
const { GetApiAll, GetDbAll } = require('./GetApi');
const axios=require('axios')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
var cors = require('cors')
router.use(cors())
const getApiInfo=async ()=>{
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

router.get('/countries', async (req,res)=>{
    let {name,continent}=req.query
    let all= await Country.findAll()
    try {
        if (!all.length){
            await getApiInfo()
        } 
    } catch (error) {
         res.status(400).send(error)
    }
 //------------------------------------------------------------------------------------------------------------//
 // Busca por nombre si le pasan por query
     if (name){
         name=name.slice(1).toLowerCase()
        try{
            let country=await Country.findAll({
                where:{
                    name:{
                        [Op.substring]:name
                    }
                }
            })
            if (country.length){
                res.send(country)
            }else {
                res.status(400).send('Any country with that name')
            }
        }catch(err){
            res.status(400).send(err)
        }
        } 
        
    
 //------------------------------------------------------------------------------------------------------------//
 // Busca por continente si le pasan por query

    else if (continent){
        continent=continent.slice(1).toLowerCase()
        try{
            let countries=await Country.findAll({
                where:{
                    continent:{
                        [Op.substring]:continent,
                        
                    }
                },
                
            })
            if (countries.length){
                res.send(countries)
            }else res.status(400).send('Any continent with that name')
        }catch(err){
            res.status(400).send(err)
        }
    } else{
        res.send(all)
    }    

})
//------------------------------------------------------------------------------------------------------------//
//En el caso que deba buscar por id del pais
router.get('/countries/:idPais', async (req,res)=>{
    let {idPais}=req.params
    
    if (idPais){
        let pk=idPais.toUpperCase()
        let country=await Country.findOne({
            where:{
                id:[pk]
            },
            include:Activities
        })
        
        if (country){
            return res.send(country)
        }else return res.status(404).send('The country doesn`t exists')
    }else return res.status(400).send('The id doesn`t exists')
})
//------------------------------------------------------------------------------------------------------------//
//Cuando quiera agregar un nuevo pais, debo pasarle como minimo los datos fundamentales
router.post('/countries', async (req,res)=>{
    const {id}=req.query
    const {payload}=req.body
    if (payload){
        try {
            if (payload.id && payload.name && payload.flag_img && payload.continent && payload.capital){
            
                await Country.create({
                    id:payload.id.toUpperCase(),
                    name:payload.name,
                    flag_img:payload.flag_img,
                    continent:payload.continent,
                    capital:payload.capital,
                    district:!payload.district?'not data':payload.district,
                    area:!payload.area?'not data':payload.area,
                    population:!payload.population?'not data':payload.population,
                })
                const country= await Country.findAll()
                res.send(country)

            }else res.status(400).send('El id, el nombre, la bandera, el continente y la capital son datos obligatorios!')
            
        } catch (error) {
            res.status(401).send(error.msg)
        }
    }else if (id){
        try {
            await Country.destroy({
                where:{
                    id:[id]
                }
            })
            const country= await Country.findAll()
            res.send(country)
        } catch (error) {
            res.status(400).send(error)
        }
    }
    

})

router.post('/activities', async (req,res)=>{
    let {payload}=req.body
    if (payload.name){
        try {
            const activity= await Activities.create({
                name:payload.name,
                difficulty_level:!payload.difficulty_level?1:payload.difficulty_level,
                duration:!payload.duration?'not data':payload.duration,
                season:!payload.season?'not data':payload.season,
            })
            
           await payload.countryName.forEach(async e=>{
                const country= await Country.findOne({
                    where:{
                        name:[e]
                    }
                })
                await  activity.addCountry(country.dataValues.id)
            })
                
            res.send('Actividad creada con exito!!') 
        } catch (error) {  
            
            res.status(401).send('error')
        }
    }else res.status(400).send('El nombre es obligatorio')

})
router.get('/activities', async (req,res)=>{
    let {name}=req.query
    if (!name){ 
        let all= await Activities.findAll()
        try {
            if (!all.length){
                                 
            }else res.send(all)
        } catch (error) {
            res.status(400).send(error)
        }
    }else{
        
        try {
            let all= await Activities.findOne({
                where:{
                    name:[name]
                },
                include:Country
            })
            if (!all){
                res.status(401).send('No se creo ninguna actividad')  
            }else{
                const countries=all.dataValues.countries
                res.send(countries)
            }   
        }catch(error){
            res.status(400).send(error)  
        }
    }
})
router.post('/favorites', async (req,res)=>{
    const {name,nameDelete}=req.query
    if (name){
        try {
            const country= await Country.findOne({
                    where:{
                        name:[name]
                    }
            })
            const favorite= await Favorites.findOne({
                where:{
                    name:[name]
                }
            })
            if (!favorite){
                await Favorites.create({
                    id:country.dataValues.id.toUpperCase(),
                    name:country.dataValues.name,
                    flag_img:country.dataValues.flag_img,
                    continent:country.dataValues.continent,
                    capital:country.dataValues.capital,
                    district:!country.dataValues.district?'not data':country.dataValues.district,
                    area:!country.dataValues.area?'not data':country.dataValues.area,
                    population:!country.dataValues.population?'not data':country.dataValues.population,
                })
                const favorite= await Favorites.findAll()
                res.send(favorite)
            }else res.send('No repeat countries')
        } catch (error) {
            console.log(error)
            res.status(401).send(error.msg)
        }
    } else if (nameDelete){
        try {
            await Favorites.destroy({
                where:{
                    name:[nameDelete]
                }
            })
            const favorite= await Favorites.findAll()
            res.send(favorite)
        } catch (error) {
            res.status(401).send(error.msg)
        }

    } else res.sendStatus(400)

})
router.get('/favorites', async (req,res)=>{
    const favorites= await Favorites.findAll()
    try{
        if (favorites.length){
            res.send(favorites)
        }
    }catch(error){
        res.sendStatus(400)
    }
})


module.exports = router;
