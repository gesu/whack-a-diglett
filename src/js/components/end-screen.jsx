const StartButton = require('./start-button');
const Diglett = require('./diglett');

const StartScreen = React.createClass({
  render() {
    return (
      <div className="start-screen">
        <h1>Final Score: {this.props.score}</h1>

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

module.exports = StartScreen;
