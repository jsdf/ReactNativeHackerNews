var React = require('react-native')
var {
  ListView,
} = React

var View = require('./View')
var Text = require('./Text')
var Refreshing = require('./Refreshing')


var RefreshableListView = React.createClass({
  getInitialState() {
    return {
      reloading: false,
    }
  },
  handleScroll(e) {
    // must be less than 40 px due to ScrollView bug (event only fires onces)
    // TODO: fix this when onScroll works properly
    if (e.nativeEvent.contentOffset.y < -40) {
      this.reloadData()
    }
    this.props.onScroll && this.props.onScroll(e);
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
