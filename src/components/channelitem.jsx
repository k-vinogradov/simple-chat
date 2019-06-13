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
    ui: { currentCID, channels },
  },
  { cid },
) => {
  const state = channels[cid];
  const disabled = Object.values(channels).find(item => item.state === 'sending') !== undefined;
  const active = currentCID === cid;
  return {
    ...byCID[cid],
    disabled,
    active,
    state,
  };
};

const actionCreators = {
  selectChannel: actions.selectChannel,
  renameChannel: actions.openRenameChannelDialog,
};

class ChannelItem extends React.Component {
  select = () => {
    const { cid, state, selectChannel } = this.props;
    selectChannel({ cid, state });
  };

  rename = () => {
    const { cid, name, renameChannel } = this.props;
    renameChannel({ cid, name });
  };

  renderChannelButton() {
    const { name, active, disabled } = this.props;
    const props = {
      disabled,
      variant: active ? 'secondary' : 'light',
      onClick: this.select,
      className: 'text-left w-100',
    };
    return <Button {...props}>{name}</Button>;
  }

  renderDropDownMenu() {
    const { removable } = this.props;
    if (!removable) return null;
    return (
      <Dropdown>
        <Dropdown.Toggle as={ChannelOptButton} id="dropdown-custom-components" />

        <Dropdown.Menu>
          <Dropdown.Item eventKey="1" onClick={this.rename}>
            Rename
          </Dropdown.Item>
          <Dropdown.Item eventKey="2">Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  render() {
    return (
      <Row className="p-2">
        <Col>{this.renderChannelButton()}</Col>
        <Col md={1} className="p-0">
          {this.renderDropDownMenu()}
        </Col>
      </Row>
    );
  }
}

export default connect(
  mapStateToProps,
  actionCreators,
)(ChannelItem);
