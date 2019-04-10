export function validPhone(str) {
    const reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/
    return reg.test(str)
}

export function validbuerd(str) {
    const reg = /^[0-9]*$/
    return reg.test(str)
}
