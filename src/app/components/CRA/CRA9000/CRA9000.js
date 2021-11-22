import React from 'react';
import { OBTButton, OBTFormPanel, OBTRadioButton, OBTRadioButtonGroup, OBTTab, OBTTabs } from 'luna-orbit';

export default class CRA9000 extends React.Component {
  pageContainer = this.props.pageContainer;
  util = this.props.util;

  constructor(props) {
    super(props);
    this.pageContainer.initialize({
      mainButtons: this.getMainButtons(),
      isSideBarCollapsed: false,
    });
    this.state = {};
  };

  state = {
    tab: '1', // 환경설정 tab 
    value: '1'  // 환경설정 - 경과기록 설정 값
  };

  render() {
    return (
      <>
        <OBTTabs value={this.state.tab} onChange={(e)=>this.setState({tab: e.value})}>
          <OBTTab labelText='환경설정1' value='1'>
            <div>환경설정1</div>
            <OBTFormPanel disabled={false}>
              <colgroup>
                <col typeof='label'/>
                <col width='400px'/>
                <col typeof='label'/>
                <col width='400px'/>
              </colgroup>
              <tbody>
                <tr>
                  <th>경과기록 설정</th>
                  <td>
                    <OBTRadioButtonGroup value={this.state.value} onChange={(e)=>this.setState({value: e.value})}>
                      <OBTRadioButton value='1' labelText='기본' onChange={()=>{}}/>
                      <OBTRadioButton value='2' labelText='SOAP' onChange={()=>{}}/>
                    </OBTRadioButtonGroup>
                  </td>
                  <th>환경설정1 항목2</th>
                  <td>기본</td>
                </tr>
                <tr>
                  <th>환경설정1 항목3</th>
                  <td>Text</td>
                  <th>환경설정1 항목4</th>
                  <td>Text</td>
                </tr>
                <tr>
                  <th>환경설정1 항목5</th>
                  <td>Text</td>
                  <th>환경설정1 항목6</th>
                  <td>Text</td>
                </tr>
                <tr>
                  <th>환경설정1 항목7</th>
                  <td>Text</td>
                  <th>환경설정1 항목8</th>
                  <td>Text</td>
                </tr>
              </tbody>
            </OBTFormPanel>
            <div className='mg-auto'>
              <OBTButton labelText='취소' />
              <OBTButton labelText='저장' theme={OBTButton.Theme.blue} />
            </div>
          </OBTTab>
          <OBTTab labelText='환경설정2' value='2'>
            <div>환경설정2</div>
            <div className='mg-auto'>
              <OBTButton labelText='취소' />
              <OBTButton labelText='저장' theme={OBTButton.Theme.blue} />
            </div>
          </OBTTab>
          <OBTTab labelText='환경설정3' value='3'>
            <div>환경설정3</div>
            <div className='mg-auto'>
              <OBTButton labelText='취소' />
              <OBTButton labelText='저장' theme={OBTButton.Theme.blue} />
            </div>
          </OBTTab>
        </OBTTabs>
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
