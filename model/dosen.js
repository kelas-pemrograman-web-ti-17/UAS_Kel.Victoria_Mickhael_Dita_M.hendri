
const mongoose = require('mongoose');
const dosenSchema = mongoose.Schema({
    kodedosen       : {type: String, unique: true},
    namadosen 		: String,
    telephone	    : String,
    email           : String,
    agama	        : String,
    pendidikan      : String,
    matkul   		: String
});
module.exports = mongoose.model('dosen', dosenSchema);