const Board = require('./components/board');
const Score = require('./components/score');
const StartButton = require('./components/start-button');
const Timer = require('./components/timer');

const App = React.createClass({
  getInitialState() {
    return {};
  },

  render() {
    let startButton;
    if (!this.state.running) {
      startButton = <StartButton
        disabled={this.state.running}
        startGame={this.startGame}
      />;
    }

    return (
      <div className="app">
        <Score
          score={this.state.score}
        />

        <Timer
          time={this.state.time}
        />

        {startButton}

        <Board
          tiles={this.state.tiles}
          updateScore={this.updateScore}
          difficulty={0.01}
        />
      </div>
    );
  },

  setDiglettTimer() {
    return (Math.random() - 0.98) > 0 ? 900 : 0;
  },

  generateTiles() {
    let tiles = [];

    for (let i = 0; i < 10; i++) {
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
      time: 10000,
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
            let nextTime = tile.diglettTimer - 100;

            return {
              id: tile.id,
              diglettTimer: nextTime,
              clicked: tile.clicked
            }
          } else {
            let nextTime;
            if (this.state.time % 3000) {
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
          time: this.state.time - 100,
          tiles: nextTiles
        });

        this.tick();
      }.bind(this), 100);
    } else {
      this.endGame();
    }
  }
});

document.addEventListener("DOMContentLoaded", function(event) {
  let mount = document.getElementById('app-mount');

  ReactDOM.render(<App width={mount.offsetWidth} height={mount.offsetHeight} />, mount);
});
