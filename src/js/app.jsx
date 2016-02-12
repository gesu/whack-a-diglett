const Board = require('./components/board');
const Score = require('./components/score');
const StartScreen = require('./components/start-screen');
const EndScreen = require('./components/end-screen');
const Timer = require('./components/timer');

// Game constants
const TICK_RATE = 100;
const GAME_DURATION = 10000;
const NUM_TILES = 12;
const NUM_TILES_LARGE = 16;
const SMALL_SCREEN_WIDTH = 768;
const DIGLETT_MAX_TIME = 900;
const DIGLETT_REFRESH_FREQUENCY = 2000;
const DIGLETT_SPAWN_FREQUENCY = 0.02;

const App = React.createClass({
  getInitialState() {
    return {};
  },

  render() {
    let screen;
    if (this.state.end) {
      screen = <EndScreen
        score={this.state.score}
        startGame={this.startGame}
      />
    } else if (this.state.running) {
      screen = <div>
        <Score
          score={this.state.score}
        />

        <Timer
          time={this.state.time}
        />

        <Board
          tiles={this.state.tiles}
          updateScore={this.updateScore}
          difficulty={0.01}
        />
      </div>
    } else {
      screen = <StartScreen
        disabled={this.state.running}
        startGame={this.startGame}
      />;
    }

    return (
      <div className="app">

        {screen}

      </div>
    );
  },

  setDiglettTimer() {
    return (Math.random() - (1 - DIGLETT_SPAWN_FREQUENCY)) > 0 ? DIGLETT_MAX_TIME : 0;
  },

  generateTiles() {
    let numTiles = NUM_TILES;
    if (this.props.width > SMALL_SCREEN_WIDTH) {
      numTiles = NUM_TILES_LARGE;
    }

    let tiles = [];

    for (let i = 0; i < numTiles; i++) {
      tiles.push({
        id: `${i}`,
        diglettTimer: this.setDiglettTimer(),
        clicked: false
      });
    }

    return tiles;
  },

  startGame() {
    this.setState({
      score: 0,
      running: true,
      end: false,
      time: GAME_DURATION,
      tiles: this.generateTiles()
    }, this.tick);
  },

  endGame() {
    this.setState({
      running: false,
      end: true
    });
  },

  updateScore(id) {
    if (this.state.running) {
      let tiles = this.state.tiles;
      tiles[id].clicked = true;

      this.setState({
        score: this.state.score + 1,
        tiles: tiles
      });
    }
  },

  tick() {
    if (this.state.time > 0) {
      setTimeout(function() {
        let nextTiles = this.state.tiles.map(function(tile) {
          if (tile.diglettTimer > 0) {
            let nextTime = tile.diglettTimer - TICK_RATE;

            return {
              id: tile.id,
              diglettTimer: nextTime,
              clicked: tile.clicked
            }
          } else {
            let nextTime;
            if (this.state.time % DIGLETT_REFRESH_FREQUENCY) {
              nextTime = this.setDiglettTimer();
            }

            return {
              id: tile.id,
              diglettTimer: nextTime,
              clicked: false
            }
          }
        }.bind(this));

        this.setState({
          time: this.state.time - TICK_RATE,
          tiles: nextTiles
        });

        this.tick();
      }.bind(this), TICK_RATE);
    } else {
      this.endGame();
    }
  }
});

document.addEventListener("DOMContentLoaded", function(event) {
  let mount = document.getElementById('app-mount');

  ReactDOM.render(<App width={mount.offsetWidth} />, mount);
});
