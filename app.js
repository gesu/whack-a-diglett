(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Board = require('./components/board');
var Score = require('./components/score');
var StartScreen = require('./components/start-screen');
var EndScreen = require('./components/end-screen');
var Timer = require('./components/timer');

// Game constants
var TICK_RATE = 100;
var GAME_DURATION = 10000;
var NUM_TILES = 12;
var NUM_TILES_LARGE = 16;
var SMALL_SCREEN_WIDTH = 768;
var DIGLETT_MAX_TIME = 1000;
var DIGLETT_REFRESH_FREQUENCY = 1000;
var DIGLETT_SPAWN_FREQUENCY = 0.1;

var App = React.createClass({
  displayName: 'App',
  getInitialState: function getInitialState() {
    return {
      maxScore: 0
    };
  },
  render: function render() {
    var screen = undefined;
    if (this.state.end) {
      screen = React.createElement(EndScreen, {
        score: this.state.score,
        newHighScore: this.state.newHighScore,
        startGame: this.startGame
      });
    } else if (this.state.running) {
      screen = React.createElement(
        'div',
        null,
        React.createElement(Score, {
          score: this.state.score
        }),
        React.createElement(Timer, {
          time: this.state.time
        }),
        React.createElement(Board, {
          tiles: this.state.tiles,
          updateScore: this.updateScore,
          difficulty: 0.01
        })
      );
    } else {
      screen = React.createElement(StartScreen, {
        disabled: this.state.running,
        startGame: this.startGame
      });
    }

    return React.createElement(
      'div',
      { className: 'app' },
      screen
    );
  },
  setDiglettTimer: function setDiglettTimer() {
    return Math.random() - (1 - DIGLETT_SPAWN_FREQUENCY) > 0 ? DIGLETT_MAX_TIME : 0;
  },
  generateTiles: function generateTiles() {
    var numTiles = NUM_TILES;
    if (this.props.width > SMALL_SCREEN_WIDTH) {
      numTiles = NUM_TILES_LARGE;
    }

    var tiles = [];

    for (var i = 0; i < numTiles; i++) {
      tiles.push({
        id: '' + i,
        diglettTimer: this.setDiglettTimer(),
        clicked: false
      });
    }

    return tiles;
  },
  startGame: function startGame() {
    this.setState({
      score: 0,
      running: true,
      end: false,
      time: GAME_DURATION,
      tiles: this.generateTiles(),
      newHighScore: false
    }, this.tick);
  },
  endGame: function endGame() {
    var newHighScore = this.state.score > this.state.maxScore;
    var newMaxScore = newHighScore ? this.state.score : this.state.maxScore;

    this.setState({
      running: false,
      end: true,
      maxScore: newMaxScore,
      newHighScore: newHighScore
    });
  },
  updateScore: function updateScore(id) {
    if (this.state.running) {
      var tiles = this.state.tiles;
      tiles[id].clicked = true;

      this.setState({
        score: this.state.score + 1,
        tiles: tiles
      });
    }
  },
  tick: function tick() {
    if (this.state.time > 0) {
      setTimeout(function () {
        var nextTiles = this.state.tiles.map(function (tile) {
          if (tile.diglettTimer > 0) {
            var nextTime = tile.diglettTimer - TICK_RATE;

            return {
              id: tile.id,
              diglettTimer: nextTime,
              clicked: tile.clicked
            };
          } else {
            var nextTime = undefined;
            if (this.state.time % DIGLETT_REFRESH_FREQUENCY == 0) {
              nextTime = this.setDiglettTimer();
            }

            return {
              id: tile.id,
              diglettTimer: nextTime,
              clicked: false
            };
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

document.addEventListener("DOMContentLoaded", function (event) {
  var mount = document.getElementById('app-mount');

  ReactDOM.render(React.createElement(App, { width: mount.offsetWidth }), mount);
});
},{"./components/board":2,"./components/end-screen":4,"./components/score":5,"./components/start-screen":7,"./components/timer":9}],2:[function(require,module,exports){
"use strict";

var Tile = require('./tile');

var Board = React.createClass({
  displayName: "Board",
  render: function render() {
    var tiles = undefined;
    if (this.props.tiles) {
      tiles = this.props.tiles.map(function (tile) {
        return React.createElement(Tile, {
          key: tile.id,
          id: tile.id,
          diglettTimer: tile.diglettTimer,
          clicked: tile.clicked,
          updateScore: this.props.updateScore
        });
      }.bind(this));
    }

    return React.createElement(
      "div",
      { className: "board clearfix" },
      tiles
    );
  }
});

module.exports = Board;
},{"./tile":8}],3:[function(require,module,exports){
"use strict";

var Diglett = React.createClass({
  displayName: "Diglett",
  render: function render() {
    var classString = "diglett";
    if (this.props.clicked) {
      classString += " clicked";
    }

    return React.createElement(
      "div",
      { className: classString },
      this.props.clicked ? React.createElement(
        "div",
        { className: "dead-eyes" },
        "x x"
      ) : React.createElement("div", { className: "eyes" }),
      React.createElement("div", { className: "nose" })
    );
  }
});

module.exports = Diglett;
},{}],4:[function(require,module,exports){
'use strict';

var StartButton = require('./start-button');
var Diglett = require('./diglett');

var EndScreen = React.createClass({
  displayName: 'EndScreen',
  render: function render() {
    return React.createElement(
      'div',
      { className: 'start-screen' },
      React.createElement(
        'h1',
        null,
        'Final Score: ',
        this.props.score
      ),
      this.props.newHighScore ? React.createElement(
        'div',
        { className: 'new-high-score' },
        'NEW HIGH SCORE!'
      ) : null,
      React.createElement(Diglett, { clicked: true }),
      React.createElement(Diglett, { clicked: true }),
      React.createElement(Diglett, { clicked: true }),
      React.createElement(StartButton, {
        disabled: this.props.disabled,
        startGame: this.props.startGame,
        label: 'Play Again!'
      })
    );
  }
});

module.exports = EndScreen;
},{"./diglett":3,"./start-button":6}],5:[function(require,module,exports){
"use strict";

var Score = React.createClass({
  displayName: "Score",
  render: function render() {
    return React.createElement(
      "div",
      { className: "score" },
      "Digletts Whacked: ",
      this.props.score
    );
  }
});

module.exports = Score;
},{}],6:[function(require,module,exports){
"use strict";

var StartButton = React.createClass({
  displayName: "StartButton",
  render: function render() {
    return React.createElement(
      "button",
      {
        className: "start-button",
        onClick: this.onClick
      },
      this.props.label
    );
  },
  onClick: function onClick() {
    if (!this.props.disabled) {
      this.props.startGame();
    }
  }
});

module.exports = StartButton;
},{}],7:[function(require,module,exports){
'use strict';

var StartButton = require('./start-button');
var Diglett = require('./diglett');

var StartScreen = React.createClass({
  displayName: 'StartScreen',
  render: function render() {
    return React.createElement(
      'div',
      { className: 'start-screen' },
      React.createElement(
        'h1',
        null,
        'Whack-a-Diglett v1.0'
      ),
      React.createElement(Diglett, { clicked: false }),
      React.createElement(Diglett, { clicked: false }),
      React.createElement(Diglett, { clicked: false }),
      React.createElement(StartButton, {
        disabled: this.props.disabled,
        startGame: this.props.startGame,
        label: 'Start Game'
      })
    );
  }
});

module.exports = StartScreen;
},{"./diglett":3,"./start-button":6}],8:[function(require,module,exports){
"use strict";

var Diglett = require('./diglett');

var Tile = React.createClass({
  displayName: "Tile",
  render: function render() {
    return React.createElement(
      "div",
      {
        onClick: this.onClick,
        className: "tile"
      },
      this.props.debug ? this.props.diglettTimer : null,
      this.props.diglettTimer ? React.createElement(Diglett, {
        clicked: this.props.clicked
      }) : null
    );
  },
  onClick: function onClick() {
    if (this.props.diglettTimer && !this.props.clicked) {
      this.props.updateScore(this.props.id);
    }
  }
});

module.exports = Tile;
},{"./diglett":3}],9:[function(require,module,exports){
"use strict";

var Timer = React.createClass({
  displayName: "Timer",
  render: function render() {
    return React.createElement(
      "div",
      { className: "timer" },
      "Time Left: ",
      (this.props.time / 1000).toFixed(1),
      "s"
    );
  }
});

module.exports = Timer;
},{}]},{},[1]);
