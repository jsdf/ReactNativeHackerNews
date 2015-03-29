var StoreWatchMixin = {
  watchStore(store, handler) {
    this.storeWatches = this.storeWatches || new Map
    this.storeWatches.set(store, handler || this.defaultStoreWatchHandler)
  },
  componentDidMount() {
    if (typeof this.getStoreWatches != 'function') return
    this.getStoreWatches()

    if (!this.storeWatches) return
    for (var watch of this.storeWatches) {
      var [store, handler] = watch
      store.addListener('change', handler)
    }
  },
  componentWillUnmount() {
    if (!this.storeWatches) return
    for (var watch of this.storeWatches) {
      var [store, handler] = watch
      store.removeListener('change', handler)
    }
  },
  defaultStoreWatchHandler() {
    if (this.isMounted()) {
      this.forceUpdate()
    }
  },
}

module.exports = StoreWatchMixin
