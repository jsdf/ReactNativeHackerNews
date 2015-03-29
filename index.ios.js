'use strict'

var React = require('react-native')
var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  Text,
  View,
} = React

var Routes = require('./Routes')

var ReactNativeHackerNews = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={Routes.TopStories()}
      />
    )
  }
})

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})

AppRegistry.registerComponent('ReactNativeHackerNews', () => ReactNativeHackerNews)
