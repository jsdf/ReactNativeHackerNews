var _ = require('underscore')
var React = require('react-native')
var {
  ListView,
} = React
var RefreshableListView = require('react-native-refreshable-listview')

var Routes = require('../Routes')
var TopStory = require('../stores/TopStory')
var View = require('./View')
var Text = require('./Text')
var StoreWatchMixin = require('./StoreWatchMixin')
var StoryListItem = require('./StoryListItem')
var Loading = require('./Loading')

var baseDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id})

var TopStoriesScreen = React.createClass({
  mixins: [
    StoreWatchMixin,
  ],
  getInitialState() {
    return {
      dataSource: baseDataSource.cloneWithRows(this.getTopStories()),
    }
  },
  componentDidMount() {
    var topStories = this.getTopStories()
    if (!(topStories && topStories.length)) this.loadTopStories()
  },
  getStoreWatches() {
    this.watchStore(TopStory, _.debounce(() => {
      if (this.isMounted()) {
        this.setState({dataSource: baseDataSource.cloneWithRows(this.getTopStories())})
      }
    }, 100))
  },
  loadTopStories() {
    return TopStory.fetch()
  },
  getTopStories() {
    return TopStory.ordered()
  },
  gotoComments(story) {
    this.props.navigator.push(Routes.Comments(story))
  },
  gotoArticle(story) {
    this.props.navigator.push(Routes.Article(story))
  },
  renderStory(story) {
    return (
      <StoryListItem
        story={story}
        onSelectComments={this.gotoComments}
        onSelectArticle={this.gotoArticle}
      />
    )
  },
  renderStoriesListView() {
    if (this.state.dataSource.getRowCount() === 0) {
      return (
        <Loading>top stories</Loading>
      )
    } else {
      return (
        <RefreshableListView
          dataSource={this.state.dataSource}
          renderRow={this.renderStory}
          loadData={this.loadTopStories}
          refreshDescription="Refreshing top stories"
        />
      )
    }
  },
  render() {
    return this.renderStoriesListView()
  }
})

module.exports = TopStoriesScreen
