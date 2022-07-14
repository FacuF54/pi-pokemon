import React from "react";
import { modifyPoke } from "../../actions";
import { useDispatch } from "react-redux";
import Nav from "../nav/nav";

const CardDetail = ({ state }) => {
  const dispatch = useDispatch();

  let modify = (state) => {
    dispatch(modifyPoke(state.buscar));
    console.log(modifyPoke)
  };
  return (
    
    <div>
      <Nav/>
      <h1>{state.name ? state.name : state}</h1>
      <h2>Statistics:</h2>
      <div>
        <h5>Life:</h5>
        <p>{state.life}</p>
      </div>
      <div>
        <h5>Atack:</h5>
        <p>{state.attack}</p>
      </div>
      <div>
        <h5>Defense:</h5>
        <p>{state.defense}</p>
      </div>
      <div>
        <h5>Speed:</h5>
        <p>{state.speed}</p>
      </div>
      <div>
        <h5>Height:</h5>
        <p>{state.height}</p>
      </div>
      <div>
        <h5>Weight:</h5>
        <p>{state.weight}</p>
      </div>
      <h5>Types: </h5>
      <div>
        {!state.types
          ? ""
          : state.types.map((type) => <p key={type.name}>{type.name}</p>)}
      </div>
      <div>
        <h5>Id:</h5>
        <p>{state.id}</p>
      </div>
      <div>
        <img src={state.img} height={150} width={150} alt="img not found" />
      </div>

      {state.createInDB ? (
        <div onClick={modify}>
          boton para crear
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CardDetail;
