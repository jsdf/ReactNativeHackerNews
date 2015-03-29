var _ = require('underscore')
var {EventEmitter} = require('events')
var urlJoin = require('url-join')

class CollectionStore extends EventEmitter {
  static url() { throw new Error('unimplemented method') }
  static fetch(id) {
    return fetch(urlJoin(this.url(), id))
      .then(response => response.json())
  }
  constructor() {
    this.items = {}
  }
  emitChange() {
    this.emit('change')
  }
  fetch(id) {
    return this.constructor.fetch(id)
      .then((item) => this.set(item))
  }
  set(item) {
    this.items[item.id] = item
    this.emitChange()
    return item
  }
  get(id) {
    return this.items[id]
  }
  all() {
    return _.values(this.items)
  }
  reset(items) {
    this.items = {}
    // items could be an array or object
    _.each(items, (item) => {
      this.set(item)
    })
  }
  toJSON() {
    return this.items
  }
}

module.exports = CollectionStore
