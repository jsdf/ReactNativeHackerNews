var _ = require('underscore')
var htmlparser = require('../vendor/htmlparser2')
var entities = require('../vendor/entities')
var React = require('react-native')

var View = require('./View')
var Text = require('./Text')

function logError(err) {
  console && console.error && console.error(err)
}

function domToElement(dom) {
  if (!dom) return <Text />

  return dom.map((node, index) => {
    if (node.type == 'text') {
      return <Text key={index}>{entities.decodeHTML(node.data)}</Text>
    }
    if (node.type == 'tag') {
      if (node.name == 'p') {
        return (
          <Text key={index}>{domToElement(node.children)}{'\n\n'}</Text>
        )
      }
      // TODO: implement i, b, pre
      return <Text key={index}>{domToElement(node.children)}</Text>
    }
})
}

function htmlToElement(rawHtml, done) {
  var handler = new htmlparser.DomHandler(function (err, dom) {
    if (err) done(err)
    done(null, domToElement(dom))
  })
  var parser = new htmlparser.Parser(handler)
  parser.write(rawHtml)
  parser.done()
}

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

      if (err) return logError(err)

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
