const Diglett = require('./diglett');

const Tile = React.createClass({
  render() {
    return (
      <div
        onClick={this.onClick}
        className="tile"
      >
        {this.props.debug ? this.props.diglettTimer : null}

        { this.props.diglettTimer ?
          <Diglett
            clicked={this.props.clicked}
          /> : null
        }

      </div>
    );
  },

  onClick() {
    if (this.props.diglettTimer && !this.props.clicked) {
      this.props.updateScore(this.props.id);
    }
  }
});

module.exports = Tile;
