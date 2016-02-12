const StartButton = require('./start-button');
const Diglett = require('./diglett');

const StartScreen = React.createClass({
  render() {
    return (
      <div className="start-screen">
        <h1>Whack-a-Diglett v1.0</h1>

        <Diglett clicked={false} />
        <Diglett clicked={true} />
        <Diglett clicked={false} />

        <StartButton
          disabled={this.props.disabled}
          startGame={this.props.startGame}
          label={'Start Game'}
        />
      </div>
    );
  }
});

module.exports = StartScreen;
