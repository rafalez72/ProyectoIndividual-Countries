const { Router } = require('express');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const {Activities, Country, Favorites }=require('../db');
const { getApiInfo, generateRandomString } = require('./GetApi');

const router = Router();

router.get('/countries', async (req,res)=>{
    let {name,continent}=req.query
    let all= await Country.findAll({                                                                    
        order:[['name','ASC']]                  //Traigo todos los paises de mi API y los guardo para poder usarlos
    })
    try {
        if (!all.length ){
           await getApiInfo()                    //Para no estar trayendo los datos de la API siempre, pregunto si ya los tengo
        } 
    } catch (error) {
         res.status(400).send(error)
    }
     if (name){       // Busca por nombre si le pasan por query
         name=name.slice(1).toLowerCase()       //Saco el primer caracter por que en mi base de datos esta con mayuscula
         if (name.includes(' ')){               
            name=name.split(' ')                                    
            for (let i=1; i<name.length;i++){
               name[i]=name[i][0].toUpperCase()+name[i].slice(1)        //Pongo el primer caracter de las segundas palabras en mayuscula para buscar 
            }
           name=name.toString().replace(',',' ')
         }
        try{
            let country=await Country.findAll({
                where:{
                    name:{                                              //Busco en mi base de datos el pais que coincida con el substring creado
                        [Op.substring]:name
                    }
                }
            })
            if (country.length){
                res.send(country)                                       //Si existe lo mando, sino, mando que un mensaje adecuado
            }else {
                res.status(400).send('Any country with that name')
            }
        }catch(err){
            res.status(400).send(err)
        }
    } else if (continent){   // Busca por continente si le pasan por query
        continent=continent.slice(1).toLowerCase()
        try{
            let countries=await Country.findAll({                                       
                where:{                                         //La misma manera que para buscar por nombre
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
    const {idPais}=req.params
    if (idPais){
        const pk=idPais.toUpperCase()
        const country=await Country.findOne({
            where:{
                id:[pk]                                             //Busco un unico pais que coincida con el id por que es unico
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
            if (payload.id && payload.name && payload.flag_img && payload.continent && payload.capital){    //Me fijo que los datos indispensables sean pasados
                let id=payload.id
                let selectId= await Country.findOne({
                    where:{                                                                                 //Me fijo si el id pasado coincide con alguna en la BD
                        id:[id]
                    }
                })
                while (selectId!==null){
                     id= generateRandomString()
                     selectId= await Country.findOne({                                                      //Si coincide, genero uno nuevo al azar, hasta que no coincida
                        where:{
                            id:[id]
                        }
                    })
                }
                await Country.create({
                    id:id.toUpperCase(),
                    name:payload.name,
                    flag_img:payload.flag_img,
                    continent:payload.continent,                                                                //Creo mi nuevo pais
                    capital:payload.capital,
                    district:!payload.district?'not data':payload.district,
                    area:!payload.area?'not data':payload.area,
                    population:!payload.population?'not data':payload.population,
                })
                const country= await Country.findAll()
                res.send(country)                                                                              //Busco todos, incluyendo el que cree, y los devuelvo para agilizar 
            }else res.status(400).send('El id, el nombre, la bandera, el continente y la capital son datos obligatorios!')
        } catch (error) {
            res.status(401).send(error)
        }
    }else if (id){
        try {
            await Country.destroy({
                where:{                                                   //Cuando me pasan el id, lo destruyo y busco todos para agilizar
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
//------------------------------------------------------------------------------------------------------------//
//Lo uso para poder crear una actividad
router.post('/activities', async (req,res)=>{
    let {payload}=req.body
    if (payload.name){                                                                  //Verifico que exista el dato indispensable
        try {
            const activity= await Activities.create({
                name:payload.name,
                difficulty_level:!payload.difficulty_level?1:payload.difficulty_level,              
                duration:!payload.duration?'not data':payload.duration,
                season:!payload.season?'not data':payload.season,                                       
            })
            
           await payload.countryName.forEach(async e=>{
                const country= await Country.findOne({
                    where:{                                                            //Busco los paises que coincidad con la actividad
                        name:[e]
                    }
                })
                await  activity.addCountry(country.dataValues.id)                      //Los agrego en la tabla intermedia de CountryActivities
            })   
            res.send('Actividad creada con exito!!') 
        } catch (error) {  
            res.status(401).send('error')
        }
    }else res.status(400).send('El nombre es obligatorio')
})
//------------------------------------------------------------------------------------------------------------//
//Lo uso para pedir todas las actividades 
router.get('/activities', async (req,res)=>{
    let {name}=req.query
    if (!name){ 
        const all= await Activities.findAll()
        if (all.length){
            res.send(all)               
        }       
    }else{                                              //Si me pasan un nombre la traigo, sino busco todas
        const all= await Activities.findOne({
            where:{
                name:[name]
            },
            include:Country
        })
        if (all){
            const countries=all.dataValues.countries    //Devuelvo todos los paises asociados
            res.send(countries)
        }
    }
})
//------------------------------------------------------------------------------------------------------------//
//Lo uso para agregar a mi base de datos de favoritos y para poder eliminar de la misma
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
            })                                                          //Busco el pais que me pasan, verifico que no este en favoritos para evitar duplicados y si no esta, lo agrego
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
                const favorite= await Favorites.findAll()               //Devuelvo todos para agilizar
                res.send(favorite)
            }
        } catch (error) {
            res.status(401).send(error)
        }
    } else if (nameDelete){
        try {
            await Favorites.destroy({
                where:{
                    name:[nameDelete]
                }                                               //lo saco de favoritos
            })
            const favorite= await Favorites.findAll()
            res.send(favorite)
        } catch (error) {
            res.status(401).send(error)
        }
    } else res.sendStatus(400)

})
router.get('/favorites', async (req,res)=>{
    const favorites= await Favorites.findAll()
    try{
        if (favorites.length){
            res.send(favorites)                                 //Traigo todos mis favoritos
        }
    }catch(error){
        res.sendStatus(400)
    }
})


module.exports = router;
