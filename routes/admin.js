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
router.get('/admin', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    User.find({}, function(err, user) {
        console.log(user);
        res.render('admin/home', { session_store: session_store, users: user })
    }).select('username email firstname lastname users createdAt updatedAt')
});

/* GET users listing. */
router.get('/databuku', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Nilai.find({}, function(err, nilai) {
        //console.log(buku);
        res.render('admin/buku/table', { session_store: session_store, nilais: nilai })
    }).select('_id kodebuku judulbuku sinopsis pengarang harga nilaiooad nilairpl nilaicitra nilaikomdat nilaiso created_at')
});

/* GET users listing. */
router.get('/inputbuku', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session
    res.render('admin/buku/input_data', { session_store: session_store})
});

//input data buku
router.post('/inputbuku', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Nilai.find({ kodebuku: req.body.kodebuku }, function(err, nilai) {
        if (nilai.length == 0) {
            var databuku = new Nilai({
                kodebuku: req.body.kodebuku,
                judulbuku: req.body.judulbuku,
                sinopsis: req.body.sinopsis,
                pengarang: req.body.pengarang,
                harga: req.body.harga,
                nilaiooad: req.body.nilaiooad,
                nilairpl: req.body.nilairpl,
                nilaicitra: req.body.nilaicitra,
                nilaikomdat: req.body.nilaikomdat,
                nilaiso: req.body.nilaiso,
            })
            databuku.save(function(err) {
                if (err) {
                    console.log(err);
                    req.flash('msg_error', 'Maaf, nampaknya ada masalah di sistem kami')
                    res.redirect('/databuku')
                } else {
                    req.flash('msg_info', 'User telah berhasil dibuat')
                    res.redirect('/databuku')
                }
            })
        } else {
            req.flash('msg_error', 'Maaf, kode buku sudah ada....')
            res.render('admin/buku/input_data', {
                session_store: session_store,
                kodebuku: req.body.kodebuku,
                judulbuku: req.body.judulbuku,
                sinopsis: req.body.sinopsis,
                pengarang: req.body.pengarang,
                harga: req.body.harga,
                nilaiooad: req.body.nilaiooad,
                nilairpl: req.body.nilairpl,
                nilaicitra: req.body.nilaicitra,
                nilaikomdat: req.body.nilaikomdat,
                nilaiso: req.body.nilaiso,
            })
        }
    })
})

//menampilkan data berdasarkan id
router.get('/:id/editbuku', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Nilai.findOne({ _id: req.params.id }, function(err, nilai) {
        if (nilai) {
            console.log("nilaisss"+nilai);
            res.render('admin/buku/edit_data', { session_store: session_store, nilais: nilai })
        } else {
            req.flash('msg_error', 'Maaf, Data tidak ditemukan')
            res.redirect('/databuku')
        }
    })
})

router.post('/:id/editbuku', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Nilai.findById(req.params.id, function(err, nilai) {
        nilai.kodebuku = req.body.kodebuku;
        nilai.judulbuku = req.body.judulbuku;
        nilai.sinopsis = req.body.sinopsis;
        nilai.pengarang = req.body.pengarang;
        nilai.harga = req.body.harga;
        nilai.nilaiooad= req.body.nilaiooad,
        nilai.nilairpl= req.body.nilairpl,
        nilai.nilaicitra= req.body.nilaicitra,
        nilai.nilaikomdat= req.body.nilaikomdat,
        nilai.nilaiso = req.body.nilaiso,

        nilai.save(function(err, user) {
            if (err) {
                req.flash('msg_error', 'Maaf, sepertinya ada masalah dengan sistem kami...');
            } else {
                req.flash('msg_info', 'Edit data berhasil!');
            }

            res.redirect('/databuku');

        });
    });
})

router.post('/:id/delete', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    Nilai.findById(req.params.id, function(err, nilai){
        nilai.remove(function(err, nilai){
            if (err)
            {
                req.flash('msg_error', 'Maaf, kayaknya user yang dimaksud sudah tidak ada. Dan kebetulan lagi ada masalah sama sistem kami :D');
            }
            else
            {
                req.flash('msg_info', 'Data buku berhasil dihapus!');
            }
            res.redirect('/databuku');
        })
    })
})


/* GET users listing. */
router.get('/datadosen', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Dosen.find({}, function(err, dosen) {
        //console.log(dosen);
        res.render('admin/dosen/table_dosen', { session_store: session_store, dosenn: dosen })
    }).select('_id kodedosen namadosen telephone email agama pendidikan matkul  created_at')
});

/* GET users listing. */
router.get('/inputdosen', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session
    res.render('admin/dosen/input_dosen', { session_store: session_store})
});

