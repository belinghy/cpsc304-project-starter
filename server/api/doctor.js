/* eslint-disable */
import { Router } from 'express'
var connection = require('../configs/sequelize')
const bodyParser = require('body-parser')

const router = Router()

router.get('/doctor', function (req, res, next) {
    const query = 'SELECT * FROM patient;'
    connection.query(query, { type: connection.QueryTypes.SELECT })
        .then(patients => {
            console.log(patients)
            res.json(patients)
        })
})

router.post('/doctor/addRec', bodyParser.json(), function (req, res, next) {
    const recordID = req.body.data.recordID;
    const dateCreated = req.body.data.dateCreated;
    const summary = req.body.data.summary;
    const doctorid = req.body.data.doctorid;
    const patientid = req.body.data.patientid;

    const query = 'INSERT INTO Creates_Record (recordID, dateCreated, summary, doctorid, patientid) VALUES (:recordID, :dateCreated, :summary, :doctorid, :patientid) ;';
    connection.query(query,
        {
            type: connection.QueryTypes.INSERT,
            replacements: {
                recordID: recordID,
                dateCreated: dateCreated,
                summary: summary,
                doctorid: doctorid,
                patientid: patientid,
            }
        })
        .then(result => {
            // result[1] is the number of rows changed
            res.send('/doctor/')
        })
})

router.post('/doctor/addRef', bodyParser.json(), function (req, res, next) {
    const patientid = req.body.data.patientid;
    const doctorid = req.body.data.doctorid;
    const referraldoctorid = req.body.data.referraldoctorid;
    const referralDate = req.body.data.referralDate;


    const query = 'INSERT INTO Referrals (patientid, doctorid, referraldoctorid, referralDate) VALUES (:patientid, :doctorid, :referraldoctorid, :referralDate) ;';
    connection.query(query,
        {
            type: connection.QueryTypes.INSERT,
            replacements: {
                patientid: patientid,
                doctorid: doctorid,
                referraldoctorid: referraldoctorid,
                referralDate: referralDate
            }
        })
        .then(result => {
            // result[1] is the number of rows changed
            res.send('/doctor/')
        })
})

router.post('/doctor/addPrescription', bodyParser.json(), function (req, res, next) {
    const patientid = req.body.data.patientid;
    const doctorid = req.body.data.doctorid;
    const medicationName = req.body.data.medicationName;
    const dosage = req.body.data.dosage;



    const query = 'INSERT INTO Prescription (patientid, doctorid, medicationName, dosage) VALUES (:patientid, :doctorid, :medicationName, :dosage) ;';
    connection.query(query,
        {
            type: connection.QueryTypes.INSERT,
            replacements: {
                patientid: patientid,
                doctorid: doctorid,
                medicationName: medicationName,
                dosage: dosage
            }
        })
        .then(result => {
            // result[1] is the number of rows changed
            res.send('/doctor/')
        })
})

// router.post('/doctor/addAppointment', bodyParser.json(), function (req, res, next) {
//     const patientid = req.body.data.patientid;
//     const doctorid = req.body.data.doctorid;
//     const appointmentDateTime = req.body.data.appointmentDateTime;
//     const duration = req.body.data.duration;
//
//
//
//     const query = 'INSERT INTO Appointments (patientid, doctorid, appointmentDateTime, duration) VALUES (:patientid, :doctorid, :appointmentDateTime, :duration) ;';
//     connection.query(query,
//         {
//             type: connection.QueryTypes.INSERT,
//             replacements: {
//                 patientid: patientid,
//                 doctorid: doctorid,
//                 appointmentDateTime: appointmentDateTime,
//                 duration: duration
//             }
//         })
//         .then(result => {
//             // result[1] is the number of rows changed
//             res.send('/doctor/')
//         })
// })

router.get('/doctor/dosages', function (req, res, next) {
    const query = 'SELECT medicationName, max(dosage) FROM Prescription group by medicationName;'
    connection.query(query,
        {
            type: connection.QueryTypes.SELECT,
        })
        .then(dosages => {
            res.json(dosages)
        })
})

