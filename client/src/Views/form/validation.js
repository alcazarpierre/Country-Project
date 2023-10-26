const validations = (activity) => {
    const errors = {};
  
    if(activity.name[0] === " "){
      errors.name = "No puede iniciar con espacio."
    }
    if (!activity.name) {
      errors.name = "Campo requerido";
    } else if (!/^[A-Za-z\s]+$/.test(activity.name)) {
      errors.name = "Ingrese unicamente letras.";
    } else if (activity.name.length < 3) {
      errors.name = "El nombre debe tener al menos 3 letras";
    }
    else if (activity.name.length > 20) {
      errors.name = "El nombre no puede tener mas de 20 letras";
    }
  
    if (!activity.difficulty) {
      errors.difficulty = "Campo requerido.";
    } else if (activity.difficulty < 1 || activity.difficulty > 5) {
      errors.difficulty = "El rango debe ser del 1 al 5 sin decimales";
    }
  
    if (activity.time_to === 0){
      errors.time_to = "La duracion no puede ser 0";
    }
    if (activity.time_to > 24) {
      errors.time_to = "La duracion no puede ser mayor a 24";
    }
  
    if (!activity.season) {
      errors.season = "Campo requerido.";
    }
  
    if (!activity.countries || activity.countries.length === 0) {
      errors.countries = "Seleccione al menos un Pais.";
    }
  
    return errors;
  };
  
  export default validations;
  