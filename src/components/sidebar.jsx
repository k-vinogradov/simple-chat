import React from 'react';
import { ListGroup } from 'react-bootstrap';

const Sidebar = ({ channels, currentChannelId, onChannelSelected }) => (
  <React.Fragment>
    <h5>Channels</h5>
    <ListGroup>
      {channels.map(({ id, name }) => (
        <ListGroup.Item key={id} active={id === currentChannelId} onClick={onChannelSelected(id)}>
          {name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  </React.Fragment>
);

export default Sidebar;
