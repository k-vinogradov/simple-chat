import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import ChannelItem from './channelitem';
import { connect } from './util';

const mapStateToProps = ({
  data: {
    channels: { allCIDs },
  },
}) => ({ channels: allCIDs });

const Sidebar = ({ channels, openAddChannelDialog }) => (
  <React.Fragment>
    {channels.map(cid => (
      <ChannelItem key={cid} cid={cid} />
    ))}
    <Row className="p-2">
      <Col>
        <Button onClick={openAddChannelDialog}>
          New channel...
        </Button>
      </Col>
    </Row>
  </React.Fragment>
);

export default connect(mapStateToProps)(Sidebar);
