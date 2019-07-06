import { reduxForm } from 'redux-form';
import ChannelForm from './ChannelForm';
import { patchChannel } from '../api';
import { connect } from './util';

const mapStateToProps = ({
  data: {
    channels: { byCID: channels },
  },
  ui: {
    channelFormDialogState: { state, cid },
  },
}) => ({
  cid,
  form: `renameChannel${cid}`,
  initialValues: { name: cid && channels[cid].name },
  key: cid,
  show: state === 'rename',
});

@connect(mapStateToProps)
@reduxForm()
class RenameChannelForm extends ChannelForm {
  send = name => patchChannel(name, this.props.cid);
}

export default RenameChannelForm;
