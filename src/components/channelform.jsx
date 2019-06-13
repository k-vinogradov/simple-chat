import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import classnames from 'classnames';
import * as actions from '../actions';

const mapStateToProps = ({ ui: { channelDialogState } }) => ({ ...channelDialogState });

const actionCreators = {
  close: actions.closeChannelDialog,
  addChannel: actions.addChannel,
  renameChannel: actions.renameChannel,
};

class ChannelForm extends React.Component {
  submitNewChannel = ({ text }) => {
    const { addChannel } = this.props;
    addChannel(text);
  };

  submitRenameChannel = ({ text }) => {
    const { cid, renameChannel } = this.props;
    renameChannel(cid, text);
  };

  submit = () => {
    const { state } = this.props;
    switch (state) {
      case 'new':
      case 'errorNew':
        return this.submitNewChannel;
      case 'rename':
      case 'errorRename':
        return this.submitRenameChannel;
      default:
        return () => {};
    }
  };

  mapUIStateToDialogProps = state => ({
    new: { disabled: false, invalid: false, show: true },
    rename: { disabled: false, invalid: false, show: true },
    sending: { disabled: true, invalid: false, show: true },
    errorNew: { disabled: false, invalid: true, show: true },
    errorRename: { disabled: false, invalid: true, show: true },
    inactive: { disabled: false, invalid: false, show: false },
  }[state]);

  render() {
    const { close, handleSubmit, state } = this.props;
    const { disabled, invalid, show } = this.mapUIStateToDialogProps(state);
    const fieldClassName = classnames({ 'form-control': true, 'is-invalid': invalid });
    return (
      <Modal show={show} backdrop="static">
        <Modal.Body>
          <Form onSubmit={handleSubmit(this.submit())}>
            <Form.Group controlId="formBasicEmail">
              <Field
                props={{ disabled }}
                name="text"
                required
                component="input"
                type="text"
                className={fieldClassName}
                placeholder="Channel name"
              />
              <div className="invalid-feedback">Failed to save data</div>
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={close} disabled={disabled}>
                Close
              </Button>
              <Button variant="primary" type="submit" disabled={disabled}>
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default connect(
  mapStateToProps,
  actionCreators,
)(reduxForm({ form: 'channelForm' })(ChannelForm));
