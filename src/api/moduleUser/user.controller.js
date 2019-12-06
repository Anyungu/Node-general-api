

import User from './user.model';
import UserService from './user.service';
import jwt from '../facilities/jwt';


export default {
    async signUp(req, res) {

        try {

            const { value, error } = UserService.validateSignUp(req.body);


            if (error && error.details) {

                return res.status(400).json(error.details.message);
            }

            const encPassword = UserService.encryptPassword(value.password);

            const target = { password: encPassword };

            const new_value = Object.assign(value, target);

            const user = await User.create(new_value);
            return res.json({ message: "User Record Created Successfully" });

        } catch (err) {
            console.error(err);
            return res.status(500).send(err);
        }
    },

    async login(req, res) {

        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email: email });

            if (user === null) {
                return res.status(401).json({ err: 'Could not find user' })
            }

            if (UserService.matchPassword(user.password, password)) {

                const tok = jwt.issueToken({email: email, password: password}, "2h");

                return res.json({ message: tok });
            }

            return res.status(400).json({ message: "Invalid credentials" });

        } catch (err) {

            if (err.message.indexOf('Cast to ObjectId failed') !== -1) {
                return res.status(401).json({ err: 'Could not find user' })
            }
            return res.status(500).send(err);
        }
    },

    async authenticate(req, res) {
        return res.json(req.user);
    }
}