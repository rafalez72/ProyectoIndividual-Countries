
import axios from 'axios';


export const getCountries=  ()=> async (dispatch)=>{
    try {
        var json= await axios.get("/countries")
        return dispatch({
            type: 'GET_ALL_COUNTRIES',
            payload:json.data
        })
    } catch (error) {
        console.log(error)
    }

}

export const filterContinentCountries=(value)=> async (dispatch)=>{
    try {
        var json= await axios.get(`/countries?continent=${value}`)
        return dispatch({
            type: 'GET_CONTINENT_COUNTRIES',
            payload:json.data,
        })
    } catch (error) {
    
        console.log(error)
    }
}

export const orderCountries=(payload)=>{
    return {
        type: 'GET_COUNTRIES_ORDER',
        payload:payload,
    }
}
export const searchCountryByName=(value)=> async (dispatch)=>{
    try {
         
        var json= await axios.get(`/countries?name=${value}`)
        return dispatch({
            type: 'GET_COUNTRY_NAME',
            payload:json.data,
        })
    } catch (error) {
        alert('Any country with that name')
    }
}
export const deleteCountry=(value)=> async (dispatch)=>{
    try {
        var json= await axios.post(`/countries?id=${value}`)
        return dispatch({
            type:'DELETE_COUNTRY',
            payload:json.data
        })
    } catch (error) {
        console.log(error)
    }
}
export const filterActivitiesSeason=(value)=> async (dispatch)=>{
    try {
        var json= await axios.get(`/countries?seasonActivity=${value}`)
        console.log(json)
        return dispatch({
            type: 'GET_ACTIVITIES_SEASON',
            payload:json.data,
        })
    } catch (error) {
        console.log(error)
    }
}
export const getCountryDetail=(id)=> async (dispatch)=>{
    try {
        var json= await axios.get(`/countries/${id}`)
        return dispatch({
            type: 'GET_COUNTRY_DETAIL',
            payload:json.data,
        })
    } catch (error) {
        console.log(error)
    }
}
export const outCountryDetail=()=>{
        return{
            type: 'OUT_COUNTRY_DETAIL'
        }

}
export const getActivities=()=> async (dispatch)=>{
    try {
        var json= await axios.get(`/activities`)
        return dispatch({
            type: 'GET_ACTIVITIES',
            payload:json.data,
        })
    } catch (error) {
        console.log(error)
    }
}
export const getActivitiesByName=(value)=> async (dispatch)=>{
    try {
        var json= await axios.get(`/activities?name=${value}`)
        return dispatch({
            type: 'GET_ACTIVITIES_BYNAME',
            payload:json.data,
        })
    } catch (error) {
        console.log(error)
    }
}
export const postCountry=(payload)=> async (dispatch)=>{
    try {
        
        const json= await axios.post(`/countries`,{payload
        })
        return dispatch({
            type: 'CREATE_COUNTRY',
            payload:json.data,
        })
    } catch (error) {
        console.log(error)
    }
}

export const postActivity=(payload)=> async ()=>{
    try {
        const json= await axios.post(`/activities`,{payload
        })
        return json
    } catch (error) {
        console.log(error)
    }
}


export const addFavorite=(payload)=>async(dispatch)=>{
    try {
        const json= await axios.post(`/favorites?name=${payload}`)
        return dispatch({
            type:'ADD_FAVORITE',
            payload:json.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const getFavorites=()=>async(dispatch)=>{
    try {
        const json= await axios.get(`/favorites`)
        return(dispatch({
            type:'GET_FAVORITES',
            payload:json.data
        }))
    } catch (error) {
        console.log(error)
    }
}
export const deleteFavorite=(payload)=>async(dispatch)=>{
    try {
        const json= await axios.post(`/favorites?nameDelete=${payload}`)
        return dispatch({
            type:'DELETE_FAVORITE',
            payload:json.data
        })
    } catch (error) {
        console.log(error)
    }
}