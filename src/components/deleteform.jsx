import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Field } from 'redux-form';
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
  form: `deleteChannel${cid}`,
  initialValues: { cid },
  key: cid,
  name: byCID[cid] && byCID[cid].name,
  show: state === 'active',
});

@connect(mapStateToProps)
@reduxForm('deleteChannel')
class DeleteForm extends React.Component {
  renderErrorMessage = message => (
    <div>
      <small className="text-danger">{message}</small>
    </div>
  );

  submit = async ({ cid }) => {
    const { closeChannelDeleteDialog } = this.props;
    await deleteChannel(cid);
    closeChannelDeleteDialog();
  };

  render() {
    const {
      closeChannelDeleteDialog, error, handleSubmit, name, show, submitting,
    } = this.props;
    return (
      <Modal show={show} backdrop="static">
        <Modal.Body>
          <p>{`Are you sure want to delete the channel ${name}?`}</p>
          {error && this.renderErrorMessage(error)}
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
