
const mongoose = require('mongoose');
const nilaiSchema = mongoose.Schema({
    kodebuku        : {type: String, unique: true},
    judulbuku 		: String,
    sinopsis 	    : String,
    pengarang	    : String,
    harga	        : String,
    nilaiooad       : String,
    nilairpl 		: String,
    nilaicitra 	    : String,
    nilaikomdat	    : String,
    nilaiso 	    : String,
    created_at		: String
});
module.exports = mongoose.model('nilai', nilaiSchema);