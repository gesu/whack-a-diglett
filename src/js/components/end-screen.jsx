const StartButton = require('./start-button');
const Diglett = require('./diglett');

const EndScreen = React.createClass({
  render() {
    return (
      <div className="start-screen">
        <h1>Final Score: {this.props.score}</h1>

        { this.props.newHighScore ?
          <div className="new-high-score">
            NEW HIGH SCORE!
          </div>
          : null
        }

        <Diglett clicked={true} />
        <Diglett clicked={true} />
        <Diglett clicked={true} />

        <StartButton
          disabled={this.props.disabled}
          startGame={this.props.startGame}
          label={'Play Again!'}
        />
      </div>
    );
  }
});

module.exports = EndScreen;
