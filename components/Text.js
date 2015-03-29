var React = require('react-native')

var Text = React.createClass({
  setNativeProps() {
    var {text} = this.refs
    text.setNativeProps.apply(text, arguments)
  },
  render() {
    return (
      <React.Text
        {...this.props}
        ref="text"
        style={[styles.text].concat(this.props.style || [])}
      />
    )
  }
})

var styles = React.StyleSheet.create({
  text: {
  },
})

module.exports = Text
