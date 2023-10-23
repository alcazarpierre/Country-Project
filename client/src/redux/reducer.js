// importar las actions-types:


//definir el estado inicial del estado global:
const initialState = {
    countries: [],
    activities: [],
    allCountries: [],
    order: "",
    filterContinent: "",
    filterActivity: "",
};


//definir la funcion rootReducer:
const rootReducer = (state = initialState, {type, payload}) => {
    switch (type){
        

        default:
            return {...state};
    }
};

export default rootReducer;