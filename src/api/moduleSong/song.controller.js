
import Joi from '@hapi/joi';
import Song from './song.model';

export default {
    async create(req, res) {
        // return res.json ({msg : 'TODO: SONG CREATE'})
        // console.log(req.body);
        try {
        const schema = Joi.object({
            title: Joi.string().required(),
            url: Joi.string().required(),
            rating: Joi.number().integer().min(0).max(5).optional()
        });

        const {value, error} = schema.validate(req.body);

        if (error && error.details) {
            return res.status(400).json(error);
        }

        const song = await Song.create(value);
        return res.json(song);
        
        } catch(err) {
            console.error(err);
            return res.status(500).send(err);
        }
    },

    async findAll(req, res) {

        try {

            const songs = await Song.paginate();
            return res.json(songs);

        } catch(err) {
            console.error(err);
            return res.status(500).send(err);
        }
    }
}