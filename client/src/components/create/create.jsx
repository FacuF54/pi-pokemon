import React from "react"
import { useState , useEffect} from "react"
import { useDispatch , useSelector } from "react-redux"
import { createPokemon, getTypes } from "../../actions"
import Nav from "../nav/nav"

const CreatePoke = () => {

    let dispatch = useDispatch();
    let types = useSelector(state => state.types)

    let [form , setForm] = useState({
        name : "",
        life : 0,
        types : [],
        strong : 0,
        defense : 0,
        speed : 0,
        height : 0,
        weight : 0,
        img : "",
    })

    let [err , setErr] = useState({});

    const validate = (form) => {
        let errors = {}
        if(!form.name){
            errors.name = "Name is required"
        }
        return errors
    }

    useEffect (()=>{

        dispatch(getTypes())

    },[dispatch])

    function HandleChange (e) {
        
        setForm({
            ...form, [e.target.name] : e.target.value
        })
        console.log(form);
        setErr(validate({
            ...form , [e.target.name] : e.target.value
        }))
        console.log(err)
    }

    function handleTypes (e) {

        if (e.target.value !== "ignore") {
            setForm({
                ...form,
                types : [...form.types, e.target.value]
            });
        e.target.value = "ignore"
        console.log(form)
        } 
    }

    function handleClick (e) {
        e.preventDefault();
        dispatch(createPokemon(form));
        console.log(form);
        alert("¡Pokemon Creado!")
        setForm({
            name : "",
            life : "",
            types : [],
            strong : "",
            defense : "",
            speed : "",
            height : "",
            weight : "",
            img : "",
        })
    }

    function quitarType (e) {
        e.preventDefault()
        console.log(e.target.value)
        console.log(form.types)
        setForm({
            ...form,
            types : form.types.filter(obj => obj !== e.target.value)
        })
    }

    return (
        <div>
            <Nav/>
            <div className="create">
                <form action="">
                    <label >PokeName: </label>
                    <input name="name" onChange={HandleChange} type="text" value={form.name} />
                    {
                        err.hasOwnProperty("name") ? <p>{err.name}</p> : null
                    }
                    <br />
                    <label >PokeLife: </label>
                    <input name="life" onChange={HandleChange} type="number" />
                    <br />
                    <label >Speed: </label>
                    <input name="speed" onChange={HandleChange} type="number" />
                    <br />
                    <label >defense: </label>
                    <input name="defense" onChange={HandleChange} type="number" />
                    <br />
                    <label >Strong: </label>
                    <input name="strong" onChange={HandleChange} type="number" />
                    <br />
                    <label >Height: </label>
                    <input name="height" onChange={HandleChange} type="number" />
                    <br />
                    <label >Weight: </label>
                    <input name="weight" onChange={HandleChange} type="number" />
                    <br />
                    <label >PokeImagen: </label>
                    <input name="img" onChange={HandleChange} type="url" placeholder="Coloca la URL de la imagen"/>
                    <br />
                    <select onClick={handleTypes}>
                        <option value="ignore">Selecciones los tipos</option>
                        {
                            types.map(obj => 
                                <option key={obj} >{obj}</option>
                
                            )
                        }
                    </select>
                    <div>
                        {form.types.map(obj => 
                        <div>
                            {obj + " "}
                            <button value={obj} key={obj} onClick={quitarType}>x</button>
                        </div>
                        )}
                    </div>
                    { 
                        err.hasOwnProperty("name") ? undefined : <button type="submit" onClick={handleClick} className="submit">Crear Poke</button>
                        
                    }
                </form>
            </div>
        </div>
    )
}

export default CreatePoke