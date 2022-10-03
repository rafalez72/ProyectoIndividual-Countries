import React from "react";
import './home.css'
import { useState, useEffect, Suspense, lazy } from "react";
import {useDispatch, useSelector} from 'react-redux'
import {deleteCountry, filterContinentCountries, getActivities,getActivitiesByName, getCountries, orderCountries } from "../../Redux/actions";
import {Link} from 'react-router-dom'
import Paginado from "../landingPage/landingPage";
import SearchBar from "../SearchBar/searchBar";
//import Country from "../country/country";
const Country=lazy(()=> import("../country/country"))

export default function Home (){
    
    const itemPage=10
    const dispatch=useDispatch() //declaro mi dispatch para poder utilizarlo
    const allCountries= useSelector((state)=>state.countries) //invoco mi estado de countries de la carpeta reducer, y lo mando a mi constante
    const allActivities= useSelector((state)=>state.activities)
    const [order,setOrder]=useState('')
    const [selectAZ,setSelectAZ]=useState('')
    const [selectPopulation,setSelectPopulation]=useState('')
    const [selectFilterContinent,setselectFilterContinent]=useState('')
    const [selectActivities,setselectActivities]=useState('')
    const [currentPage, setCurrentPage]= useState(1)  //en el primero va la pagina local, y otra constante que me setee la pagina local, que siempre tiene que ser uno
    const [countriesPerPage, setCountriesPerPage]=  useState(10) //En otra quiero darle la cantidad de personaje que quiero en mi pagina 
    const indexOfLastCountry= currentPage * countriesPerPage //
    const indexOfFirstCountry=indexOfLastCountry - countriesPerPage //
    let currentCountries=allCountries.slice(indexOfFirstCountry,indexOfLastCountry) //Agarro un subArreglo de countries que empiece en el indice del primer country y hasta el ultimo que necesite
    const paginado= (pageNumber)=>{ 
/*         if (pageNumber===1){
            setCountriesPerPage(9)
            setCurrentPage(1)
                                            ESTO ES SI QUIERO 9 COUNTRIES EN LA PRIMER
        }else {
            setCountriesPerPage(10)
            setCurrentPage(pageNumber)
        } */
        setCountriesPerPage(10)
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{
        if (!allCountries.length){
            dispatch(getCountries())
            setCurrentPage(1) //Uso mi useEffect para traer mis countries, cuando el componente se MONTA. Es lo   mismo que hacer mapDispatchToProps, pero mas sencillo  
        }
        dispatch(getActivities())      
    },[dispatch,allCountries.length])                                  //uso el arreglo para que no entre en un bucle infinito. En el arreglo va lo que depende el componentDidMount. En este caso dependemos de nuetro dispatch, entonces lo ponemos 

    const handleClick=(e)=>{
        e.preventDefault()           //Puede que no pase nada. Es por si acaso, pwara que no se recargue la pagina y no se me rompa. 
        dispatch(getCountries())
        setCurrentPage(1)
        setSelectPopulation('todos')
        setSelectAZ('todos')
        setselectFilterContinent('todos')
        setselectActivities('todos')
    }
     
    const handleClickActivities=(e)=>{
        
        e.preventDefault()  
        if (e.target.value==='todos') dispatch(getCountries())
        else {
            dispatch(getActivitiesByName(e.target.value))
            setCurrentPage(1)
            setselectActivities(e.target.value)
            setSelectPopulation('todos')
            setSelectAZ('todos')
            setselectFilterContinent('todos')
        }
    }
    const handleFilterContinent=(e)=>{
        
        e.preventDefault()
        if (e.target.value==='todos') dispatch(getCountries())
        else  {
            dispatch(filterContinentCountries(e.target.value)) 
            setCurrentPage(1)
            setselectFilterContinent(e.target.value)
            setSelectPopulation('todos')
            setSelectAZ('todos')
            setselectActivities('todos')
        }  
        
    }
    const handleOrder=(e)=>{
        e.preventDefault()
        if (e.target.value==='todos') dispatch(getCountries())
        else  {
            dispatch(orderCountries(e.target.value))
            setCurrentPage(1)
            setOrder(`Order by ${e.target.value}`)
            if (e.target.value==='a-z' || e.target.value==='z-a'){
                setSelectAZ(e.target.value)
                setSelectPopulation('todos')
            }else {
                setSelectPopulation(e.target.value)
                setSelectAZ('todos')
            }
        }       
        
    }
    const handleDelete=(e,element)=>{
        e.preventDefault()
        if (window.confirm(`Do you really want to delete ${element.name} ?`)){
            dispatch (deleteCountry(element.id))
            setCurrentPage(1)
            setOrder(`Order by ${element.name} ,${order}`)
        }
    }

    return(
    <div className="homeBody">
        <header className="SearchHeader">
                <SearchBar/>
        </header>
               
        <select className="homeSelect" value={selectPopulation}onChange={(e)=>handleOrder(e)}>
            <option value='todos'>Order by population</option>   
            <option value='asc'>Up </option>       
            <option value='desc'>Down</option>   
        </select>
        <select className="homeSelect" value={selectAZ}onChange={(e)=>handleOrder(e)}   > 
            <option value='todos'>Order by letter</option>                     
            <option value='a-z'>A-Z</option>       
            <option value='z-a'>Z-A</option>  
        </select>
        <button  className="homeSelect homeSelectBottom" onClick={e=>{handleClick(e)}}>All countries</button>
        <select className="homeSelect" value={selectFilterContinent} onChange={(e)=>handleFilterContinent(e)}>
            <option value='todos'>Filter by continent</option>
            <option value='America'>Americas</option>
            <option value='Africa'>Africa</option>
            <option value='Europe'>Europe</option>
            <option value='Oceania'>Oceania</option>
            <option value='Asia'>Asia</option>
            <option value='Antarctic'>Antarctic</option>
        </select>
        <select className="homeSelect" value={selectActivities} onChange={(e)=>handleClickActivities(e)}>
            <option value='todos'>Filter by activities</option>
            {
                allActivities?.map((element,index)=>{
                    return (
                        <option key={index} value={element.name}>{element.name}</option>
                    )
                })
            }
        </select>
        <Suspense fallback={<img src="https://acegif.com/wp-content/uploads/loading-25.gif" alt="loading"/> }>
            <ul className="listCountriesHome">
           
                {
                    currentCountries?.map((element,index)=>{
                        return (
                            
                            <li className="itemCountryHome" key={index}>
                            <Link className="linkHome" to={`/home/${element.id}`}>
                            
                                <button className="homeRemoveCountry" value={element} onClick={e=>handleDelete(e,element)}>X</button>
                                
                                
                                <Country name={element.name} img={element.flag_img} continent={element.continent}/> 
                                
                            </Link>
                            </li>
                            
                        )
                    })
                }
                
                
            </ul>
            </Suspense>
        
        <footer className="footerHome">            
            <Paginado
                countriesPerPage={itemPage}
                allCountries={allCountries.length}
                paginado={paginado}
                
            />
            </footer>
    </div>

    )
}
//este value lo que hace es permitirme acceder y despues preguntar, si el value es asc que haga algo, y dsc que haga lo otro   



