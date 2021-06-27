const Company = require("../models/Company");

module.exports = {
    async store(req, res) {
        const { name } = req.body;

        const company = await Company.create({
            name
        });

        return res.json(company);
    },

    async findById(req, res) {
        const { id } = req.query;
        const company = await Company.findOne({_id: id});

        if(company) {
            return res.json(company);
        }

        else {
            return res.json({error: "Companhia não encontrada"})
        }
    }
}