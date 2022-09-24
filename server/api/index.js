const express = require('express')
const router = express()

const document = require('./document')
router.use('/document', document)

module.exports = router
