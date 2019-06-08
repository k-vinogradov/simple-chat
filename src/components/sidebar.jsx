import React from 'react';
import { connect } from 'react-redux';
import ChannelItem from './channelitem';

const mapStateToProps = ({
  data: {
    channels: { allCIDs },
  },
}) => ({ allCIDs });

const Sidebar = ({ allCIDs }) => (
  <React.Fragment>
    {allCIDs.map(cid => (
      <ChannelItem key={cid} cid={cid} />
    ))}
  </React.Fragment>
);

export default connect(mapStateToProps)(Sidebar);
