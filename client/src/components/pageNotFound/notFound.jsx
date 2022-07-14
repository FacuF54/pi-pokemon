import React from "react";
import error from "../../images/error.gif";
import { Outlet, useNavigate } from "react-router-dom";
import style from "./style.module.css";

const PageNotFound = () => {

  const navigate = useNavigate();

  function handleClick() {
    navigate(-1);
  }

  return (
    <div>
      <div>
        <div >
            <button className={style.btn} onClick={handleClick}>atras</button>
        </div>
        <img src={error} alt="img not found" />
        <h1>404 - Address does not exist</h1>
      </div>
      <Outlet />
    </div>
  );

};

export default PageNotFound;
