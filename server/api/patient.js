/* eslint-disable */
import { Router } from 'express'
var connection = require('../configs/sequelize')
const bodyParser = require('body-parser')

const router = Router()

/* GET prescription listing. */
router.get('/patient/prescription', function (req, res, next) {
    const query = 'SELECT * FROM prescription;'
    connection.query(query, { type: connection.QueryTypes.SELECT })
        .then(prescriptions => {
            console.log(prescriptions)
            res.json(prescriptions)
        })
})

/* GET referrals listing. */
router.get('/patient/referral', function (req, res, next) {
    let referralQueryPromise = connection.query('SELECT * FROM referrals',{ type: connection.QueryTypes.SELECT })
    const queryDoctorPromise = connection.query('SELECT * FROM doctor',{ type: connection.QueryTypes.SELECT })
    Promise.all([referralQueryPromise,queryDoctorPromise]).then((result) => {
        var doctorMap = {}

        for (var doctor of result[1]){
            var id = doctor.doctorid
            doctorMap[id] = doctor;
        }

        for (var referral of result[0]) {
            referral.referredBy = doctorMap[referral.doctorid].doctorname
            referral.referredTo = doctorMap[referral.referraldoctorid].doctorname
        }
        res.json({referrals: result[0]})
    })
})

export default router
