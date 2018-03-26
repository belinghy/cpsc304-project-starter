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


export default router
