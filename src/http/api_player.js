import Api from './request'

/**
 * 获取歌曲详情
 * @param {Number} ids
 */
export function getSongDetail(ids) {
  return Api.get('/song/detail', {
    ids
  })
}

/**
 * 获取歌词信息
 * @param {Number} id
 */
export function getSongLyric(id) {
  return Api.get('/lyric', {
    id
  })
}

/**
 * 获取播放接口
 * @param {Number} id
 */
export function getSongUrl(id) {
  return new Promise((resolve, reject) => {
    resolve(`https://music.163.com/song/media/outer/url?id=${id}.mp3`)
  })
}
