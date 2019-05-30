import React from 'react';
import { connect } from 'react-redux';
import { ListGroup } from 'react-bootstrap';
import ChannelItem from './channelitem';

const mapStateToProps = ({ channels: { allCIDs } }) => ({ allCIDs });

const Sidebar = ({ allCIDs }) => (
  <React.Fragment>
    <h5>Channels</h5>
    <ListGroup>
      {allCIDs.map(cid => (
        <ChannelItem key={cid} cid={cid} />
      ))}
    </ListGroup>
  </React.Fragment>
);

export default connect(mapStateToProps)(Sidebar);
