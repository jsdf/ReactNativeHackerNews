var React = require('react-native')
var {
  View,
  Text,
  StyleSheet,
} = React

var Badge = React.createClass({
  render() {
    return (
      <View style={styles.badge}>
        <Text style={styles.badgeText} children={this.props.children} />
      </View>
    )
  }
})

var styles = StyleSheet.create({
  badge: {
    margin: 0,
    padding: 0,
    backgroundColor: '#dddddd',
    borderColor: '#dddddd',
    borderRadius: 10,
    borderWidth: 4,
  },
  badgeText: {
    margin: 0,
    padding: 0,
    fontSize: 9,
    backgroundColor: '#dddddd',
  },
})

module.exports = Badge
