const Diglett = React.createClass({
  render() {
    let classString = "diglett";
    if (this.props.clicked) {
      classString += " clicked";
    }

    return (
      <div className={classString}>

        { this.props.clicked ?
          <div className="dead-eyes">x x</div>
          : <div className="eyes" />
        }

        <div className="nose" />
      </div>
    );
  }
});

module.exports = Diglett;
