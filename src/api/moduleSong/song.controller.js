
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

            const { value, error } = schema.validate(req.body);

            if (error && error.details) {
                return res.status(400).json(error.details);
            }

            const song = await Song.create(value);
            return res.json({message: "Song Record Created Successfully"});

        } catch (err) {
            console.error(err);
            return res.status(500).send(err);
        }
    },

    async findAll(req, res) {

        try {
            const { page, perPage } = req.query;
            const options = {
                page: parseInt(page, 10) || 1,
                limit: parseInt(perPage, 10) || 10
            }
            const songs = await Song.paginate({}, options);
            return res.json(songs);

        } catch (err) {
            console.error(err);
            return res.status(500).send(err);
        }
    },

    async findOne(req, res) {

        try {
            const { id } = req.params;
            
            const song = await Song.findById(id)

            if (!song) {
                return res.status(401).json({err: 'Could not find song'})
            }
            return res.json(song);

        } catch (err) {
        
             if (err.message.indexOf('Cast to ObjectId failed') !== -1) {
                return res.status(401).json({err: 'Could not find song'})
             }
            return res.status(500).send(err);
        }
    },

    async deleteOne(req, res) {

        try {
            const { id } = req.params;
            
            const song = await Song.findByIdAndDelete(id);

            if (!song) {
                return res.status(401).json({err: 'Could not find song'})
            }
            return res.json({"message": "Song Found and deleted"});

        } catch (err) {
        
             if (err.message.indexOf('Cast to ObjectId failed') !== -1) {
                return res.status(401).json({err: 'Could not find song'})
             }
            return res.status(500).send(err);
        }
    },
}