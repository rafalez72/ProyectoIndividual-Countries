import React from 'react';
import  "./searchBar.css"
import { useState } from "react";
import {useDispatch} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import { searchCountryByName } from '../../Redux/actions';


export default function SearchBar(){
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
            <ul className='navMenu '>
                <li >
                    <Link to='/home'>
                    <button  className='navMenuItem' type='submit' onClick={(e)=>handleButtonSubmit(e)}>Search</button>
                    </Link>
                    
                    <input value={name} className='navMenuSearch' type="text" placeholder='Brazil, Argentina...' onChange={(e)=>handleInputChange(e)} />
                </li>

                <li >
                    <Link to='/createCountry'>
                        <button className='navMenuItem'>Create country</button>
                    </Link>
                </li>
                <li >
                    <Link to='/createActivity'>
                        <button  className='navMenuItem'>Create activity</button>
                    </Link>
                </li>
                <li >
                    <Link to='/favorites'>
                        <button className='navMenuItem'>Favorites</button>
                    </Link>
                </li>

            </ul>
        </nav>
    )

}