import {Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import React from "react";
import SearchBar from "../searchbar/SearchBar"
import style from "./navBar.module.css";

const NavBar = () => {
    const [searchName, setSearchName] = useState('');
    const dispatch = useDispatch();
    
    //Handlers:
    //Al ir a Inicio, setea el search como vacio, limpia filtros y llama a paises
    const handleHomePageClick = () => {
      setSearchName('');
      dispatch(clearFilters());
      dispatch(getCountries()); 
    };

    const handleInputChange = (event) => { 
        setSearchName(event.target.value.trim());
    };

    return(
        <div className={style.NavBar}>
            <div>
                <SearchBar 
                    className={style.SearchBar} 
                    searchValue={searchName} 
                    onSearchChange={handleInputChange} 
                />
            </div>
            <div className={style.buttonsContainer}>
                <Link to="/home" onClick={handleHomePageClick}>
                    <button>Página Inicio</button>
                </Link>
                <Link to={`/form`}>
                    <button>Crear Actividad</button>
                </Link>
                <Link to="/">
                    <button>Landing</button>
                </Link>
            </div>
        </div>
    )
};

export default NavBar;