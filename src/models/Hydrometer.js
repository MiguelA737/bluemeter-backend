const mongoose = require('mongoose');

const HydrometerSchema = new mongoose.Schema({
    history: [{
        datetime: {
            type: Date,
            required: true
        },
        flow: {
            type: Number,
            required: true
        }
    }]
},

{
    timestamps: true
},

{
    collection: 'hydrometers'
});

module.exports = mongoose.model("Hydrometer", HydrometerSchema);