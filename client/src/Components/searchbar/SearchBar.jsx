import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchCountry, getCountries } from "../../redux/actions";

import style from "./searchBar.module.css"

const SearchBar = ({ searchValue, onSearchChange }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Si searchValue cambia se despacha SaerchCountry
  useEffect(() => {
    if (searchValue.length) {
      dispatch(searchCountry(searchValue));
    } else {
      dispatch(getCountries());
    }
  }, [searchValue]);

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.trim();
    if (searchTerm) {
      navigate('/home');
    }
    onSearchChange(event); 
  };

  return (
    <div className={style.SearchBar}>
      <input
        className={style.inputSearch}
        type="search"
        value={searchValue}
        onChange={handleSearchChange}
        name="search-name"
        placeholder="Ingresa el nombre de un Pais..."
      />
    </div>
  );
}

export default SearchBar;
