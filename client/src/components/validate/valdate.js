export function validate (input) {
    let errors = {};
    if(!input.name) {
      errors.name = 'Name is required' 
    } else if(!/^[a-z]+$/i.test(input.name)) {
      errors.name = 'Name is invalid (A-Z or a-Z)'
    };
    if(!input.atack) {
      errors.atack = 'Atack is required' 
    } else if(!/^([1-9][0-9]{0,2}|1000)$/i.test(input.atack)) {
      errors.atack = 'Atack is invalid (0-1000)'
    };
    if(!input.defense) {
      errors.defense = 'Defense is required' 
    } else if(!/^([1-9][0-9]{0,2}|1000)$/i.test(input.defense)) {
      errors.defense = 'Defense is invalid (0-1000)'
    };
    if(!input.height) {
      errors.height = 'Height is required' 
    } else if(!/^([1-9][0-9]{0,2}|1000)$/i.test(input.height)) {
      errors.height = 'Height is invalid (0-1000)'
    };
    if(!input.weight) {
      errors.weight = 'Weight is required' 
    } else if(!/^([1-9][0-9]{0,2}|1000)$/i.test(input.weight)) {
      errors.weight = 'Weight is invalid (0-1000)'
    };
    if(!input.life) {
      errors.life = 'Life is required' 
    } else if(!/^([1-9][0-9]{0,2}|1000)$/i.test(input.life)) {
      errors.life = 'Life is invalid (0-1000)'
    };
    if(!input.speed) {
      errors.speed = 'Speed is required' 
    } else if(!/^([1-9][0-9]{0,2}|1000)$/i.test(input.speed)) {
      errors.speed = 'Speed is invalid (0-1000)'
    };
    if(!input.speed) {
      errors.speed = 'Speed is required' 
    } else if(!/^([1-9][0-9]{0,2}|1000)$/i.test(input.speed)) {
      errors.speed = 'Speed is invalid (0-1000)'
    };
    if(input.type.length === 0) {
      console.log('Entre aca no se por que');
      errors.type = 'Minimun 1 type is required'
    }
    return errors
}