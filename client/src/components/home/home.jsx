import React, { useState, useEffect } from "react";
import {
  getPokemons,
  getTypes,
  getPokeByType,
  getPokemonCrate,
  filterOrdenByABC,
  filterByPower,
} from "../../actions";
import { Link } from "react-router-dom";
import Card from "../card/card";
import Paginado from "../paginado/paginado";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../nav/nav";
import "./home.css";

//useState me devuelve un arreglo y sirve para tener estados locales dentro de un componente funcional
//useEffect nos va a permitir simular el ciclo de vida

const Home = () => {
  const dispatch = useDispatch();

  const allPokemons = useSelector((state) => state.pokemons);

  const pokeTypes = useSelector((state) => state.types);

  const [currentPage, setPage] = useState(1);

  const [currentPj, setPj] = useState(12);

  const ultimoIndex = currentPage * currentPj;
  const primerIndex = ultimoIndex - currentPj;

  const currentPersonajes = allPokemons.slice(primerIndex, ultimoIndex);

  const paginado = (numerDePagina) => {
    setPage(numerDePagina);
  };

  function handleFilterByType(e) {
    dispatch(getPokeByType(e.target.value));
    setPage(1);
  }

  function handleFilterByCreated(e) {
    dispatch(getPokemonCrate(e.target.value));
  }

  function handleReset(e) {
    e.preventDefault();
    dispatch(getPokemons());
  }

  function handleFilterByOrder(e) {
    e.preventDefault();
    dispatch(filterOrdenByABC(e.target.value));
  }

  function handleFilterByOrderPower(e) {
    e.preventDefault();
    dispatch(filterByPower(e.target.value));
  }

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]); //[] para evitar el loop infinito de llamados

  return (
    <div>
      <Nav />
      <div>
        <Link to="/">
          <button>PokeInicio</button>
        </Link>
      </div>

      <h1>Welcome to pokemon</h1>

      <div>
        <button
          onClick={(e) => {
            handleReset(e);
          }}
        >
          reset Pokemon
        </button>
      </div>

      <select
        onChange={(e) => {
          handleFilterByType(e);
        }}
      >
        <option value="-">All</option>
        {pokeTypes?.map((elem) => (
          <option value={elem} key={elem}>
            {elem}
          </option>
        ))}
      </select>

      <select
        onChange={(e) => {
          handleFilterByCreated(e);
        }}
      >
        <option value="-">Creado/Existente</option>
        <option value="api">Existing</option>
        <option value="db">Created</option>
      </select>

      <select
        onChange={(e) => {
          handleFilterByOrder(e);
        }}
      >
        <option value="-">Orden AZ</option>
        <option value="asc">Ascendanta</option>
        <option value="des">Descendente</option>
      </select>

      <select
        onChange={(e) => {
          handleFilterByOrderPower(e);
        }}
      >
        <option value="-">orden por poder</option>
        <option value="Up">mas poder</option>
        <option value="Down">menos poder</option>
      </select>
    <div className="pokemon">
      <Paginado
        currentPj={currentPj}
        allPokemons={allPokemons.length}
        paginado={paginado}
      />
        {currentPersonajes?.map((elem) => {
          return (
            <Card 
              key={elem.id}
              id={elem.id}
              img={elem.img}
              name={elem.name}
              types={elem.types}
              power={elem.attack}
            />
          );
        })}
        </div>
    </div>
  );
};

export default Home;
