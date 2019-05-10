/**
 * @description 是否开发模式
 */
const IS_DEV = process.env.NODE_ENV !== 'production'

/**
 * @description 接口地址
 */
//export const BASE_URL = 'https://sh-saas.yvqin.cn'



// export const BASE_URL = 'http://192.168.109.189:9003'

// export const BASE_URL = 'http://mz.gzkny.com'


export const BASE_URL = 'http://mz.gzkny.com'
// export const BASE_URL = 'http://127.0.0.1:9003'
export const IMAGES_URL = 'https://res.yvqin.cn/hospital_teeth'

export const UPLOADURL = 'http://www.gzkny.com/h5/'

/**
 * @description 客户端id
 */
export const CLIENT_ID = IS_DEV ? '100008' : '100008'

/**
 * @description 客户端密钥
 */
export const CLIENT_SECRECT = IS_DEV ? 'oBAeJKw36sG6ozStfNkhttHrwrVG6L7tYRN55T2T5qKsEhlmCcgzHRcYhhWfJyNP' : 'oBAeJKw36sG6ozStfNkhttHrwrVG6L7tYRN55T2T5qKsEhlmCcgzHRcYhhWfJyNP'