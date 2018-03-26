/* eslint-disable */
import { Router } from 'express'
var connection = require('../configs/sequelize')
const bodyParser = require('body-parser')

const router = Router()

router.get('/patient/appointments/:patientid', function (req, res, next) {
    const patientid = req.params.patientid
    const timeFormat = "YYYY/MM/DD HH24:MI"
    const query = 'SELECT to_char(appointmentdatetime, :timeFormat) appointmentdatetime, duration, doctorname FROM (SELECT * FROM Appointments WHERE patientid = :patientid) a, doctor d WHERE a.doctorid = d.doctorid;'
    connection.query(query, {
        type: connection.QueryTypes.SELECT,
        replacements: {
            patientid: patientid,
            timeFormat: timeFormat
        }
    })
        .then(users => {
            res.json(users)
        })
})

router.post('/patient/makeAppointment/:patientid', bodyParser.json(), function (req, res, next) {
    const patientid = req.params.patientid
    const doctorid = req.body.data.doctorid
    const date = req.body.data.date
    const booktime = req.body.data.booktime
    const datetime = req.body.data.date + ' ' + req.body.data.booktime
    const duration = req.body.data.duration
    const timeFormat = "YYYY/MM/DD HH24:MI"

    const query = 'INSERT INTO Appointments Values (:patientid, :doctorid, TO_TIMESTAMP(:datetime, :timeFormat), :duration)'
    connection.query(query, {
        type: connection.QueryTypes.INSERT,
        replacements: {
            patientid: patientid,
            doctorid: doctorid,
            date: date,
            booktime: booktime,
            datetime: datetime,
            duration: duration,
            timeFormat: timeFormat
        }
    })

})

router.post('/patient/cancelAppointment/:patientid', bodyParser.json(), function (req, res, next) {
    const patientid = req.params.patientid
    const datetime = req.body.data.datetime

    const query = 'DELETE FROM Appointments WHERE patientid = :patientid AND appointmentdatetime = :datetime'
    connection.query(query, {
        type: connection.QueryTypes.DELETE,
        replacements: {
            patientid: patientid,
            datetime: datetime
        }
    })
})

export default router
