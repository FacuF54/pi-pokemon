import React from "react";
import style from "./card.module.css"

export default function Card({ id, img, name, power, types }) {
  return (
    <div className={style.detail}>
      <h3>id:  <br />{id}</h3>
      <img src={img} alt="Img not found" />
      <h1>name: <br />{name}</h1>
      <h3>power: <br />{power}</h3>
      <h5>Types:  </h5>
      {types.map((type) => (
        <p key={type.id}>
          {type.name} <br />
        </p>
      ))}
    </div>
  );
}
