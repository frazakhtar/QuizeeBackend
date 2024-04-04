let mongoose = require('mongoose');;
let Schema = mongoose.Schema;
let loginSchema = Schema({
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    }
});

let User = module.exports = mongoose.model('User', loginSchema);