var React = require('react-native')
var {
  ActivityIndicatorIOS,
  StyleSheet,
} = React

var View = require('./View')
var Text = require('./Text')

var Loading = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.loading, styles.container]}>
          <Text>Loading {this.props.children}</Text>
          <ActivityIndicatorIOS />
        </View>
      </View>
    )
  }
})

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  loading: {
    margin: 100,
    height: 100,
  },
})

module.exports = Loading
