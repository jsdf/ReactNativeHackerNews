var React = require('react-native')
var {
  ListView,
} = React

var View = require('./View')
var Text = require('./Text')
var Refreshing = require('./Refreshing')

// must be less than ~50px due to ScrollView bug (event only fires once)
// https://github.com/facebook/react-native/pull/452
// TODO: expose as a prop when onScroll works properly
var PULLDOWN_DISTANCE = 40 // pixels

var RefreshableListView = React.createClass({
  getInitialState() {
    return {
      reloading: false,
    }
  },
  handleScroll(e) {
    if (e.nativeEvent.contentOffset.y < -PULLDOWN_DISTANCE) {
      this.reloadData()
    }
    this.props.onScroll && this.props.onScroll(e)
  },
  reloadData() {
    if (this.willReload || this.state.reloading) return

    this.willReload = true
    Promise.all([
      this.props.loadData(),
      new Promise((resolve) => this.setState({reloading: true}, resolve)),
      new Promise((resolve) => setTimeout(resolve, 300)),
    ]).then(([data]) => {
      this.willReload = false
      this.setState({reloading: false})
    })
  },
  renderHeader() {
    if (this.state.reloading) {
      return (
        <View>
          <Refreshing>
            {this.props.refreshDescription}
          </Refreshing>
        </View>
      )
    } else {
      return null
    }
  },
  render() {
    return (
      <ListView
        {...this.props}
        onScroll={this.handleScroll}
        renderHeader={this.renderHeader}
      />
    )
  }
})

module.exports = RefreshableListView
