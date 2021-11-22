import React, { Component, Fragment } from 'react';
import '../../../css/index.scss';
import CRA1010 from './CRA1010';
import CRA1020 from './CRA1020';
import CRA1030 from './CRA1030';
import CRA1040 from './CRA1040';
import CRA1050 from './CRA1050';
import CRA1060 from './CRA1060';
import CRA1070 from './CRA1070';
import CRA1080 from './CRA1080';

export default class CRA1000 extends React.Component {
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
    return (
      <>
        <div className="contentsWrap h-box">
          <div className="fixed-contents-area">
            <CRA1010 />
          </div>
          <div className="module-contens">
            <div className="pannel-container">
              <div className="v-box">
                <div className="h-box mb-12">
                  <div className="pationt-info mr-12">
                    <CRA1020 />
                  </div>
                  <div className="v-box mr-12">
                    <div className="physical-info">
                      <CRA1030 />
                    </div>
                    <div className="diagnostic-info">
                      <CRA1040 />
                    </div>
                  </div>
                  <div className="progrees-note">
                    <CRA1050 />
                  </div>
                </div>
                <div className="h-box">
                  <div className="prescription-refer mr-12">
                    <CRA1060 />
                  </div>
                  <div className="v-box dp-container">
                    <div className="diagnosis-tb mb-12">
                      <CRA1070 />
                    </div>
                    <div className="prescription-tb">
                      <CRA1080 />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
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
