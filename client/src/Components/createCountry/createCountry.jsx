import React from "react";
import './createCountry.css'
import SearchBar from "../SearchBar/searchBar";
import { useState } from "react";
import {useDispatch} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import { postCountry } from '../../Redux/actions';


export default function CreateCountry (){
    const dispatch=useDispatch()
    const history=useHistory()
    const [input,setInput]=useState({
        id:'',
        name:'',
        flag_img:'',
        continent:'',
        capital:'',                                             //Controlo los inputs
        district:'',
        area:'',
        population:''
    })
    const handleChange=(e)=>{
        setInput({
            ...input,
            [e.target.name]:e.target.value,
        })
    }
    const handleClickSubmit=(e)=>{
        e.preventDefault()
        dispatch(postCountry(input))            //Al hacer click en enviar, lo guardo ya aviso que los guarde
        alert('Country created!')
        history.push('/home')
    }
    return(
        <div className="createCountryBody">
            <header className="SearchHeader">
                <SearchBar/>
            </header>
            <form className="createCountryForm" onSubmit={(e)=>handleClickSubmit(e)}>
            <h1>Create Country</h1>
                <label >ID:</label>
                <div className="createCountryDiv">
                    <input required type="text" minLength="3" maxLength="3" value={input.id} name='id' onChange={(e)=>handleChange(e)} />
                </div>
                <label >Name:</label>
                <div className="createCountryDiv">
                    <input  required type="text" value={input.name} name='name' onChange={(e)=>handleChange(e)} />
                </div>
                <label >PNG Flag(link):</label>
                <div className="createCountryDiv">
                    <input required type="url" value={input.flag_img} maxLength="254" name='flag_img'  onChange={(e)=>handleChange(e)}/>
                </div>
                <label >Continent:</label>
                <div className="createCountryDiv">  
                    <input  required type="text" value={input.continent} name='continent' onChange={(e)=>handleChange(e)} />
                </div>
                <label >Capital:</label>
                <div className="createCountryDiv">        
                    <input  required type="text" value={input.capital} name='capital' onChange={(e)=>handleChange(e)} />
                </div>
                <label >District:</label>
                <div className="createCountryDiv">
                    <input type="text" value={input.district} name='district' onChange={(e)=>handleChange(e)} />
                </div>
                <label >Area:</label>
                <div className="createCountryDiv">               
                    <input type="text" value={input.area} name='area' onChange={(e)=>handleChange(e)}  />
                </div>
                <label >Population:</label>
                <div className="createCountryDiv">                   
                    <input type="number" value={input.population} name='population'  onChange={(e)=>handleChange(e)}/>
                </div>
                <div>
                    <Link to='/home'>
                    <button className="createCountryButtom">Home</button>
                    </Link>
                    <input className="createCountryButtom" type="submit" value='Send'/>
                </div>
            </form>
        </div>
    )

}
