import React, { Component, Fragment } from 'react';

export default class CRA2000 extends React.Component {
  pageContainer = this.props.pageContainer;
  util = this.props.util;

  constructor(props) {
    super(props);
    this.pageContainer.initialize({
      mainButtons: this.getMainButtons(),
      isSideBarCollapsed: false,
    });
    this.state = {};
  }
  render() {
    return <>상용구</>;
  }
  getMainButtons() {
    return [
      {
        key: 'primary1',
        labelText: '버튼명',
        primary: true,
        onClick: (e) => {},
      },
      {
        key: 'primary2',
        labelText: '버튼명',
        primary: true,
        onClick: (e) => {},
      },
    ];
  }
}
