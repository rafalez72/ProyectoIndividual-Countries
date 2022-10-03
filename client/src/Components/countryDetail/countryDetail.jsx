import React from "react";
import {  useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import {Link } from 'react-router-dom'
import { getCountryDetail, outCountryDetail } from "../../Redux/actions";
import Activity from "../activity/activity";
import SearchBar from "../SearchBar/searchBar";
import './countryDetail.css'
export default function CountryDeatil(props){

    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getCountryDetail(props.match.params.id))  //De esta manera accedo al id que esta en params(link)
        return (()=> dispatch(outCountryDetail()))
    },[dispatch,props.match.params.id])



    const detail=useSelector(state=>state.country)
    return(
        <div className="countryDetailBody">
            <header className="crountryDetailHeader">
                <SearchBar/>
            </header>
            {
                detail?
                    <div className="countryDetailDiv">
                        <h1>Welcome to {detail.name} </h1> 
                        <ul className="countryDetailUl"> 
                            <li><u>Continent:</u> {detail.continent}</li>
                            
                        <li><u>Capital:</u> {detail.capital}</li>                      
                            <li><u>District:</u> {detail.district}</li> 
                            <li><u>Population:</u> {detail.population}</li>
                            <li><u>Area:</u> {detail.area}</li> 
                            <li><u>Flag:</u> </li>   
                            <img src={detail.flag_img} className='countryDetailIMG'alt="img not found" /> 
                        </ul>
                        <Link to={'/home'}>
                            <button className="countryDetailButtom">Volver</button>
                        </Link>

                    </div>
                :null
            } 
            <ul className="countryDetailActivityUl">  
            {   
                detail.activities?.map((element,index)=>{
                    return( 
                        <li key={index} className="countryDetailActivityLi">
                            <Activity name={element.name}  difficulty={element.difficulty_level} duration={element.duration} season={element.season}/>
                        </li>
                    )
                })
            }
            </ul>
        </div>
    )
}
