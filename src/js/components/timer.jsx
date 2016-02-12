const Timer = React.createClass({
  render() {
    return (
      <div className="timer">
        Time Left: {(this.props.time / 1000).toFixed(1)}s
      </div>
    );
  }
});

module.exports = Timer;
