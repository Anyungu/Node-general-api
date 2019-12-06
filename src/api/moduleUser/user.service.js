
import Joi from '@hapi/joi';
import bcrypt from 'bcryptjs';


export default {

    encryptPassword(plainPassword) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(plainPassword, salt);
        return hash;
    },

    matchPassword(hashPassword, rawPassword) {
     
       return bcrypt.compareSync(rawPassword, hashPassword);
        
    },

    validateSignUp(body) {

        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required()

        });

        const { value, error } = schema.validate(body);

        if (error && error.details) {
            return { "error": error };
        }
        return { "value": value };

    }
}

