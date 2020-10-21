const { body, validationResult } = require('express-validator');
const validation = {
    validate : () => {
        return[
            body('name','Name is Required Field').not().isEmpty(),
            body('password','Password is Required Fiels').not().isEmpty()
        ];
    }
}
module.exports = validation.validate;