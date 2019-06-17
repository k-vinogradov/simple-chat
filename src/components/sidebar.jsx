import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
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
    <Row className="p-2">
      <Col>
        <Button onClick={openAddChannelDialog} disabled={disabled}>
          New channel...
        </Button>
      </Col>
    </Row>
  </React.Fragment>
);

export default connect(mapStateToProps)(Sidebar);
