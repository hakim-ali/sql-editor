const fs = require('fs')
const csv = require('csv-parser')

class AttachmentService {
  static getAllDocuments(dir) {
    return new Promise((resolve, reject) => {
      fs.readdir(dir, (err, files) => {
        if (err) {
          reject(err)
        } else {
          resolve(files)
        }
      })
    })
  }

  static getFileColumns(file) {
    return new Promise((resolve, reject) => {
      fs.createReadStream(file)
        .pipe(csv())
        .on('headers', (headers) => {
          resolve(headers)
        })
    })
  }

  static getFileData(file) {
    return new Promise((resolve, reject) => {
      const results = [];
      fs.createReadStream(file)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
          resolve(results)
        });
    })
  }
}

module.exports = AttachmentService
