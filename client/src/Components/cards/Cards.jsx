import React from 'react'
import Card from '../card/Card'
import style from "./cards.module.css"

//Recibe desde Home por Props el arreglo de 10 paises:
function Cards({ currentCountries }) { 

  return (
    <div className={style.cardsContainer}>
      {   //Mapeamos currentCountries usando el ternario (si el objeto no es null ni undef)
          //por cada country mapeada, se le envía a la Card 
          currentCountries?.map((country)=>{
            return ( 
              <Card 
                key={country.id}
                id={country.id}
                name={country.name} 
                flag_image={country.flag_image}
                continent={country.continent}
                activities={country.Activities}
              />
            )
        })
      }
    </div>
  );
}

export default Cards;