/* GET patient by ID. */
router.get('/doctor/:username', function (req, res, next) {
    const patientid = req.params.username
    const query = 'SELECT * FROM Patient WHERE patientid = :username ;'
    connection.query(query,
        {
            type: connection.QueryTypes.SELECT,
            replacements: {
                username: patientid
            }
        })
        .then(user => {
            if (user.length === 1 ) {
                res.json(user[0])
            } else {
                res.status(404).json({})
            }
        })
})

router.get('/doctor/:username/medrec', function (req, res, next) {
    const patientid = req.params.username
    const query = 'SELECT * FROM Patient, Creates_Record WHERE Patient.patientid = :username and Creates_Record.patientid = :username ;'
    connection.query(query,
        {
            type: connection.QueryTypes.SELECT,
            replacements: {
                username: patientid
            }
        })
        .then(records => {
                res.json(records)
        })
})

router.get('/doctor/:username/prescription', function (req, res, next) {
    const patientid = req.params.username
    const query = 'SELECT * FROM Patient, Prescription WHERE Patient.patientid = :username and Prescription.patientid = :username ;'
    connection.query(query,
        {
            type: connection.QueryTypes.SELECT,
            replacements: {
                username: patientid
            }
        })
        .then(prescriptions => {
            res.json(prescriptions)
        })
})

router.get('/doctor/:username/appointment', function (req, res, next) {
    const patientid = req.params.username
    const query = 'SELECT * FROM Patient, Appointments WHERE Patient.patientid = :username and Appointments.patientid = :username ;'
    connection.query(query,
        {
            type: connection.QueryTypes.SELECT,
            replacements: {
                username: patientid
            }
        })
        .then(appointments => {
            res.json(appointments)
        })
})

/* GET users listing. */
router.get('/doctors', function (req, res, next) {
    const query = 'SELECT * FROM doctor;'
    connection.query(query, { type: connection.QueryTypes.SELECT })
        .then(doctors => {
            res.json(doctors)
        })
})

router.get('/doctor/appointments/:doctorid/:date', bodyParser.json(), function (req, res, next) {
    console.log(req.params)
    const doctorid = req.params.doctorid || -1
    const date = req.params.date || ''

    const query = 'SELECT cast(appointmentdatetime AS TIME) FROM appointments WHERE doctorid = :doctorid AND cast(appointmentdatetime AS DATE) = :date;'
    connection.query(query, {
        type: connection.QueryTypes.SELECT,
        replacements: {
            doctorid: doctorid,
            date: date
        } })
        .then(appointments => {
            res.json(appointments)
        })
})

router.get('/doctor', function (req, res, next) {
    const query = 'SELECT * FROM patient;'
    connection.query(query, { type: connection.QueryTypes.SELECT })
        .then(patients => {
            console.log(patients)
            res.json(patients)
        })
})

router.post('/doctor/addRec', bodyParser.json(), function (req, res, next) {
    const recordID = req.body.data.recordID;
    const dateCreated = req.body.data.dateCreated;
    const summary = req.body.data.summary;
    const doctorid = req.body.data.doctorid;
    const patientid = req.body.data.patientid;

    const query = 'INSERT INTO Creates_Record (recordID, dateCreated, summary, doctorid, patientid) VALUES (:recordID, :dateCreated, :summary, :doctorid, :patientid) ;';
    connection.query(query,
        {
            type: connection.QueryTypes.INSERT,
            replacements: {
                recordID: recordID,
                dateCreated: dateCreated,
                summary: summary,
                doctorid: doctorid,
                patientid: patientid,
            }
        })
        .then(result => {
            // result[1] is the number of rows changed
            res.send('/doctor/')
        })
})

router.post('/doctor/addRef', bodyParser.json(), function (req, res, next) {
    const patientid = req.body.data.patientid;
    const doctorid = req.body.data.doctorid;
    const referraldoctorid = req.body.data.referraldoctorid;
    const referralDate = req.body.data.referralDate;


    const query = 'INSERT INTO Referrals (patientid, doctorid, referraldoctorid, referralDate) VALUES (:patientid, :doctorid, :referraldoctorid, :referralDate) ;';
    connection.query(query,
        {
            type: connection.QueryTypes.INSERT,
            replacements: {
                patientid: patientid,
                doctorid: doctorid,
                referraldoctorid: referraldoctorid,
                referralDate: referralDate
            }
        })
        .then(result => {
            // result[1] is the number of rows changed
            res.send('/doctor/')
        })
})

