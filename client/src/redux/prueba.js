
        

   const applyOrder = (order) => {
    switch (order) {
      case "asc":
        filterCountries.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "desc":
        filterCountries.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "lowerPop":
        filterCountries.sort((a, b) => a.population - b.population);
        break;
      case "higherPop":
        filterCountries.sort((a, b) => b.population - a.population);
        break;
      default:
        // No se realiza ninguna operación si 'order' no es una opción válida
    }
  }; 

  switch (true){

    //Si solo selecciona el ordenamiento:
    case order && !continent && !activity: 
      {
      if (order === "") {
      // No se realiza ninguna operación
      } else {
        applyOrder(order);
      }  
    }; break;

    //Si solo se filtra por continente:
    case !order && continent && !activity: 
      {
      filterCountries = filterCountries.filter(
      (country) => country.continent === continent
      );
    }; break;

    //Si solo se filtra por actividad:
    case !order && !continent && activity: 
      {
      if(activity === "") filterCountries
      else{
        filterCountries = filterCountries.filter((country) =>
          country.Activities.some((act) => act.name === activity)//some=si al menos un elemento cumple
        );
      }
    }; break;
    
  //Si se selecciona Orden y Continentes:
  case order && continent && !activity: 
  {
    filterCountries = filterCountries.filter(
      (country) => country.continent === continent
    );
    if (order === "") {
      // No se realiza ninguna operación
    } else {
      applyOrder(order);
    }  
  }; break;
  //Si se selecciona Orden y Actividad:
  case order && !continent && activity: 
  {
    if(activity === "") filterCountries;
    else{
      filterCountries = filterCountries.filter((country) =>
        country.Activities.some((act) => act.name === activity)
      );
    }
    if (order === "") {
      // No se realiza ninguna operación
    } else {
      applyOrder(order);
    }  
  }; break;  
  //Si se selecciona Continente y Actividad:
  case !order && continent && activity: 
  {
    filterCountries = filterCountries.filter(
      (country) => country.continent === continent
    );
    if(activity === "") filterCountries;
    else{
      filterCountries = filterCountries.filter((country) =>
        country.Activities.some((act) => act.name === activity)
      );
    }
  }; break;
  //Si se seleccionan los tres filtros:
  case order && continent && activity: 
  {
    filterCountries = filterCountries.filter(
      (country) => country.continent === continent
    );
    if(activity === "") filterCountries;
    else{
      filterCountries = filterCountries.filter((country) =>
        country.Activities.some((act) => act.name === activity)
      );
    }
    if (order === "") {
      // No se realiza ninguna operación
    } else {
      applyOrder(order);
    }  
  }; break;
  default:
  }