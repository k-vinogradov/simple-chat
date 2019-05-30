import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../actions';

const mapStateToProps = ({ channels: { byCID, activeCID } }, { cid }) => ({
  cid,
  name: byCID[cid].name,
  active: activeCID === cid,
});

const actionCreators = {
  selectChannel: actions.selectChannel,
};

class ChannelItem extends React.Component {
  handleChannelSelected = () => {
    const { cid, selectChannel } = this.props;
    selectChannel({ cid });
  };

  render() {
    const { name, active } = this.props;
    return (
      <ListGroup.Item active={active} onClick={this.handleChannelSelected}>
        {name}
      </ListGroup.Item>
    );
  }
}

export default connect(
  mapStateToProps,
  actionCreators,
)(ChannelItem);
