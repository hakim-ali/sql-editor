import {onMounted, ref} from '@nuxtjs/composition-api'
import InternalApi from '@/services/internalApi'

export const useDocuments = () => {
  const files = ref([])

  const getFiles = () => {
    return new Promise((resolve, reject) => {
      InternalApi.get('document/get')
        .then((body) => {
          resolve(body)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  const getFileData = (fileName) => {
    return new Promise((resolve, reject) => {
      InternalApi.get(`document/data/${fileName}`)
        .then((body) => {
          const {data} = body
          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  onMounted(async () => {
    const meta = await getFiles()
    files.value = meta.data.map((item, index) => {
      return {
        id: index,
        name: item.file,
        children: item.columns.map((column, columnIndex) => {
          return {
            id: column + columnIndex,
            name: column
          }
        })
      }
    })

  })

  return {files, getFileData}
}
