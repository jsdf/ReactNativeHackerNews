var moment = require('moment')
var React = require('react-native')
var {
  TouchableHighlight,
  StyleSheet,
  Image,
} = React

var View = require('./View')
var Text = require('./Text')


function htmlToElement(id, html) {
  var htmlparser = require("htmlparser2")
  var parser = new htmlparser.Parser({
      onopentag: function(name, attribs){
          if(name === "script" && attribs.type === "text/javascript"){
              console.log("JS! Hooray!")
          }
      },
      ontext: function(text){
          console.log("-->", text)
      },
      onclosetag: function(tagname){
          if(tagname === "script"){
              console.log("That's it?!")
          }
      }
  })
  parser.write("Xyz <script type='text/javascript'>var foo = '<<bar>>'</ script>")
  parser.end()
}

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
    var text = (comment.text||'').split('<p>').join('\n\n')
    return (
      <View>
        <Text style={styles.commentText}>{text}</Text>
        {comment.childItems ? <CommentList comments={comment.childItems} /> : null}
      </View>
    )
  },
  render() {
    var {comment} = this.props
    var {open} = this.state

    if (comment == null) return null

    return (
      <TouchableHighlight onPress={this.handleDisclosureClick} underlayColor="white">
        <View style={styles.comment}>
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
          {open ? this.renderBody(comment) : null}
        </View>
      </TouchableHighlight>
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
    color: '#BBBBBB'
  },
  comment: {
    margin: 4,
    padding: 4,
  },
  disclosure: {
    width: 16,
    height: 16,
  },
  disclosureRow: {
    paddingTop: 4,
    paddingBottom: 4,
  },
})

module.exports = Comment
