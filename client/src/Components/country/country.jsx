import React from "react";
import { useDispatch } from "react-redux";
import { addFavorite } from "../../Redux/actions";
import './country.css'
export default function Country ({name, img,continent}){
    const dispatch=useDispatch()
    const handleFavorite=(e,payload)=>{
        e.preventDefault()
        if (window.confirm(`Do you want to add ${payload.name} to favorites? `)){
        dispatch(addFavorite(payload.name))
        }
    }
    return(
        <ul className="listCountriesCountry">
            <li className="itemCountryCountry">
                <h1 className="countryName">{name}</h1>
            </li>

            <li className="itemCountryCountry">
                <img className="countryImg" src={img} alt="img not found" />
            </li >
            <li className="itemCountryCountry">
                <h3 className="countryContinent">{continent}</h3>
            </li >
            <li className="itemCountryCountry">
                <button className="countryAddFavourite" onClick={(e)=>handleFavorite(e,{name,img,continent})}>Add favourite</button>
            </li >
        </ul>
    )

}
