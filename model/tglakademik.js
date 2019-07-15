
const mongoose = require('mongoose');
const tglSchema = mongoose.Schema({
    tanggal         : {type: String, unique: true},
    bulan 	    	: String,
    tahun	        : String,
    keterangan      : String,

});
module.exports = mongoose.model('tgl', tglSchema);