import React from "react";
import './landingPage.css'
export default function Paginado({countriesPerPage, allCountries, paginado}){
    const pageNumbers=[]

    for (let i=0; i<Math.ceil(allCountries/countriesPerPage);i++){
        pageNumbers.push(i+1)
    }

//Declaro mi paginado y traigo alguno componentes de home, hago el arreglo vacio y lo recorro, en donde tomo el  numero
//de dividir todos los countries por el numero de countries que quiero por pagina, ese numero agrego al arreglo
//Me da un arreglo de numeros 

    return (
        <nav>
           <ul className="lista">
            {
                pageNumbers &&
                pageNumbers.map((number,index)=>{    
                    //Muestro el paginado e invoco a la funcion que cambia de pagina
                    return(     
                        <li className="elementoLista" key={index}>     
                            <button className="botonLista" onClick={()=> paginado(number) }>{number}</button>
                        </li>
                    )
                })
            }
           </ul> 
        </nav>
    )
}

//en el pageNumbers.map lo que hago es ir poniendo los numeros que me da mi for de arriba
//para asi que me queden los botones para que se muestre el paginado que yo quiero