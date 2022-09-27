
const initialState={
    countries:[],
    country:{},
    activities:[],
    favorites:[],
}

const rootReducer=(state=initialState, action)=>{
    switch (action.type){
        case 'GET_ALL_COUNTRIES':
            return{
                ...state,
                countries:action.payload
            }
        case 'GET_CONTINENT_COUNTRIES':
            return{
                ...state,
                countries:action.payload,
            }
        case 'POST_COUNTRY':
            return{
                ...state,
            }
            case 'GET_COUNTRY_DETAIL':
                return{
                    ...state,
                    country:action.payload
                }
        case 'POST_ACTIVITY':
            return{
                ...state,
            }
        case 'GET_COUNTRY_NAME':
            return{
                ...state,
                countries:action.payload,
            }
        case 'GET_COUNTRIES_ORDER':
            if (action.payload==='asc'){
                return{
                    ...state,
                    
                    countries:state.countries.sort((a,b)=>a.population-b.population),
                }
            }
              else if (action.payload==='desc'){
                return{
                    ...state,
                    countries:state.countries.sort((a,b)=> b.population-a.population),
                }
                  
            } else if (action.payload==='a-z'){
                const countries= state.countries.sort((a,b)=>{
                    if (a.name>b.name) return 1
                    if (a.name<b.name) return -1
                    return 0
                })
                return{
                    ...state,
                    countries:countries ,
                }
                  
            }   else {  
                    const countries= state.countries.sort((a,b)=>{
                        if (a.name>b.name) return -1
                        if (a.name<b.name) return 1
                        return 0
                    })
                    return{
                        ...state,
                        countries:countries,
                    }
                }
        case 'CREATE_COUNTRY':
            return{
                ...state, 
                countries:action.payload
            } 
        case 'DELETE_COUNTRY':
        return{
            ...state, 
            countries:action.payload
        } 
        case 'GET_ACTIVITIES':
            return{
                ...state,
                activities:action.payload
                
            }
        case 'GET_FAVORITES':
            return{
                ...state, 
                favorites:action.payload
            }
        case 'ADD_FAVORITE':
            return{
                ...state, 
                favorites:action.payload
            }
        case 'DELETE_FAVORITE':
            return{
                ...state,
                favorites:action.payload
            }
        case 'GET_ACTIVITIES_BYNAME':
            return{
                ...state,
                countries:action.payload
                
            }
        case 'GET_ACTIVITIES_SEASON':
            return{
                ...state,
                countries:action.payload
                
            }
                
        default: return state  
    }
    
}
export default rootReducer
