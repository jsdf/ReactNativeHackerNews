var _ = require('underscore')
var moment = require('moment')
var React = require('react-native')
var {
  ListView,
  StyleSheet,
} = React

var Story = require('../stores/Story')
var Routes = require('../Routes')
var StoreWatchMixin = require('./StoreWatchMixin')
var View = require('./View')
var Text = require('./Text')
var Badge = require('./Badge')
var Loading = require('./Loading')
var Comment = require('./Comment')

var baseDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id})

var CommentsScreen = React.createClass({
  mixins: [
    StoreWatchMixin,
  ],
  getInitialState() {
    return {
      dataSource: baseDataSource.cloneWithRows(this.getComments() || []),
    }
  },
  componentDidMount() {
    this.loadStory()
  },
  getStoreWatches() {
    this.watchStore(Story, _.debounce(() => {
      if (this.isMounted()) {
        this.setState({
          dataSource: baseDataSource.cloneWithRows(this.getComments() || []),
        })
      }
    }, 100))
  },
  loadStory() {
    if (!this.getStory()) Story.fetch(this.props.storyId)
  },
  getStory() {
    return Story.get(this.props.storyId)
  },
  getComments() {
    var story = this.getStory()
    return story && story.childItems || null
  },
  isLoaded() {
    return this.getComments() != null
  },
  renderCommentsHeader() {
    return (<Text>showing {this.getComments().length} comments</Text>)
  },
  renderComment(comment) {
    return <Comment comment={comment} />
  },
  render() {
    if (!this.isLoaded()) {
      return <Loading>comments</Loading>
    } else {
      return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderComment}
        />
      )
    }
  }
})

var styles = StyleSheet.create({
})

module.exports = CommentsScreen
