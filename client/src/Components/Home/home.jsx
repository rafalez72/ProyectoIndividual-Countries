import React from "react";
import './home.css'
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import {deleteCountry, filterContinentCountries, getActivities,getActivitiesByName, getCountries, orderCountries } from "../../Redux/actions";
import {Link} from 'react-router-dom'
import Country from "../country/country";
import Paginado from "../landingPage/landingPage";
import SearchBar from "../SearchBar/searchBar";
export default function Home (){
    const itemPage=10
    const dispatch=useDispatch() //declaro mi dispatch para poder utilizarlo
    const allCountries= useSelector((state)=>state.countries) //invoco mi estado de countries de la carpeta reducer, y lo mando a mi constante
    const allActivities= useSelector((state)=>state.activities)
    const [order,setOrder]=useState('')
    const [currentPage, setCurrentPage]= useState(1)  //en el primero va la pagina local, y otra constante que me setee la pagina local, que siempre tiene que ser uno
    const [countriesPerPage, setCountriesPerPage]=  useState(9) //En otra quiero darle la cantidad de personaje que quiero en mi pagina 
    const indexOfLastCountry= currentPage * countriesPerPage //
    const indexOfFirstCountry=indexOfLastCountry - countriesPerPage //
    let currentCountries=allCountries.slice(indexOfFirstCountry,indexOfLastCountry) //Agarro un subArreglo de countries que empiece en el indice del primer country y hasta el ultimo que necesite
    const paginado= (pageNumber)=>{ 
        if (pageNumber===1){
            setCountriesPerPage(9)
            setCurrentPage(1)

        }else {
            setCountriesPerPage(10)
            setCurrentPage(pageNumber)
        }
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

    }
     
    const handleClickActivities=(e)=>{
        
        e.preventDefault()  
        if (e.target.value==='todos') dispatch(getCountries())
        else {
            dispatch(getActivitiesByName(e.target.value))
            setCurrentPage(1)
        }
    }
    const handleFilterContinent=(e)=>{
        
        e.preventDefault()
        if (e.target.value==='todos') dispatch(getCountries())
        else  {
            dispatch(filterContinentCountries(e.target.value)) 
            setCurrentPage(1)
        }  
        
    }
/*     const handleFilterActivity=(e)=>{
        e.preventDefault()
        if (e.target.value==='todos') dispatch(getCountries())
        else dispatch(filterActivitiesSeason(e.target.value))
    } */
    const handleOrder=(e)=>{
        e.preventDefault()
        if (e.target.value==='todos') dispatch(getCountries())
        else  {
            dispatch(orderCountries(e.target.value))
            setCurrentPage(1)
            setOrder(`Order by ${e.target.value}`)
        }       
        
    }
    const handleDelete=(e,element)=>{
        e.preventDefault()
        if (window.confirm(`Do you really want to delete ${element.name} ?`)){
            dispatch (deleteCountry(element.id))
            setCurrentPage(1)
            setOrder(`Order by ${element.name}`)
        }
    }

    return(
    <body className="homeBody">
        <header className="SearchHeader">
                <SearchBar/>
        </header>
            
        <div>
        
            <select className="homeSelect" onChange={(e)=>handleOrder(e)}>
                <option defaultValue='todos'>Order by population</option>   
                <option value='asc'>Up </option>       
                <option value='desc'>Down</option>   
            </select>
            <select className="homeSelect" onChange={(e)=>handleOrder(e)}   > 
                <option defaultValue='todos'>Order by letter</option>                     
                <option value='a-z'>A-Z</option>       
                <option value='z-a'>Z-A</option>  
            </select>
            <button  className="homeSelect homeSelectBottom" onClick={e=>{handleClick(e)}}>All countries</button>
            <select className="homeSelect" onChange={(e)=>handleFilterContinent(e)}>
                <option defaultValue='todos'>Filter by continent</option>
                <option value='America'>Americas</option>
                <option value='Africa'>Africa</option>
                <option value='Europe'>Europe</option>
                <option value='Oceania'>Oceania</option>
                <option value='Asia'>Asia</option>
                <option value='Antarctic'>Antarctic</option>
            </select>
            {/*  <select onChange={(e)=>handleFilterActivity(e)}>
                <option selected='selected' value='todos'>Todos</option>    
                <option value='primavera'>Primavera</option>       
                <option value='verano'>Verano</option>  
                <option value='Invierno'>Invierno</option>       
                <option value='otonio'>Otoño</option>    
            </select>  */}

            <select className="homeSelect" onChange={(e)=>handleClickActivities(e)}>
                <option defaultValue='todos'>Filter by activities</option>
                {
                    allActivities?.map((element,index)=>{
                        return (
                            <option key={index} value={element.name}>{element.name}</option>
                        )
                    })
                }
            </select>

            <ul className="listCountriesHome">
                {
                    currentCountries?.map((element,index)=>{
                        return (
                            <Link className="linkHome" to={`/home/${element.id}`}>
                                <li className="itemCountryHome" key={index}>
                                    <button className="homeRemoveCountry" value={element} onClick={e=>handleDelete(e,element)}>X</button>
                                    <Country name={element.name} img={element.flag_img} continent={element.continent}>  
                                    </Country>
                                </li>

                            </Link>
                        )
                    })
                }
            </ul>
            
        </div>
        <footer className="footerHome">            
            <Paginado
                countriesPerPage={itemPage}
                allCountries={allCountries.length}
                paginado={paginado}
                
            />
            </footer>
    </body>

    )
}
//este value lo que hace es permitirme acceder y despues preguntar, si el value es asc que haga algo, y dsc que haga lo otro   



