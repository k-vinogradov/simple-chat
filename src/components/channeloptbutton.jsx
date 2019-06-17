import React from 'react';
import { Button } from 'react-bootstrap';
import { connect, isLockedState } from './util';

const mapStateToProps = ({ ui: { globalUiState } }) => ({ disabled: isLockedState(globalUiState) });

@connect(mapStateToProps)
class ChannelOptButton extends React.Component {
  handleClick = (event) => {
    const { onClick } = this.props;
    onClick(event);
  };

  render() {
    const { disabled } = this.props;
    return (
      <Button
        variant="outline-dark"
        disabled={disabled}
        onClick={this.handleClick}
        className="border-0"
      >
        <strong>⋮</strong>
      </Button>
    );
  }
}

export default ChannelOptButton;