router.post('/doctor/addPrescription', bodyParser.json(), function (req, res, next) {
    const patientid = req.body.data.patientid;
    const doctorid = req.body.data.doctorid;
    const medicationName = req.body.data.medicationName;
    const dosage = req.body.data.dosage;



    const query = 'INSERT INTO Prescription (patientid, doctorid, medicationName, dosage) VALUES (:patientid, :doctorid, :medicationName, :dosage) ;';
    connection.query(query,
        {
            type: connection.QueryTypes.INSERT,
            replacements: {
                patientid: patientid,
                doctorid: doctorid,
                medicationName: medicationName,
                dosage: dosage
            }
        })
        .then(result => {
            // result[1] is the number of rows changed
            res.send('/doctor/')
        })
})

// router.post('/doctor/addAppointment', bodyParser.json(), function (req, res, next) {
//     const patientid = req.body.data.patientid;
//     const doctorid = req.body.data.doctorid;
//     const appointmentDateTime = req.body.data.appointmentDateTime;
//     const duration = req.body.data.duration;
//
//
//
//     const query = 'INSERT INTO Appointments (patientid, doctorid, appointmentDateTime, duration) VALUES (:patientid, :doctorid, :appointmentDateTime, :duration) ;';
//     connection.query(query,
//         {
//             type: connection.QueryTypes.INSERT,
//             replacements: {
//                 patientid: patientid,
//                 doctorid: doctorid,
//                 appointmentDateTime: appointmentDateTime,
//                 duration: duration
//             }
//         })
//         .then(result => {
//             // result[1] is the number of rows changed
//             res.send('/doctor/')
//         })
// })

router.get('/doctor/dosages', function (req, res, next) {
    const query = 'SELECT medicationName, max(dosage) FROM Prescription group by medicationName;'
    connection.query(query,
        {
            type: connection.QueryTypes.SELECT,
        })
        .then(dosages => {
            res.json(dosages)
        })
})

/* GET patient by ID. */
router.get('/doctor/:username', function (req, res, next) {
    const patientid = req.params.username
    const query = 'SELECT * FROM Patient WHERE patientid = :username ;'
    connection.query(query,
        {
            type: connection.QueryTypes.SELECT,
            replacements: {
                username: patientid
            }
        })
        .then(user => {
            if (user.length === 1 ) {
                res.json(user[0])
            } else {
                res.status(404).json({})
            }
        })
})

router.get('/doctor/:username/medrec', function (req, res, next) {
    const patientid = req.params.username
    const query = 'SELECT * FROM Patient, Creates_Record WHERE Patient.patientid = :username and Creates_Record.patientid = :username ;'
    connection.query(query,
        {
            type: connection.QueryTypes.SELECT,
            replacements: {
                username: patientid
            }
        })
        .then(records => {
                res.json(records)
        })
})

router.get('/doctor/:username/prescription', function (req, res, next) {
    const patientid = req.params.username
    const query = 'SELECT * FROM Patient, Prescription WHERE Patient.patientid = :username and Prescription.patientid = :username ;'
    connection.query(query,
        {
            type: connection.QueryTypes.SELECT,
            replacements: {
                username: patientid
            }
        })
        .then(prescriptions => {
            res.json(prescriptions)
        })
})

router.get('/doctor/:username/appointment', function (req, res, next) {
    const patientid = req.params.username
    const query = 'SELECT * FROM Patient, Appointments WHERE Patient.patientid = :username and Appointments.patientid = :username ;'
    connection.query(query,
        {
            type: connection.QueryTypes.SELECT,
            replacements: {
                username: patientid
            }
        })
        .then(appointments => {
            res.json(appointments)
        })
})


export default router