//input data buku
router.post('/inputdosen', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session


    Dosen.find({ kodedosen: req.body.kodedosen }, function(err, dosen) {
        if (dosen.length == 0) {
            var datadosen = new Dosen({
                kodedosen: req.body.kodedosen,
                namadosen: req.body.namadosen,
                telephone: req.body.telephone,
                email: req.body.email,
                agama: req.body.agama,
                pendidikan: req.body.pendidikan,
                matkul: req.body.matkul,

            })
            datadosen.save(function(err) {
                if (err) {
                    console.log(err);
                    req.flash('msg_error', 'Maaf, nampaknya ada masalah di sistem kami')
                    res.redirect('/datadosen')
                } else {
                    req.flash('msg_info', 'User telah berhasil dibuat')
                    res.redirect('/datadosen')
                }
            })
        } else {
            req.flash('msg_error', 'Maaf, kode buku sudah ada....')
            res.render('admin/dosen/input_dosen', {
                session_store: session_store,
                kodedosen: req.body.kodedosen,
                namadosen: req.body.namadosen,
                telephone: req.body.telephone,
                email: req.body.email,
                agama: req.body.agama,
                pendidikan: req.body.pendidikan,
                matkul: req.body.matkul,

            })
        }
    })
})

//menampilkan data berdasarkan id
router.get('/:id/editdosen', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Dosen.findOne({ _id: req.params.id }, function(err, dosen) {
        if (dosen) {
            console.log("dosenn"+dosen);
            res.render('admin/dosen/edit_dosen', { session_store: session_store, dosenn: dosen })
        } else {
            req.flash('msg_error', 'Maaf, Data tidak ditemukan')
            res.redirect('/datadosen')
        }
    })
})

router.post('/:id/editdosen', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Dosen.findById(req.params.id, function(err, dosen) {
        dosen.kodedosen = req.body.kodedosen;
        dosen.namadosen = req.body.namadosen;
        dosen.telephone = req.body.telephone;
        dosen.email = req.body.email;
        dosen.agama = req.body.agama;
        dosen.pendidikan= req.body.pendidikan,
        dosen.matkul= req.body.matkul,


            dosen.save(function(err, user) {
                if (err) {
                    req.flash('msg_error', 'Maaf, sepertinya ada masalah dengan sistem kami...');
                } else {
                    req.flash('msg_info', 'Edit data berhasil!');
                }

                res.redirect('/datadosen');

            });
    });
})

router.post('/:id/delete', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    Dosen.findById(req.params.id, function(err, dosen){
        dosen.remove(function(err, dosen){
            if (err)
            {
                req.flash('msg_error', 'Maaf, kayaknya user yang dimaksud sudah tidak ada. Dan kebetulan lagi ada masalah sama sistem kami :D');
            }
            else
            {
                req.flash('msg_info', 'Data buku berhasil dihapus!');
            }
            res.redirect('/datadosen');
        })
    })
})

/* GET users listing. data mahasiswa */
router.get('/datamahasiswa', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Mahasiswa.find({}, function(err, mahasiswa) {
        //console.log(mahasiswa);
        res.render('admin/mahasiswa/tabel_mahasiswa', { session_store: session_store, mahasiswaa: mahasiswa })
    }).select('_id kodemahasiswa namamahasiswa ttl jeniskelamin telephone email agama alamat tahunmasuk   created_at')
});

/* GET users listing. */
router.get('/inputmahasiswa', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session
    res.render('admin/mahasiswa/input_mahasiswa', { session_store: session_store})
});

//input data buku
router.post('/inputmahasiswa', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Mahasiswa.find({ kodemahasiswa: req.body.kodemahasiswa }, function(err, mahasiswa) {
        if (mahasiswa.length == 0) {
            var datamahasiswa = new Mahasiswa({
                kodemahasiswa: req.body.kodemahasiswa,
                namamahasiswa: req.body.namamahasiswa,
                ttl          : req.body.ttl,
                jeniskelamin: req.body.jeniskelamin,
                telephone: req.body.telephone,
                email: req.body.email,
                agama: req.body.agama,
                alamat: req.body.alamat,
                tahunmasuk: req.body.tahunmasuk,

            })
            datamahasiswa.save(function(err) {
                if (err) {
                    console.log(err);
                    req.flash('msg_error', 'Maaf, nampaknya ada masalah di sistem kami')
                    res.redirect('/datamahasiswa')
                } else {
                    req.flash('msg_info', 'User telah berhasil dibuat')
                    res.redirect('/datamahasiswa')
                }
            })
        } else {
            req.flash('msg_error', 'Maaf, kode buku sudah ada....')
            res.render('admin/mahasiswa/input_mahasiswa', {
                session_store: session_store,
                kodemahasiswa: req.body.kodemahasiswa,
                namamahasiswa: req.body.namamahasiswa,
                ttl          : req.body.ttl,
                jeniskelamin: req.body.jeniskelamin,
                telephone: req.body.telephone,
                email: req.body.email,
                agama: req.body.agama,
                alamat: req.body.alamat,
                tahunmasuk: req.body.tahunmasuk,

            })
        }
    })
})

