import React from 'react';
import {
  Row, Col, Button, Dropdown,
} from 'react-bootstrap';
import { connect } from './util';
import ChannelOptButton from './channeloptbutton';

const mapStateToProps = (
  {
    data: {
      channels: { byCID },
    },
    ui: { currentCID },
  },
  { cid },
) => {
  const { name, removable } = byCID[cid];
  return {
    cid,
    currentCID,
    name,
    removable,
    buttonVariant: cid === currentCID ? 'secondary' : 'light',
  };
};

@connect(mapStateToProps)
class ChannelItem extends React.Component {
  select = () => {
    const {
      cid, currentCID, name, selectChannel,
    } = this.props;
    if (cid === currentCID) return;
    selectChannel({ cid, name });
  };

  rename = () => {
    const { cid, name, openRenameChannelDialog } = this.props;
    openRenameChannelDialog({ cid, name });
  };

  delete = () => {
    const { cid, openChannelDeleteDialog } = this.props;
    openChannelDeleteDialog({ cid });
  };

  renderChannelButton() {
    const { name, buttonVariant } = this.props;
    const props = {
      variant: buttonVariant,
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
          <Dropdown.Item eventKey="2" onClick={this.delete}>
            Delete
          </Dropdown.Item>
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

export default ChannelItem;
