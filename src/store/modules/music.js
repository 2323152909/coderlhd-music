import Taro from '@tarojs/taro'
import produce from 'immer'

export const innerAudioContext = Taro.createInnerAudioContext()

export default {
  namespace: 'music',
  state: {
    isFirstPlay: true,
    isStoping: false,

    id: 0,

    currentSong: {}, //当前歌曲
    durationTime: 0, //总时长
    lyricInfos: [], //歌词信息

    currentTime: 0, //当前播放时间
    currentLyricIndex: 0, //当前歌词索引
    currentLyricText: '', //当前歌词

    isPlaying: false, //是否正在播放
    playModeIndex: 0, //0：循环播放 1：单曲循环 2：随机播放
    playListSongs: [], //歌曲列表
    playListIndex: 0 //当前歌曲索引
  },
  actions: {
    playMusicWithSongIdAction(
      { payload, callback },
      { setState, select, dispatch }
    ) {
      const { id, isRefresh = false } = payload
      // 获取当前命名空间state
      const ctx = select()

      // 如果两次id相同并且不需要强制刷新，不会重新请求
      if (ctx.id === id && !isRefresh) {
        dispatch({ type: 'music/operationPlayAction', isPlaying: true })
        return
      }

      const newState = produce(ctx, (draft) => {
        draft.id = id

        // 0.切换歌曲修改播放的状态为初始
        draft.isPlaying = true
        draft.currentSong = {}
        draft.durationTime = 0
        draft.lyricInfos = []
        draft.currentTime = 0
        draft.currentLyricIndex = 0
        draft.currentLyricText = ''
      })

      setState(newState)

      // 1.根据id请求数据
      // 获取歌曲详情
      getSongDetail(id).then((res) => {
        setState({
          currentSong: res.songs[0],
          durationTime: res.songs[0].dt
        })
        audioContext.title = res.songs[0].name
      })
      // 获取歌词信息
      getSongLyric(id).then((res) => {
        const lyricString = res.lrc.lyric
        const lyricInfos = parseLyric(lyricString)
        setState({
          lyricInfos
        })
      })

      // 2.播放对应id的歌曲
      audioContext.stop()
      audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
      audioContext.autoplay = true
      audioContext.title = id

      // 3.监听audioContext一些事件
      if (ctx.isFirstPlay) {
        dispatch({ type: 'setupAudioContextListenerAction' })

        setState({ isFirstPlay: false })
      }

      if (callback) {
        callback()
      }
    },
    setupAudioContextListenerAction(
      { callback },
      { setState, select, dispatch }
    ) {
      // 获取当前命名空间state
      const ctx = select()

      // 1.监听歌曲可以播放
      audioContext.onCanplay(() => {
        // 如果点击了暂停，则不会由于拖动进度条从新开始播放
        if (!ctx.isPlaying) return
        audioContext.play()
      })
      // 2.监听时间的改变
      audioContext.onTimeUpdate(() => {
        // 1.获取当前时间
        const currentTime = audioContext.currentTime * 1000
        // 2.根据当前时间修改currentTime
        ctx.currentTime = currentTime
        // 3.根据当前时间去查找播放的歌词
        let i = 0
        const lyricInfos = ctx.lyricInfos
        for (; i < lyricInfos.length; i++) {
          const lyricInfo = lyricInfos[i]
          if (lyricInfo.time > currentTime) {
            break
          }
        }
        // 设置当前歌词的索引和内容
        const currentLyricIndex = i - 1
        if (ctx.currentLyricIndex !== i - 1) {
          setState({
            currentLyricText: lyricInfos[i - 1]?.text,
            currentLyricIndex
          })
        }
      })
      // 3.监听歌曲播放完成
      audioContext.onEnded(() => {
        dispatch({ type: 'changeNewMusicAction' })
      })

      // 4.监听音乐暂停/播放
      // 播放状态
      audioContext.onPlay(() => {
        setState({ isPlaying: true })
      })
      // 暂停状态
      audioContext.onPause(() => {
        setState({ isPlaying: false })
      })

      // 5.监听音乐停止播放
      audioContext.onStop(() => {
        setState({ isPlaying: false, isStoping: true })
      })

      if (callback) {
        callback()
      }
    },
    // 切换播放状态
    operationPlayAction({ payload, callback }, { setState, select }) {
      const { isPlaying = true } = payload
      // 获取当前命名空间state
      const ctx = select()

      setState({ isPlaying })

      if (ctx.isPlaying && ctx.isStoping) {
        audioContext.src = `https://music.163.com/song/media/outer/url?id=${ctx.id}.mp3`
        audioContext.title = ctx.currentSong.name
        audioContext.startTime = ctx.currentTime
        setState({ isStoping: false })
      }
      // 如果正在播放则进行暂停，否则就播放
      ctx.isPlaying ? audioContext.play() : audioContext.pause()

      if (callback) {
        callback()
      }
    },
    // 切换模式
    operationModeAction({ payload, callback }, { setState }) {
      const { playModeIndex } = payload

      setState({ playModeIndex })

      if (callback) {
        callback()
      }
    },
    changeNewMusicAction(
      { payload, callback },
      { setState, select, dispatch }
    ) {
      const { isNext = true } = payload
      const ctx = select()

      // 1.获取当前索引
      let index = ctx.playListIndex
      // 2.根据不同的播放模式，获取下一首个的索引
      switch (ctx.playModeIndex) {
        case 0: //顺序
          index = isNext ? index + 1 : index - 1
          if (index < 0) index = ctx.playListSongs.length - 1
          if (index === ctx.playListSongs.length) index = 0
          break
        case 1: //单曲
          break
        case 2: //随机播放
          index = Math.floor(Math.random() * ctx.playListSongs.length)
          break
      }

      // 3.获取歌曲
      let currentSong = ctx.playListSongs[index]
      if (!currentSong) {
        currentSong = ctx.currentSong
      } else {
        // 记录当前索引
        setState({ playListIndex: index })
      }

      // 4.播放新的歌曲
      dispatch({
        type: 'music/playMusicWithSongIdAction',
        payload: {
          id: currentSong.id,
          isRefresh: true
        }
      })

      if (callback) {
        callback()
      }
    }
  }
}
