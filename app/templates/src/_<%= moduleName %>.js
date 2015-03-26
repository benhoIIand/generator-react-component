var React = require('react/addons');

var <%= moduleName %> = React.createClass({
  getInitialState: function() {
    return { isChecked: false };
  },
  onChange: function() {
    this.setState({isChecked: !this.state.isChecked});
  },
  render: function() {
    return (
      <h1><%= moduleName %></h1>
    );
  }
});

module.exports = <%= moduleName %>;
