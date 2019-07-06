import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import ChannelItem from './ChannelItem';
import NewChannelForm from './NewChannelForm';
import { connect } from './util';

const mapStateToProps = ({
  data: {
    channels: { allCIDs },
  },
  ui: {
    channelFormDialogState: { state },
  },
}) => ({ channels: allCIDs, showNewChannelForm: state === 'new' });

const Sidebar = ({ channels, openAddChannelDialog, showNewChannelForm }) => (
  <React.Fragment>
    {channels.map(cid => (
      <ChannelItem key={cid} cid={cid} />
    ))}
    <Row className="p-2">
      <Col>
        <Button onClick={openAddChannelDialog}>New channel...</Button>
      </Col>
      {showNewChannelForm ? <NewChannelForm /> : null}
    </Row>
  </React.Fragment>
);

export default connect(mapStateToProps)(Sidebar);
