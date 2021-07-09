const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    hydrometer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hydrometer',
        required: true
    },

    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },

    goal: {
        consumo: {
            type: Number
        },

        periodo: {
            type: String
        }
    }
},

{
    timestamps: true
},

{
    collection: 'users'
});

module.exports = mongoose.model("User", UserSchema);