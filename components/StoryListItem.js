var moment = require('moment')
var React = require('react-native')
var {
  Image,
  PixelRatio,
  StyleSheet,
  TouchableHighlight
} = React

var View = require('./View')
var Text = require('./Text')
var Badge = require('./Badge')

var StoryListItem = React.createClass({
  handleSelectArticle() {
    this.props.onSelectArticle(this.props.story)
  },
  handleSelectComments() {
    this.props.onSelectComments(this.props.story)
  },
  renderTitle(story) {
    return (
      <Text style={styles.storyTitle} numberOfLines={2}>
        {story.position}. {story.title}
      </Text>
    )
  },
  renderByline(story) {
    return (
      <View style={[styles.row, styles.byline]}>
        <Badge>{story.score} points</Badge>
        <View>
          <Text style={styles.storyTime} numberOfLines={1}>
            {' '}
            submitted {moment(story.time*1000).fromNow()} by {story.by}
          </Text>
        </View>
      </View>
    )
  },
  renderArticleButton() {
    var {story} = this.props

    return (
      <View style={styles.textContainer}>
        <TouchableHighlight onPress={this.handleSelectArticle}>
          <View style={styles.storyCell}>
            {this.renderTitle(story)}
            {this.renderByline(story)}
          </View>
        </TouchableHighlight>
      </View>
    )
  },
  renderCommentsButton() {
    var {story} = this.props

    return (
      <TouchableHighlight onPress={this.handleSelectComments} underlayColor="white">
        <View style={styles.commentsCell}>
          <Image
            style={styles.icon}
            source={require('image!comment')}
          />
          <Text style={styles.commentsText}>{story.descendants} comments</Text>
        </View>
      </TouchableHighlight>
    )
  },
  render() {
    return (
      <View style={styles.white}>
        <View style={[styles.row, styles.itemRow]}>
          {this.renderArticleButton()}
          {this.renderCommentsButton()}
        </View>
        <View style={styles.cellBorder} />
      </View>
    )
  }
})

var cellPadding = 8

var styles = StyleSheet.create({
  white: {
    backgroundColor: 'white',
  },
  textContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  icon: {
    width: 32,
    height: 32,
  },
  storyCell: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    padding: cellPadding,
  },
  storyTitle: {
    height: 44,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  storyTime: {
    color: '#999999',
    fontSize: 12,
  },
  row: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  itemRow: {
    height: 80,
    alignItems: 'stretch',
    backgroundColor: 'white',
  },
  byline: {
    padding: 0,
  },
  commentsCell: {
    marginLeft: 10,
    padding: cellPadding,
    width: 80,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  commentsText: {
    fontSize: 10,
    textAlign: 'center',
  },
  cellBorder: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    // Trick to get the thinest line the device can display
    height: 1 / PixelRatio.get(),
    marginLeft: 4,
  },
})

module.exports = StoryListItem
