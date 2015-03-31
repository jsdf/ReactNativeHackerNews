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
        <View style={[styles.loading]}>
          <Text>Loading {this.props.children}</Text>
          <ActivityIndicatorIOS style={{alignSelf: 'center'}} />
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
    justifyContent: 'space-around',
    margin: 50,
    height: 100,
  },
})

module.exports = Loading
