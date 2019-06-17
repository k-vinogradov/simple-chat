import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connect } from './util';

const mapUIStateToDialogProps = (state) => {
  switch (state) {
    case 'channelDeleteDialog':
      return { show: true, disabled: false };
    case 'channelDeleteDialogLocked':
      return { show: true, disabled: true };
    default:
      return { show: false, disabled: false };
  }
};

const mapStateToProps = ({
  data: {
    channels: { byCID },
  },
  ui: {
    globalUiState,
    channelDeleteDialogState: { state, cid },
  },
}) => {
  const name = byCID[cid] ? byCID[cid].name : '';
  return {
    uiProps: mapUIStateToDialogProps(globalUiState),
    state,
    cid,
    name,
  };
};

@connect(mapStateToProps)
class ChannelDeleteDialog extends React.Component {
  delete = () => {
    const { cid, deleteChannel } = this.props;
    deleteChannel(cid);
  };

  renderErrorMessage = () => {
    const { state } = this.props;
    if (state !== 'error') return null;
    return <div><small className="text-danger">Failed to delete channel</small></div>;
  };

  render() {
    const {
      name,
      closeChannelDeleteDialog,
      uiProps: { show, disabled },
    } = this.props;
    return (
      <Modal show={show} backdrop="static">
        <Modal.Body>
          <p>{`Are you sure want to delete the channel ${name}?`}</p>
          {this.renderErrorMessage()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeChannelDeleteDialog} disabled={disabled}>
            Close
          </Button>
          <Button variant="danger" onClick={this.delete} disabled={disabled}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ChannelDeleteDialog;
