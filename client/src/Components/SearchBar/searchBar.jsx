import React from 'react';
import  "./searchBar.css"
import { useState } from "react";
import {useDispatch} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import { searchCountryByName } from '../../Redux/actions';


export default function SearchBar(props){
    const history=useHistory()
    const dispatch=useDispatch()
    const [name,setName]=useState('')
    
    const handleInputChange=(e)=>{
        e.preventDefault()
        setName(e.target.value)
        
    }
    const handleButtonSubmit=(e)=>{
        if (history.location.pathname!=='/home'){
             history.push('/home')
        }
        e.preventDefault()
        dispatch(searchCountryByName(name))
        setName('')

    }
    return(
        <nav className='navSearch'>
            
            <ul className='navMenu navMenu-visible'>
            
                <button className='botonBurger'>
                    <img src="https://cdn-icons-png.flaticon.com/512/17/17565.png?w=740&t=st=1663716456~exp=1663717056~hmac=bf9463cf19b01d7c99e54df6fcd15acaf1e17b51fb293fd1e18bc78cacb68e7e" alt="" className='imagenMenu'/>
                </button>
                <li >
                    <Link to='/home'>
                    <button  className='navMenuItem' type='submit' onClick={(e)=>handleButtonSubmit(e)}>Search</button>
                    </Link>
                    
                    <input value={name} className='navMenuSearch' type="text" placeholder='Buscar...' onChange={(e)=>handleInputChange(e)} />
                    
                </li>

                <li >
                    <Link to='/createCountry'>
                        <button className='navMenuItem'>Create country</button>
                    </Link>
                </li>
                <li >
                    <Link to='/createActivity'>
                        <button className='navMenuItem'>Create activity</button>
                    </Link>
                </li>
                <li >
                    <Link to='/favorites'>
                        <button className='navMenuItem'>Favorites</button>
                    </Link>
                </li>
                <li >
                    <Link to='/createActivity'>
                        <button className='navMenuItem'>About me</button>
                    </Link>
                </li>
            </ul>
        </nav>
    )

}