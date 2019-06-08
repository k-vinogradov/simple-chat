import React from 'react';
import { Button } from 'react-bootstrap';

class ChannelOptButton extends React.Component {
  handleClick = (event) => {
    const { onClick } = this.props;
    onClick(event);
  };

  render() {
    return (
      <Button variant="link" size="sm" onClick={this.handleClick}>
        …
      </Button>
    );
  }
}

export default ChannelOptButton;
