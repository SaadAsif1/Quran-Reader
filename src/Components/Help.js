import React, { Component } from "react";
import { Modal, Button, Icon } from "antd";

export class Help extends Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <div style={{ display: "inline-block" }}>
        <Button type='danger' shape='round' onClick={this.showModal}>
          Help
          <Icon type='question' />
        </Button>
        <Modal
          title={
            <h3 className='modalTitle'>
              Help <Icon type='question' />
            </h3>
          }
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <p className='rewind'>
              <span className='icon-help'>
                <Icon type='retweet' />
              </span>
              : When Clicked it loops the current Ayat or Surah depending on if
              your using the Quran Library or Audio Library
            </p>
          </div>
          <hr className='linebreak' />
          <div style={{ display: "flex", alignItems: "center" }}>
            <p className='rewind'>
              <span className='icon-help'>
                <Icon type='setting' />
              </span>
              : This Icon when clicked shows you the option on the page your
              currently at
            </p>
          </div>
          <hr className='linebreak' />
          <div style={{ display: "flex", alignItems: "center" }}>
            <p className='rewind'>
              <span className='icon-help'>
                <Icon type='left' />
              </span>
              : This Icon when clicked relocates you to the page you were
              previously at
            </p>
          </div>
          <hr className='linebreak' />
          <div style={{ display: "flex", alignItems: "center" }}>
            <p className='rewind'>
              <span className='icon-help'>
                <Icon type='caret-right' />
              </span>
              : This Icon when clicked it starts playing the current track
            </p>
          </div>
          <hr className='linebreak' />
          <div style={{ display: "flex", alignItems: "center" }}>
            <p className='rewind'>
              <span className='icon-help'>
                <Icon type='pause' />
              </span>
              : This Icon when clicked it pauses the current track
            </p>
          </div>
          <hr className='linebreak' />
          <div style={{ display: "flex", alignItems: "center" }}>
            <p className='rewind'>
              <span className='icon-help'>
                <Icon type='forward' />
              </span>
              : This Icon when clicked plays the next track but if your on the
              last track it loops the whole playlist over again
            </p>
          </div>
          <hr className='linebreak' />
          <div style={{ display: "flex", alignItems: "center" }}>
            <p className='rewind'>
              <span className='icon-help'>
                <Icon type='backward' />
              </span>
              : This Icon when clicked plays the previous track but if your on
              the first track it plays the last track
            </p>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Help;
