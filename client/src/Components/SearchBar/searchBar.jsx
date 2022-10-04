import React from 'react';
import  "./searchBar.css"
import { useState } from "react";
import {useDispatch} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import { searchCountryByName } from '../../Redux/actions';


export default function SearchBar({onSearch}){
    const history=useHistory()
    const dispatch=useDispatch()
    const [name,setName]=useState('')
    
    const handleInputChange=(e)=>{
        e.preventDefault()                          //Controlo mi estado de busqueda
        setName(e.target.value)
        
    }
    const handleButtonSubmit=(e)=>{
        e.preventDefault()
        if (history.location.pathname==='/home'){
            if (onSearch){                                  //Si esta en el home, lo mando a pagina 1
             onSearch(name)
            }
            
        }else{
            history.push('/home')                                
            dispatch(searchCountryByName(name))
            
        }
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