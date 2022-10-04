import React from "react";
import './createActivity.css'
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import { getCountries, postActivity,} from '../../Redux/actions';
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
            if (allCountries.length<250){
                dispatch(getCountries())    //Si tengo menos de los paises los traigo
            }
    },[dispatch,allCountries.length])  
    
    const handleChange=(e)=>{
        setInput({
            ...input,
            [e.target.name]:e.target.value,                 //Controlo el estado de mis inputs
        })
    }
    const handleChangeCountry=(e)=>{
        if (!input.countryName.includes(e.target.value) && e.target.value!=='Choose'){
            setInput({
                ...input,                                                           //Controlo los paises elegidos
                countryName:[...input.countryName,e.target.value]
            })
        }
    }
    const handleDeleteCountry=(e)=>{
        e.preventDefault()
        setInput({
            ...input,                                                               //Elimino si quiere sacar algun pais de los elegidos
            countryName:input.countryName.filter(el=>el!==e.target.value)
        })
    }
    const handleClickSubmit=(e)=>{
        e.preventDefault()
        dispatch(postActivity(input))
        alert('Activity created!')                                                   //Confirmo que se crea la actividad, y hago que vuelva al home
        history.push('/home')
    }
     
    return(
        <div className="createActivityBody">
            <header className="createActivityHeader">
                <SearchBar/>
            </header>
            <div >
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
                <label> Duration:</label>
                <div>  
                    <input type="text" value={input.duration} name='duration' onChange={(e)=>handleChange(e)} />
                </div>
                <label>Season</label>
                <div>
                    <select name="season" value={input.season} onChange={(e)=>handleChange(e)}>
                        <option value='' disabled >Choose</option>
                        <option>Spring</option>
                        <option>Winter</option>
                        <option>Summer</option>
                        <option>Autumn</option>
                    </select>
                </div>
                <label>Country</label>
                <div>
                    <select required name='countryName' defaultValue='choose' onChange={(e)=>handleChangeCountry(e)}  >
                        <option value='choose' disabled  >Choose</option>
                        {allCountries.map((element,index )=> {      //Traigo todos los paises y los muestro coomo opcion
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
            
            <ul className='createActivityCountryUl'>
            {input.countryName.map((e,index)=>{
                    const find=allCountries.find(element=>element.name===e)
                    return(
                                                                            //Muestro todos los paises que va agregando
                        <li className="createActivityCountryLi" key={index} >
                                <Country name={find.name} img={find.flag_img} continent={find.continent} />     
                                <button className="createActivityRemove" value={e} onClick={e=>handleDeleteCountry(e)}>X</button>
                        </li>
                    )
                    })
                }  
            </ul>      
        </div>
    
    ) 
}