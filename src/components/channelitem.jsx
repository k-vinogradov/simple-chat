import React from 'react';
import {
  Row, Col, Button, Dropdown,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ChannelOptButton from './channeloptbutton';

const mapStateToProps = (
  {
    data: {
      channels: { byCID },
    },
    ui: { currentCID },
  },
  { cid },
) => ({
  cid,
  name: byCID[cid].name,
  removable: byCID[cid].removable,
  active: currentCID === cid,
});

const actionCreators = {
  selectChannel: actions.selectChannel,
};

class ChannelItem extends React.Component {
  handleChannelSelected = () => {
    const { cid, selectChannel } = this.props;
    selectChannel(cid);
  };

  handleChannelRename = () => {
    console.log('Rename channel');
  };

  renderChannelButton() {
    const { name, active } = this.props;
    const variant = active ? 'secondary' : 'light';
    return (
      <Button
        className="text-left w-100"
        onClick={this.handleChannelSelected}
        variant={variant}
      >
        {name}
      </Button>
    );
  }

  renderDropDownMenu() {
    const { removable } = this.props;
    if (!removable) return null;
    return (
      <Dropdown>
        <Dropdown.Toggle as={ChannelOptButton} id="dropdown-custom-components" />

        <Dropdown.Menu>
          <Dropdown.Item eventKey="1" onClick={this.handleChannelRename}>
            Rename
          </Dropdown.Item>
          <Dropdown.Item eventKey="2">Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  render() {
    return (
      <Row>
        <Col className="p-1">{this.renderChannelButton()}</Col>
        <Col md={1}>{this.renderDropDownMenu()}</Col>
      </Row>
    );
  }
}

export default connect(
  mapStateToProps,
  actionCreators,
)(ChannelItem);
