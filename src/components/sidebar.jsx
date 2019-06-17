import React from 'react';
import { Button } from 'react-bootstrap';
import ChannelItem from './channelitem';
import { connect, isLockedState } from './util';

const mapStateToProps = ({
  data: {
    channels: { allCIDs },
  },
  ui: { globalUiState },
}) => ({ channels: allCIDs, disabled: isLockedState(globalUiState) });

const Sidebar = ({ channels, openAddChannelDialog, disabled }) => (
  <React.Fragment>
    {channels.map(cid => (
      <ChannelItem key={cid} cid={cid} />
    ))}
    <Button onClick={openAddChannelDialog} disabled={disabled}>
      New channel...
    </Button>
  </React.Fragment>
);

export default connect(mapStateToProps)(Sidebar);
