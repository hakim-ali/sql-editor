const {Router} = require('express')

const {
  getDocuments,
  getDocumentDataByFile
} = require('./document')

const router = Router()


router.get('/get', getDocuments)
router.get('/data/:file', getDocumentDataByFile)

module.exports = router
