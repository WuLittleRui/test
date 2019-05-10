/**
 * @description 操作localStorage
 * @author zhiyuan Liang
 * @since 2016/12/25
 */
const storage = window.sessionStorage
const JSON = window.JSON
import base64 from './base64'
const db = {
  get(name) {
    const decoder = storage.getItem(name)
    if (decoder == null) return null
    let json = decoder
    if (process.env.NODE_ENV === 'production') {
      json = base64.decode(decoder)
    }
    return JSON.parse(json)
  },
  save(name, value) {
    if (value == null) { 
      db.remove(name)
      return
    }
    const json = JSON.stringify(value)
    let decoder = json
    if (process.env.NODE_ENV === 'production') {
      decoder = base64.encode(json)
    }

    return storage.setItem(name, decoder)
  },
  remove(name) {
    return storage.removeItem(name)
  },
  clear() {
    storage.clear()
  }
}

export default db
