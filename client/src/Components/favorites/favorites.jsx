import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom'
import './favorites.css'
import Country from "../country/country";
import { useEffect } from "react";
import { deleteFavorite, getFavorites } from "../../Redux/actions";
import SearchBar from "../SearchBar/searchBar";
import { useState } from "react";
export default function Favourites (){
    const [order,setOrder]=useState('')

    const allFavorites= useSelector((state)=>state.favorites)
    const dispatch=useDispatch()

    const handleDeleteFavorite=(e,name)=>{
        
        if (window.confirm(`Do you really want to delete ${name} from your favorites?`)){
            e.preventDefault()
            dispatch(deleteFavorite(name))
            setOrder(`country delete ${name}`)
        }
        
    }
    return(
        <body className="favoriteBody">
            <header className="favoritesHeader">
                <SearchBar/>
            </header>
            {
                !allFavorites.length? 
                <div className="favoritesDiv">
                    <h1 className="favoritesH1NO">Any country in favourites, add one!</h1>
                    <Link to={'/home'}>
                        <button  className="favoritesButtom">Home</button>
                    </Link>
                </div>
                :
                <div className="favoritesDiv">
                    <h1 className="favoritesH1">Favorites countries!</h1>
                    <ul className="listCountriesFavorites">
                        {
                            allFavorites.map((element,index)=>{
                                return (
                                    <Link className="linkHome" to={`/home/${element.id}`}>
                                        <li className="favoritesCountryLi" key={index}>
                                             <button className="favoriteRemove" value={element} onClick={(e)=>handleDeleteFavorite(e,element.name)} >X</button>
                                            <Country name={element.name} img={element.flag_img} continent={element.continent}/>  
                                        </li>

                                    </Link>
                                )
                            })
                            
                        }

                    </ul>
                    <Link to={'/home'}>
                        <button  className="favoritesButtom">Home</button>
                    </Link>
                </div>
                
            }
        </body>
    )

}