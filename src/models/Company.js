const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    pricing: {
        type: Number
    }
},

{
    timestamps: true
},

{
    collection: 'companies'
});

module.exports = mongoose.model("Company", CompanySchema);