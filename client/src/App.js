import './App.css';
import React from 'react';
import {BrowserRouter, Route, Switch, useHistory } from 'react-router-dom'
import home from "./Components/Home/home";
import CreateCountry from './Components/createCountry/createCountry';
import CreateActivity from './Components/createActivity/createActivity';
import CountryDeatil from './Components/countryDetail/countryDetail';
import InitialPage from './Components/initialPage/initialPage';
import Favourites from './Components/favorites/favorites';
function App() {
  const history=useHistory()
  const onHandleClick=(e)=>{
    e.preventDefault()
    history.push('/home')
    window.location.replace('');
  }
  
  return (
    
      <BrowserRouter>
        
        <Switch>   
          <Route exact path='/' component= {InitialPage}/>
            <Route exact path='/home' component= {home}/>
            <Route exact path='/home/:id' component= {CountryDeatil}/>
            <Route exact path='/favorites' component= {Favourites}/>
            <Route exact path='/createCountry' component= {CreateCountry}/>
            <Route exact path='/createActivity' component= {CreateActivity}/>  
          {
                
                history.location.pathname!=='/' && history.location.pathname!=='/home' && 
                history.location.pathname!=='/home/:id' && history.location.pathname!=='/createCountry' && 
                history.location.pathname!=='/createActivity' && history.location.pathname!=='/favorites'  ? 
                <body className='bodyApp'>
                  <div className='appH1'>
                    <h1 >The page doesn't exists!</h1>
                    <button onClick={(e)=>onHandleClick(e)} className="appButtom">Home</button>
                  </div>
                </body>
                :null
                
    }
      </Switch>
      </BrowserRouter>
  );
}
//El switch hace que todo vaya de ruta en ruta
export default App;
