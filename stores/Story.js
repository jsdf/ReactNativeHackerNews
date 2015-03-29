var urlJoin = require('url-join')
var CollectionStore = require('./Collection')
var config = require('../config')

const API_PATH = urlJoin(config.apiHost, '/item')

class StoryStore extends CollectionStore {
  static url() { return API_PATH }
}

module.exports = new StoryStore