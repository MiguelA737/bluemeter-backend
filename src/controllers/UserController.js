const User = require("../models/User");
const Company = require("../models/Company");

module.exports = {
    async store(req, res) {
        const { name, hydrometer, company } = req.body;
        const user_company = await Company.findOne({_id: company});

        if(user_company) {
            const user = await User.create({
                name,
                hydrometer,
                company,
                goal: {
                    consumo: null,
                    periodo: null
                }
            });

            user_company.users.push(user);
            user_company.save("done");

            return res.json(user);
        }

        else {
            return res.json({error: "Companhia não encontrada"});
        }
    },

    async findById(req, res) {
        const { id } = req.query;
        const user = await User.findOne({_id: id});

        if(user) {
            return res.json(user);
        }

        else {
            return res.json({error: "Usuário não encontrado"});
        }
    },

    async updateGoal(req, res) {
        const { id, consumo, periodo } = req.body;
        const user = await User.findOne({_id: id});

        if(user) {
            user.goal.consumo = consumo;
            user.goal.periodo = periodo;

            user.save("done");

            return res.json(user);
        }

        else {
            return res.json({error: "Usuário não encontrado"});
        }
    }
}