//menampilkan data berdasarkan id
router.get('/:id/editmahasiswa', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Mahasiswa.findOne({ _id: req.params.id }, function(err, mahasiswa) {
        if (mahasiswa) {
            console.log("mahasiswaa"+mahasiswa);
            res.render('admin/mahasiswa/edit_mahasiswa', { session_store: session_store, mahasiswaa: mahasiswa })
        } else {
            req.flash('msg_error', 'Maaf, Data tidak ditemukan')
            res.redirect('/datamahasiswa')
        }
    })
})

router.post('/:id/editmahasiswa', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Mahasiswa.findById(req.params.id, function(err, mahasiswa) {
        mahasiswa.kodemahasiswa = req.body.kodemahasiswa;
        mahasiswa.namamahasiswa = req.body.namamahasiswa;
        mahasiswa.ttl = req.body.ttl;
        mahasiswa.jeniskelamin = req.body.jeniskelamin;
        mahasiswa.telephone = req.body.telephone;
        mahasiswa.email = req.body.email;
        mahasiswa.agama = req.body.agama;
        mahasiswa.alamat= req.body.alamat,
        mahasiswa.tahunmasuk= req.body.tahunmasuk,


            mahasiswa.save(function(err, user) {
                if (err) {
                    req.flash('msg_error', 'Maaf, sepertinya ada masalah dengan sistem kami...');
                } else {
                    req.flash('msg_info', 'Edit data berhasil!');
                }

                res.redirect('/datamahasiswa');

            });
    });
})


router.post('/:id/delete', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    Mahasiswa.findById(req.params.id, function(err, mahasiswa){
        mahasiswa.remove(function(err, mahasiswa){
            if (err)
            {
                req.flash('msg_error', 'Maaf, kayaknya user yang dimaksud sudah tidak ada. Dan kebetulan lagi ada masalah sama sistem kami :D');
            }
            else
            {
                req.flash('msg_info', 'Data buku berhasil dihapus!');
            }
            res.redirect('/datamahasiswa');
        })
    })
})

/*GET users listing. */
router.get('/datatgl', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Tglakademik.find({}, function(err, tgl) {
        //console.log(tgl);
        res.render('admin/tabel_tglakademik/table_tglakademik', { session_store: session_store, tgls: tgl })
    }).select('_id tanggal bulan tahun keterangan created_at')
});

/* GET users listing. */
router.get('/inputtgl', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session
    res.render('admin/tabel_tglakademik/input_tglakademik', { session_store: session_store})
});

//input data buku
router.post('/inputtgl', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Tglakademik.find({ tanggal: req.body.tanggal }, function(err, tgl) {
        if (tgl.length == 0) {
            var datatgl = new Tglakademik({
                tanggal: req.body.tanggal,
                bulan: req.body.bulan,
                tahun: req.body.tahun,
                keterangan: req.body.keterangan,
            })
            datatgl.save(function(err) {
                if (err) {
                    console.log(err);
                    req.flash('msg_error', 'Maaf, nampaknya ada masalah di sistem kami')
                    res.redirect('/datatgl')
                } else {
                    req.flash('msg_info', 'User telah berhasil dibuat')
                    res.redirect('/datatgl')
                }
            })
        } else {
            req.flash('msg_error', 'Maaf, kode buku sudah ada....')
            res.render('admin/tabel_tglakademik/input_tglakademik', {
                session_store: session_store,
                tanggal: req.body.tanggal,
                bulan: req.body.bulan,
                tahun: req.body.tahun,
                keterangan: req.body.keterangan,

            })
        }
    })
})

//menampilkan data berdasarkan id
router.get('/:id/edittgl', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Tglakademik.findOne({ _id: req.params.id }, function(err, tgl) {
        if (tgl) {
            console.log("tglss"+tgl);
            res.render('admin/tabel_tglakademik/edit_tglakademik', { session_store: session_store, tgls: tgl })
        } else {
            req.flash('msg_error', 'Maaf, Data tidak ditemukan')
            res.redirect('/datatgl')
        }
    })
})

router.post('/:id/edittgl', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Tglakademik.findById(req.params.id, function(err, tgl) {
        tgl.tanggal = req.body.tanggal;
        tgl.bulan = req.body.bulan;
        tgl.tahun = req.body.tahun;
        tgl.keterangan = req.body.keterangan;
            tgl.save(function(err, user) {
                if (err) {
                    req.flash('msg_error', 'Maaf, sepertinya ada masalah dengan sistem kami...');
                } else {
                    req.flash('msg_info', 'Edit data berhasil!');
                }

                res.redirect('/datatgl');

            });
    });
})

router.post('/:id/delete', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    Tglakademik.findById(req.params.id, function(err, tgl){
        tgl.remove(function(err, tgl){
            if (err)
            {
                req.flash('msg_error', 'Maaf, kayaknya user yang dimaksud sudah tidak ada. Dan kebetulan lagi ada masalah sama sistem kami :D');
            }
            else
            {
                req.flash('msg_info', 'Data buku berhasil dihapus!');
            }
            res.redirect('/datatgl');
        })
    })
})
module.exports = router;