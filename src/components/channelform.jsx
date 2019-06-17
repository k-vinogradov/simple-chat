import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Field } from 'redux-form';
import classnames from 'classnames';
import { connect, reduxForm } from './util';

const mapUIStateToDialogProps = (globalState, dialogState) => {
  const invalid = dialogState === 'errorNew' || dialogState === 'errorRename';
  switch (globalState) {
    case 'channelFormDialog':
      return { invalid, disabled: false, show: true };
    case 'channelFormDialogLocked':
      return { invalid, disabled: true, show: true };
    default:
      return { invalid, disabled: false, show: false };
  }
};

const mapStateToProps = ({
  ui: {
    globalUiState,
    channelFormDialogState: { state, cid },
  },
}) => ({ uiProps: mapUIStateToDialogProps(globalUiState, state), cid, state });

@connect(mapStateToProps)
@reduxForm('channelForm')
class ChannelForm extends React.Component {
  submitNewChannel = ({ text }) => {
    const { addChannel } = this.props;
    addChannel(text);
  };

  submitRenameChannel = ({ text }) => {
    const { cid, renameChannel } = this.props;
    renameChannel(cid, text);
  };

  getSubmitHandler = () => {
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

  render() {
    const {
      uiProps: { disabled, invalid, show },
      closeChannelDialog,
      handleSubmit,
    } = this.props;
    const fieldClassName = classnames({ 'form-control': true, 'is-invalid': invalid });
    return (
      <Modal show={show} backdrop="static">
        <Modal.Body>
          <Form onSubmit={handleSubmit(this.getSubmitHandler())}>
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
              <Button variant="secondary" onClick={closeChannelDialog} disabled={disabled}>
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

export default ChannelForm;
