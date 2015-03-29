var moment = require('moment')
var React = require('react-native')
var {
  WebView,
  ScrollView,
  StyleSheet,
} = React

var Routes = require('../Routes')
var View = require('./View')
var Text = require('./Text')
var Loading = require('./Loading')

var ArticleScreen = React.createClass({
  renderError(domain, code, description) {
    return <Text>error :( - {description}</Text>
  },
  renderLoading() {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Loading>article</Loading>
      </ScrollView>
    )
  },
  render() {
    return (
      <WebView
        url={this.props.url}
        renderError={this.renderError}
        renderLoading={this.renderError}
      />
    )
  }
})

var styles = StyleSheet.create({
  contentContainer: {
    padding: 10,
  },
})

module.exports = ArticleScreen
