import React from 'react';
import { Button } from 'react-bootstrap';

class ChannelOptButton extends React.Component {
  handleClick = (event) => {
    const { onClick } = this.props;
    onClick(event);
  };

  render() {
    return (
      <Button variant="outline-dark" onClick={this.handleClick} className="border-0">
        <strong>⋮</strong>
      </Button>
    );
  }
}

export default ChannelOptButton;
