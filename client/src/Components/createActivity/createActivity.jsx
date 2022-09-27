import React from "react";
import './createActivity.css'
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import { getCountries, orderCountries, postActivity,} from '../../Redux/actions';
import SearchBar from "../SearchBar/searchBar";
import Country from "../country/country";
export default  function CreateActivity (){
    const dispatch=useDispatch()
    const history=useHistory()
    const [input,setInput]=useState({
        name:'',
        difficulty_level:'',
        duration:'',
        season:'',
        countryName:[]
    })
       
    const allCountries=useSelector((state)=>state.countries)
    useEffect(()=>{
        if(!allCountries.length){
            dispatch(getCountries())
        }
        dispatch(orderCountries('a-z'))       
    },[dispatch, allCountries])  
    
    const handleChange=(e)=>{
        setInput({
            ...input,
            [e.target.name]:e.target.value,
        })
    }
    const handleChangeCountry=(e)=>{
        if (!input.countryName.includes(e.target.value) && e.target.value!=='Choose'){
            setInput({
                ...input,
                countryName:[...input.countryName,e.target.value]
            })
        }
    }
    const handleDeleteCountry=(e)=>{
        e.preventDefault()
        setInput({
            ...input,
            countryName:input.countryName.filter(el=>el!==e.target.value)
        })
    }
    const handleClickSubmit=(e)=>{
        e.preventDefault()
        dispatch(postActivity(input))
        alert('Tu actividad fue creada con exito!')
        history.push('/home')
    }
     
    return(
        <body className="createActivityBody">
            <header className="createActivityHeader">
                <SearchBar/>
            </header>
            <div className="divForm">
            <form className="createActivityForm" onSubmit={(e)=>handleClickSubmit(e)}>
                <h1>Create activity</h1>
                <label>Name:</label>
                <div>
                
                    <input required  title="Complete" type="text" value={input.name} name='name' onChange={(e)=>handleChange(e)} />
                    
                </div>
                <label >Difficulty level (1-5):</label>
                <div>
               
                    <input required type="range" min="0" max="5" value={input.difficulty_level} name='difficulty_level'  onChange={(e)=>handleChange(e)}/>
                    
                </div>
                <label> Duration(00:00 a 23:59 hs):</label>
                <div>  
                    <input type="time" value={input.duration} name='duration' onChange={(e)=>handleChange(e)} />
                    
                </div>
                <label>Season</label>
                <div>
                        <select name="season" value={input.season} onChange={(e)=>handleChange(e)}>
                            <option defaultValue='elegir'>Choose</option>
                            <option>Primavera</option>
                            <option>Invierno</option>
                            <option>Verano</option>
                            <option>Otoño</option>
                        </select>
                    
                    

                </div>
                <label>Country</label>
                <div>
                    <select required name='countryName' onChange={(e)=>handleChangeCountry(e)}  >
                        <option value='' disabled selected>Choose</option>
                        {allCountries.map((element,index )=> {
                            return(<option key={index} value={element.name} >{element.name}</option>)
                        })}
                    </select>                               
                </div>
                <div>
                    <Link to='/home'>
                        <button className="createActivityButtom">Home</button>
                    </Link>
                     <input  className="createActivityButtom" type="submit"/>
                    
                </div>
                
            </form>
            </div>
            <div>
            <ul classname='createActivityCountryUl'>
            {input.countryName.map((e,index)=>{
                
                    const find=allCountries.find(element=>element.name===e)
                    return(

                            <li className="createActivityCountryLi" key={index} >
                                 <Country name={find.name} img={find.flag_img} continent={find.continent} >
                                    
                                    </Country>
                                    <button className="createActivityRemove" value={e} onClick={e=>handleDeleteCountry(e)}>X</button>
                            </li>
                    )
                    })
                }  
            </ul> 
            </div>
            

      
        </body>
    
    ) 
}