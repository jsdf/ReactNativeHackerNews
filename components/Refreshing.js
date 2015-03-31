var React = require('react-native')
var {
  ActivityIndicatorIOS,
  StyleSheet,
} = React

var View = require('./View')
var Text = require('./Text')

var Refreshing = React.createClass({
  render() {
    return (
      <View style={[styles.container, styles.wrapper]}>
        <View style={[styles.container, styles.loading]}>
          <Text>Refreshing {this.props.children}</Text>
          <ActivityIndicatorIOS />
        </View>
      </View>
    )
  }
})

var styles = StyleSheet.create({
  wrapper: {
    height: 60,
    marginTop: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  loading: {
    height: 60,
  },
})

module.exports = Refreshing
