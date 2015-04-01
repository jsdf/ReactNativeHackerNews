var moment = require('moment')
var React = require('react-native')
var {
  TouchableHighlight,
  StyleSheet,
  Image,
  PixelRatio,
} = React
var HTMLView = require('react-native-htmlview')

var View = require('./View')
var Text = require('./Text')
var colors = require('./colors')

var Comment = React.createClass({
  getInitialState() {
    return {
      open: true,
    }
  },
  handleDisclosureClick(e) {
    this.setState({open: !this.state.open})
  },
  renderBody(comment) {
    return (
      <View style={styles.commentBody}>
        <HTMLView value={comment.text} />
        {comment.childItems ? <CommentList comments={comment.childItems} /> : null}
      </View>
    )
  },
  render() {
    var {comment} = this.props
    var {open} = this.state

    if (comment == null) return null

    return (
      <View style={styles.comment}>
        <TouchableHighlight onPress={this.handleDisclosureClick} underlayColor="white">
          <View style={[styles.disclosureRow, styles.inline]}>
            <Image
              source={open ? require('image!disclosure90') : require('image!disclosure')}
              style={[styles.disclosure, styles.muted]}
            />
            <Text style={styles.muted}>
              {' '}
              {moment(comment.time*1000).fromNow()} by {comment.by}
            </Text>
          </View>
        </TouchableHighlight>
        {open ? this.renderBody(comment) : null}
      </View>
    )
  }
})

var CommentList = React.createClass({
  renderComment(comment) {
    return <Comment key={comment.id} comment={comment} />
  },
  render() {
    return (
      <View>
        {this.props.comments.map(this.renderComment)}
      </View>
    )
  }
})

var styles = StyleSheet.create({
  inline: {
    flexDirection: 'row',
  },
  muted: {
    opacity: 0.3,
  },
  textMuted: {
    color: colors.grey
  },
  comment: {
    margin: 4,
    padding: 4,
  },
  commentBody: {
    paddingLeft: 10,
    borderLeftColor: colors.grey,
    borderLeftWidth: 1 / PixelRatio.get(),
  },
  disclosure: {
    width: 14,
    height: 14,
    marginLeft: 2,
    marginRight: 8,
  },
  disclosureRow: {
    paddingLeft: 0,
    paddingTop: 4,
    paddingBottom: 4,
  },
})

module.exports = Comment
