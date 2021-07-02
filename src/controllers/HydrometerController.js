const Hydrometer = require("../models/Hydrometer");

module.exports = {
    async store(req, res) {
        const hydrometer = await Hydrometer.create({});

        return res.json(hydrometer);
    },

    async findById(req, res) {
        const { id } = req.query;
        const hydrometer = await Hydrometer.findOne({_id: id});

        if(hydrometer) {
            return res.json(hydrometer);
        }

        else {
            return res.json({error: "Hidrômetro não encontrado"})
        }
    },

    async writeNewReading(req, res) {
        const { id, datetime, flow } = req.body;
        const hydrometer = await Hydrometer.findOne({_id: id});

        if(hydrometer) {
            hydrometer.history.push({
                datetime: datetime,
                flow: flow
            });

            hydrometer.save("done");

            return res.json(hydrometer);
        }

        else {
            return res.json({error: "Hidrômetro não encontrado"})
        }
    }
}