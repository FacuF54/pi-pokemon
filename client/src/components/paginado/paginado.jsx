import React from "react";
// import paginas from "./paginado.module.css"

export default function Paginado({currentPj, allPokemons, paginado}){
    
    const numeroDePagina = []

    for (let i = 1; i <= Math.ceil(allPokemons/currentPj); i++) {
        numeroDePagina.push(i)
    }

    return(
        <nav>
            <div className="paginado">
            {
            numeroDePagina && numeroDePagina.map(e=>(
                <div key = {e}>
                    <div className="paginado">
                        <button onClick={()=>paginado(e)}>{e}</button>
                    </div>
                </div>
            ))
            }
            </div>
        </nav>
    )

}
