const StartButton = React.createClass({
  render() {
    return (
      <button
        className="start-button"
        onClick={this.onClick}
      >
        {this.props.label}
      </button>
    );
  },

  onClick() {
    if (!this.props.disabled) {
      this.props.startGame();
    }
  }
});

module.exports = StartButton;
