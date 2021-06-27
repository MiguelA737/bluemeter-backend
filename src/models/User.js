const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    hydrometer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hydrometer'
    }
},

{
    timestamps: true
},

{
    collection: 'users'
});

module.exports = mongoose.model("User", UserSchema);