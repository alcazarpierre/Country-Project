import React from 'react'
import Card from '../card/Card'
import style from "./cards.module.css"

function Cards({ currentCountries }) { //recibe props desde Home, para mostrar solo los 10 países actuales

  return (
    <div className={style.cardsContainer}>
      { 
          currentCountries?.map((country)=>{
            return ( /*Por cada card que mapee le paso a la Card */
            
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