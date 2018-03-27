/* eslint-disable */
import { Router } from 'express'
var connection = require('../configs/sequelize')
const bodyParser = require('body-parser')

const router = Router()

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


export default router
