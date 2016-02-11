const Score = React.createClass({
  render() {
    return (
      <div className="score">
        Digletts Whacked: {this.props.score}
      </div>
    );
  }
});

module.exports = Score;
