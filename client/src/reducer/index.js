import { GET_POKEMONS, FILTER_TYPE, GET_TYPES, FILTER_CREATE,FILTER_AZ,FILTER_POWER,GET_POKEMONS_NAME,CLEAN_SEARCH,GET_DETAIL,POKE_TO_MODIFY, CLEAN_POKE_MODIFY } from "../actions/index";

const initialState = {
  pokemons: [],
  allPokemons: [],
  types: [],
  pokeModify: [],
  buscar : [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        allPokemons:action.payload,
      };
      case CLEAN_POKE_MODIFY:
        return ({
          ...state,
          pokeModify: action.payload
      });
    case GET_POKEMONS_NAME:
      return{
        ...state,
        buscar: action.payload
      }
      case GET_DETAIL:
        return ({
            ...state,
            buscar: action.payload
        });

       case CLEAN_SEARCH:
            return {
                ...state,
                buscar : action.payload
            }

    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };

      case POKE_TO_MODIFY:
        return ({
            ...state,
            pokeModify: state.pokemons
        });

    case FILTER_TYPE:
        let allPokes =[...state.allPokemons]
        let typeFilter = action.payload === '-' ? allPokes : allPokes.filter(el => el.types?.map(e =>{return e.name}).includes(action.payload))
            return{
            ...state,
            pokemons: typeFilter
        }

        case FILTER_CREATE:
          let allPokemon = [...state.allPokemons]
          let aux = []
          if (action.payload === 'db') {
            state.allPokemons.forEach(elem => {
                if (elem.createInDB) {
                    aux.push(elem)
                }
            })};
            if (action.payload === 'api') {
              state.allPokemons.forEach(elem => {
                  if (!elem.createInDB) {
                      aux.push(elem)
                  }
              })};
            
            return {
                ...state,
                pokemons : action.payload === "-"? allPokemon : aux
            }

          case FILTER_AZ: 
          let allPokemon3 = [...state.allPokemons]
           if(action.payload === "asc" ){
             allPokemon3 = allPokemon3.sort((a , b) =>{
                 if (a.name > b.name) {
                     return 1;
                 } else if (a.name < b.name) {
                     return -1;
                 } else {
                     return 0
                 }
             })
           }

           if(action.payload === "des"){
            allPokemon3 = allPokemon3.sort((a , b) =>{
                 if (a.name > b.name) {
                     return -1;
                 } else if (a.name < b.name) {
                     return 1;
                 } else {
                     return 0
                 }
             })
            }
            console.log(allPokemon3)
            return{
              ...state,
              pokemons: allPokemon3
            }
            case FILTER_POWER:
              let allPokemon4 = [...state.allPokemons]
               if(action.payload === "Up"){
                 allPokemon4 = allPokemon4.sort((a , b) =>{
                  if (b.attack < a.attack) {
                    return -1;
                } else if (a.attack > b.attack) {
                    return 1;
                } else{ return 0};
                 })
               }
    
               if(action.payload === "Down"){
                allPokemon4 = allPokemon4.sort((a , b) =>{
                  if (b.attack > a.attack) {
                    return -1;
                } else if (b.attack < a.attack) {
                    return 1;
                } else{ return 0};
                 })
                }
                return{
                  ...state,
                  pokemons: allPokemon4
                }
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
