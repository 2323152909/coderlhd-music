export default {
  namespace: 'main',
  state: {
    count: 0
  },
  actions: {
    updateState: ({ payload, callback }, { setState }) => {
      setState({ ...payload })

      if (callback) {
        callback()
      }
    }
  }
}
