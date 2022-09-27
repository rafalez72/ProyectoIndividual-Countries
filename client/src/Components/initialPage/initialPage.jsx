import React from "react";
import "./initialPage.css"
import {Link} from 'react-router-dom'
import {  useEffect } from "react";
import {useDispatch} from 'react-redux'
import {  getCountries} from "../../Redux/actions";

export default function InitialPage(){

    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(getCountries())       
    },[dispatch])  

    return (
        <body className="InitialBackground">
            <div className="tittle">
                <h1>Bienvenidos a la página de países de Henry!</h1>
                
                <h4>
                    <Link to={'/home'}>
                        <button className="buttom"><span>Haz click para acceder</span></button>
                    </Link>
                </h4>
            </div>
        </body>

        
    )
}

//en el pageNumbers.map lo que hago es ir poniendo los numeros que me da mi for de arriba
//para asi que me queden los botones para que se muestre el paginado que yo quiero