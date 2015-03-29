var React = require('react-native')

var View = React.createClass({
  setNativeProps() {
    var {view} = this.refs
    view.setNativeProps.apply(view, arguments)
  },
  render() {
    return (
      <React.View
        {...this.props}
        ref="view"
        style={[styles.view].concat(this.props.style || [])}
      />
    )
  }
})

var styles = React.StyleSheet.create({
  view: {
    backgroundColor: 'white',
  },
})

module.exports = View
