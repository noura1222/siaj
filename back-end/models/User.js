const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    nationalId: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    assaignHostpital: {
        type: String,
        required: true
    },
    userTemperature: [
        {
            temperature: {
                type: String,
                require: true
            },
            recordDate: {
                type: Date,
                required: true,
                default: new Date()
            }
        }
    ],
    homeLocation: {
        lat: {
            type: String,
            require: true
        },
        lng: {
            type: String,
            require: true
        }
    },
    violations: [
        {
            type: {
                type: String,
                required: true
            },
            time: {
                type: Date,
                default: Date.now
            }
        }
    ],
    registerDate: {
        type: Date,
        required: true,
        default: new Date()
    },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
