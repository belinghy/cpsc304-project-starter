/* eslint-disable */
import { Router } from 'express'
var connection = require('../configs/sequelize')
const bodyParser = require('body-parser')

const router = Router()

/* GET user by ID. */
router.get('/patient/appointments/:patientid', function (req, res, next) {
    const patientid = req.params.patientid
    const query = 'SELECT appointmentdatetime, duration, doctorname FROM (SELECT * FROM Appointments WHERE patientid = :patientid) a, doctor d WHERE a.doctorid = d.doctorid;'
    connection.query(query, {
        type: connection.QueryTypes.SELECT,
        replacements: {
            patientid: patientid
        }
    })
        .then(users => {
            console.log(users)
            res.json(users)
        })
})

router.post('/patient/makeAppointment/:patientid', bodyParser.json(), function (req, res, next) {
    const patientid = req.params.patientid
    const doctorname = req.body.data.doctorname
    const date = req.body.data.date
    const booktime = req.body.data.booktime
    const datetime = req.body.data.date + ' ' + req.body.data.booktime
    const duration = req.body.data.duration

    const query = 'INSERT INTO Appointments Values (:patientid, :doctorname, :datetime, :duration)'
    connection.query(query, {
        type: connection.QueryTypes.INSERT,
        replacements: {
            patientid: patientid,
            doctorname: doctorname,
            date: date,
            booktime: booktime,
            datetime: datetime,
            duration: duration
        }
    })
        .then(result => {
            res.send('/patient')
        })

})

export default router
