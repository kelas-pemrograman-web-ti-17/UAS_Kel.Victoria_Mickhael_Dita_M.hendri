
const mongoose = require('mongoose');
const mahasiswaSchema = mongoose.Schema({
    kodemahasiswa   : {type: String, unique: true},
    namamahasiswa   : String,
    ttl 		    : String,
    jeniskelamin    : String,
    telephone	    : String,
    email           : String,
    agama	        : String,
    alamat          : String,
    tahunmasuk   	: String
});
module.exports = mongoose.model('mahasiswa', mahasiswaSchema);