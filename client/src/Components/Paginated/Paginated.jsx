import style from "./paginated.module.css";

//Recibimos por props las propiedades desde Home: 
const Paginated = ({ countriesPerPage, countries, paginated, currentPage }) => {
  //Calculamos la cantidad total de páginas:
  const totalPages = Math.ceil(countries / countriesPerPage);

  // Función para ir a una página específica:
  
  const goToPage = (pageNumber) => { 
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      paginated(pageNumber);
    }
  };

  // Declaramos el arreglo donde se almacenaran las paginas cercanas
  const nearbyPages = [];
  // En esta variable, indicamos cuantas paginas queremos mostrar antes y despues 
  const maxNearbyPages = 2; 

  for (
    let i = currentPage - maxNearbyPages; i <= currentPage + maxNearbyPages; i++) {
    if (i > 0 && i <= totalPages) {
      //si i cumple con las condiciones, lo pusheamos al arreglo
      nearbyPages.push(i); 
    }
  }

  return (
    <nav className={style.paginate}>

      <button onClick={() => goToPage(1)} disabled={currentPage === 1}>
        Inicio
      </button>

      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}>
        Prev 
      </button>

      {/* Renderizamos los numeros de las paginas:  */}
      {nearbyPages.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => goToPage(pageNumber)}
          className={style.active}>
          {pageNumber}
        </button>
      ))}

      <button
        onClick={() => goToPage(currentPage + 1)} 
        disabled={currentPage === totalPages}>
        Sig 
      </button>

      <button
        onClick={() => goToPage(totalPages)}
        disabled={currentPage === totalPages}>
        Ultima
      </button>
    </nav>
  );
};

export default Paginated;