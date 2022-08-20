import {
    hdLoginRequest
} from "./index"
// 获取code
export function getLoginCode() {
    return new Promise((resolve, reject) => {
        wx.login({
            timeout: 1000,
            success: (res) => {
                const code = res.code
                resolve(code)
            },
            fail: reject
        })
    })
}

// 通过code获取token
export function codeToToken(code) {
    return hdLoginRequest.post("/login", {
        code
    }, true)
}

// 判断token是否过期
export function checkToken() {
    return hdLoginRequest.post("/auth", {}, true)
}

export function postFavorRequest(id) {
    return hdLoginRequest.post("/post/favor", {
        id
    }, true)
}

// 判断session是否过期
export function checkSession() {
    return new Promise((resolve, reject) => {
        wx.checkSession({
            success: () => {
                resolve(true)
            },
            fail: () => {
                resolve(false)
            }
        })
    })
}

// 获取用户信息
export function getUserInfo() {
    return new Promise((resolve, reject) => {
        wx.getUserProfile({
            desc: '获取用户信息',
            success: resolve,
            fail: reject
        })
    })
}