const Tile = require('./tile');

const Board = React.createClass({
  render() {
    let tiles;
    if (this.props.tiles) {
      tiles = this.props.tiles.map(function(tile) {
        return (
          <Tile
            key={tile.id}
            id={tile.id}
            diglettTimer={tile.diglettTimer}
            clicked={tile.clicked}
            updateScore={this.props.updateScore}
          />
        );
      }.bind(this));
    }

    return (
      <div className="board clearfix">
        {tiles}
      </div>
    );
  }
});

module.exports = Board;
