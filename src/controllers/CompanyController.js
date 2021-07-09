const Company = require("../models/Company");

module.exports = {
    async store(req, res) {
        const { name } = req.body;
        const pricing = req.body.pricing ? req.body.pricing : null;

        const company = await Company.create({
            name,
            pricing
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
            return res.json({error: "Companhia não encontrada"});
        }
    },

    async findByName(req,res){
        const { name } = req.query;
        var regex = new RegExp([name].join(""), "i");

        const company = await Company.find({name: regex})

       if(company) {
        return res.json(company);
       }

       else {
           return res.json({error: "Companhia não encontrada"});
        }
    },

    async updatePricing(req, res) {
        const { id, pricing } = req.body;
        const company = await Company.findOne({_id: id});

        if(company) {
            company.pricing = pricing;

            company.save("done");

            return res.json(company);
        }

        else {
            return res.json({error: "Companhia não encontrada"});
        }
    },

    async updatePricing(req, res) {
        const { id, pricing } = req.body;
        const company = await Company.findOne({_id: id});

        if(company) {
            company.pricing = pricing;

            company.save("done");

            return res.json(company);
        }

        else {
            return res.json({error: "Companhia não encontrada"})
        }
    }
}