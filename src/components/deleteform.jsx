import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Field, SubmissionError } from 'redux-form';
import { connect, reduxForm } from './util';
import { deleteChannel } from '../api';

const mapStateToProps = ({
  data: {
    channels: { byCID },
  },
  ui: {
    channelDeleteDialogState: { state, cid },
  },
}) => ({
  show: state !== 'inactive',
  cid,
  name: byCID[cid] ? byCID[cid].name : '',
});

@connect(mapStateToProps)
@reduxForm('deleteChannel')
class DeleteForm extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { initialize, cid, submitting } = nextProps;
    if (!submitting) initialize({ cid }, true);
    return true;
  }

  renderErrorMessage = () => {
    const { error } = this.props;
    if (!error) return null;
    return (
      <div>
        <small className="text-danger">{`Failed to delete channel: ${error}`}</small>
      </div>
    );
  };

  submit = async ({ cid }) => {
    const { closeChannelDeleteDialog } = this.props;
    try {
      await deleteChannel(cid);
    } catch ({ message }) {
      throw new SubmissionError({ _error: message });
    }
    closeChannelDeleteDialog();
  };

  render() {
    const {
      closeChannelDeleteDialog, handleSubmit, name, show, submitting,
    } = this.props;
    return (
      <Modal show={show} backdrop="static">
        <Modal.Body>
          <p>{`Are you sure want to delete the channel ${name}?`}</p>
          {this.renderErrorMessage()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeChannelDeleteDialog} disabled={submitting}>
            Close
          </Button>
          <Form onSubmit={handleSubmit(this.submit)}>
            <Field type="hidden" name="cid" component="input" />
            <Button variant="danger" type="submit" disabled={submitting}>
              Delete
            </Button>
          </Form>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default DeleteForm;
