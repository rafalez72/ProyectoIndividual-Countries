import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom'
import './favorites.css'
import Country from "../country/country";
import { deleteFavorite, getFavorites } from "../../Redux/actions";
import SearchBar from "../SearchBar/searchBar";
import { useState } from "react";
import { useEffect } from "react";
export default function Favourites (){
    const [order,setOrder]=useState('')

    const allFavorites= useSelector((state)=>state.favorites)
    const dispatch=useDispatch()
    useEffect(()=>{
        if(!allFavorites.length){
           dispatch(getFavorites())
        }
    })
    const handleDeleteFavorite=(e,name)=>{
        if (window.confirm(`Do you really want to delete ${name} from your favorites?`)){
            e.preventDefault()
            dispatch(deleteFavorite(name))
            setOrder(`country delete ${name}, ${order}`)
        }  
    }
    return(
        <div className="favoriteBody">
            <header className="favoritesHeader">
                <SearchBar/>
            </header>
            {
                !allFavorites.length? 
                <div >
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
                                    <li className="favoritesCountryLi" key={index}>
                                        <Link className="linkFavorites" to={`/home/${element.id}`}>
                                            
                                                    <button className="favoriteRemove" value={element} onClick={(e)=>handleDeleteFavorite(e,element.name)} >X</button>
                                                <Country name={element.name} img={element.flag_img} continent={element.continent}/>  
                                            

                                        </Link>
                                    </li>
                                )
                            })
                            
                        }

                    </ul>
                    <Link to={'/home'}>
                        <button  className="favoritesButtom">Home</button>
                    </Link>
                </div>
                
            }
        </div>
    )

}