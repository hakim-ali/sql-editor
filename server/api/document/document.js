const path = require('path')
const AttachmentService = require('../../services/AttachmentService')

const getDocuments = async (req, res) => {
  const dir = path.join(process.cwd(), 'data', 'csv')
  const files = await AttachmentService.getAllDocuments(dir)
  const data = []
  for (const item of files) {
    const fileUrl = path.join(dir, item)
    const columns = await AttachmentService.getFileColumns(fileUrl)
    data.push({
      file: item,
      columns
    })
  }
  return res.json({data})
}

const getDocumentDataByFile = async (req, res) => {
  const file = req.params.file
  const fileUrl = path.join(process.cwd(), 'data', 'csv', file)
  const data = await AttachmentService.getFileData(fileUrl)
  return res.json({data})
}


module.exports = {
  getDocuments,
  getDocumentDataByFile
}
