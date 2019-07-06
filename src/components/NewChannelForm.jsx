import { reduxForm } from 'redux-form';
import ChannelForm from './ChannelForm';
import { postChannel } from '../api';
import { connect } from './util';

const mapStateToProps = ({
  ui: {
    channelFormDialogState: { state },
  },
}) => ({
  form: 'newChannelForm',
  key: 'newChannelForm',
  initialValues: { name: '' },
  show: state === 'new',
});

@connect(mapStateToProps)
@reduxForm()
class NewChannelForm extends ChannelForm {
  send = name => postChannel(name);
}

export default NewChannelForm;
