var _ = require('underscore')
var htmlparser = require('../vendor/htmlparser2')
var entities = require('../vendor/entities')
var React = require('react-native')
var {
  LinkingIOS,
  StyleSheet,
} = React

var View = require('./View')
var Text = require('./Text')
var colors = require('./colors')

var PARAGRAPH_BREAK = '\n\n'

function htmlToElement(rawHtml, done) {
  var handler = new htmlparser.DomHandler(function (err, dom) {
    if (err) done(err)
    done(null, domToElement(dom))
  })
  var parser = new htmlparser.Parser(handler)
  parser.write(rawHtml)
  parser.done()
}

function domToElement(dom, parent) {
  if (!dom) return null

  return dom.map((node, index, list) => {
    if (node.type == 'text') {
      return (
        <Text key={index} style={parent ? styles[parent.name] : null}>
          {entities.decodeHTML(node.data)}
        </Text>
      )
    }
    if (node.type == 'tag') {
      var touchHandler = null
      if (node.name == 'a' && node.attribs && node.attribs.href) {
        touchHandler = () => LinkingIOS.openURL(entities.decodeHTML(node.attribs.href))
      }

      return (
        <Text key={index} onPress={touchHandler}>
          {domToElement(node.children, node)}
          {node.name == 'p' && index < list.length-1 ? PARAGRAPH_BREAK : null}
        </Text>
      )
    }
  })
}

var boldStyle = {fontWeight: '500'}
var italicStyle = {fontStyle: 'italic'}
var codeStyle = {fontFamily: 'Menlo'}

var styles = StyleSheet.create({
  b: boldStyle,
  strong: boldStyle,
  i: italicStyle,
  em: italicStyle,
  pre: codeStyle,
  code: codeStyle,
  a: {
    fontWeight: '500',
    color: colors.blue,
  },
})

var HTML = React.createClass({
  mixins: [
    React.addons.PureRenderMixin,
  ],
  getInitialState() {
    return {
      element: null,
    }
  },
  componentWillReceiveProps() {
    if (this.state.element) return
    this.startHtmlRender()
  },
  componentDidMount() {
    this.startHtmlRender()
  },
  startHtmlRender() {
    if (!this.props.value) return
    if (this.renderingHtml) return

    this.renderingHtml = true
    htmlToElement(this.props.value, (err, element) => {
      this.renderingHtml = false

      if (err) return console.error(err)

      if (this.isMounted()) this.setState({element})
    })
  },
  render() {
    if (this.state.element) {
      return <Text children={this.state.element} />
    }
    return <Text />
  }
})

module.exports = HTML
