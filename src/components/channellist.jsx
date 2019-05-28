import React from 'react';
import { ListGroup } from 'react-bootstrap';

class ChannelList extends React.Component {
  constructor(props) {
    super(props);
    const { channels, currentCID } = props;
    this.state = { channels, currentCID };
  }

  renderList() {
    const { channels, currentCID } = this.state;
    return channels.map(({ id, name }) => (
      <ListGroup.Item key={id} active={id === currentCID}>
        {name}
      </ListGroup.Item>
    ));
  }

  render() {
    return <ListGroup>{this.renderList()}</ListGroup>;
  }
}

export default ChannelList;
