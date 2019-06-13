import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import ChannelItem from './channelitem';
import { openAddChannelDialog } from '../actions';

const mapStateToProps = ({
  data: {
    channels: { allCIDs },
  },
  ui: { addChannel },
}) => ({ allCIDs, addChannel });

const actionCreators = {
  addChannel: openAddChannelDialog,
};

const Sidebar = ({ allCIDs, addChannel }) => (
  <React.Fragment>
    {allCIDs.map(cid => (
      <ChannelItem key={cid} cid={cid} />
    ))}
    <Button onClick={addChannel}>New channel...</Button>
  </React.Fragment>
);

export default connect(
  mapStateToProps,
  actionCreators,
)(Sidebar);
