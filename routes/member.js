var express = require('express');
var crypto = require('crypto')

var User = require('../model/user')
var Nilai = require('../model/buku')
var Dosen = require('../model/dosen')
var Mahasiswa = require('../model/mahasiswa')
var Tglakademik = require('../model/tglakademik')
var Auth_middleware = require('../middlewares/auth')

var router = express.Router();
var secret = 'rahasia'
var session_store

/* GET users listing. */
router.get('/member', Auth_middleware.check_login, Auth_middleware.is_member, function(req, res, next) {
    session_store = req.session

    User.find({}, function(err, user) {
        console.log(user);
        res.render('admin/home', { session_store: session_store, users: user })
    })
});

/* GET users listing. */
router.get('/databukumember', Auth_middleware.check_login, Auth_middleware.is_member, function(req, res, next) {
    session_store = req.session

    Nilai.find({}, function(err, nilai) {
        console.log(nilai);
        res.render('admin/buku/table', { session_store: session_store, nilais: nilai })
    }).select('_id kodebuku judulbuku sinopsis pengarang harga nilaiooad nilairpl nilaicitra nilaikomdat nilaiso created_at')
});

router.get('/datadosenmember', Auth_middleware.check_login, Auth_middleware.is_member, function(req, res, next) {
    session_store = req.session

    Dosen.find({}, function(err, dosen) {
        console.log(dosen);
        res.render('admin/dosen/table_dosen', { session_store: session_store, dosenn: dosen })
    }).select('_id kodedosen namadosen telephone email agama pendidikan matkul  created_at')
});

/* GET users listing. */
router.get('/datamahasiswamember', Auth_middleware.check_login, Auth_middleware.is_member, function(req, res, next) {
    session_store = req.session

    Mahasiswa.find({}, function(err, mahasiswa) {
        console.log(mahasiswa);
        res.render('admin/mahasiswa/tabel_mahasiswa', { session_store: session_store, mahasiswaa: mahasiswa })
    }).select('_id kodemahasiswa namamahasiswa ttl jeniskelamin telephone email agama alamat tahunmasuk   created_at')
});



module.exports = router;

