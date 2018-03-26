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

export default router
