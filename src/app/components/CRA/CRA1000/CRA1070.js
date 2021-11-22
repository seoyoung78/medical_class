import React from 'react';
import { OBTComplete, OBTConfirm, OBTDataGrid, OBTDataGridInterface, OBTSnackbar } from 'luna-orbit';
import '../../../css/CLR/CLRS0107.scss';
import deleteImg from '../../../css/imgs/ic_trashcan_m_normal.svg';

export default class CRA1070 extends React.Component {
  state = {
    delOpen: false,
    setOpen: false,
    snack: false,
    keyword: '',
    list: [],
    grid: this.getGrid(),
    rowIndex: -1,
    rowValue: ''
  }

  getGrid() {
    return new OBTDataGridInterface('grid_column_type', {
      gridType: OBTDataGridInterface.GridType.gridView,
      editable: true,
      // preventSort: false,
      // eachRowResizable: false,
      // columnMovable: false,
      // rowMovable: false
    }).setColumns([
      {name: 'dgns_cd', header: '진단코드', type: 'text', width: 20, visible: true, sortable: false},
      {name: 'dgns_nm', header: '진단명', type: 'text', width: 60, visible: true, sortable: false, tooltip: true, 
        style: {
          textWrap: "ellipse" // 말줄임 사용
      }},
      {name: 'dvsn', header: '형태', type: 'dropDown', width: 30, visible: true, sortable: false, 
        dropDownDataItems: [
          {code: '1', text: '주상병'},
          {code: '2', text: '부상병'},
          {code: '3', text: '배제된 상병'},
        ],
        dropDownCodeProperty: 'code', //dropDownDataItems에서 사용할 코드 값의 프로퍼티
        dropDownTextProperty: 'text', //dropDownDataItems에서 사용할 텍스트 값의 프로퍼티
        buttonVisibility: 'always',
        showButtonOnlyEditable: true
      },
      {name: 'rlot', header: 'R/O', type: 'check', width: 10, visible: true, sortable: false},
      {name: 'site', header: '부위', type: 'dropDown', width: 20, visible: true, sortable: false,
        dropDownDataItems: [
          {text: '-'},
          {text: 'Rt'},
          {text: 'Lt'},
          {text: 'Both'},
        ], 
        dropDownCodeProperty: 'text', //dropDownDataItems에서 사용할 코드 값의 프로퍼티
        dropDownTextProperty: 'text', //dropDownDataItems에서 사용할 텍스트 값의 프로퍼티
        buttonVisibility: 'always',
        showButtonOnlyEditable: true    
      },
      // {name: 'group', header: '특정 기호', type: 'group', width: 30, hideChildHeaders: true, visible: true, sortable: false, alignment: "center",
      //   columns: [
      //     {
      //       name: 'spcf_rgno', type: 'text', width: 150
      //     },
      //     {
      //       name: 'img', type: 'button', buttonVisibility: "mouseOver",
      //       imageButtons: {
      //         images: [{
      //           name: 'del', up: deleteImg, hover: deleteImg, down: deleteImg, cusor: 'pointer'
      //         }]
      //       }
      //     }
      //   ]
      // },
      {name: 'spcf_rgno', header: '특정 기호', type: 'text', width: 15, visible: true, sortable: false},
      {name: 'img', header: '삭제', type: 'button', buttonVisibility: "mouseOver", width: 5,
        imageButtons: {
          images: [{
            name: 'del', up: deleteImg, hover: deleteImg, down: deleteImg, cusor: 'pointer'
          }]
        }
      }
    ]).setProvider({
      read: (e) => {
        return new Promise((resolve) => {
          resolve();
        })
      },
      store: (e) => {
        return new Promise((resolve) => {
          resolve();
        })
      }
    })
  };

  render() {
    return (
      <>
        <div className="dgns-container">
          <div className='h-box'>
            <div className="h-box w-full dgns-top flex-1">
              <div className="dgns-info bold flex-1">진단</div>
              <div className="btn-collection">
                <div className="btn-box" onClick={()=>this.setState({setOpen:true})}><div className="setting"/></div>
                {/* <CLRS0107_1 open={state.setOpen} grid={state.grid} handleVisible={handleVisible} handleClose={handleClose}/> */}
              </div>
            </div>
          </div>
          <div>
            <OBTDataGrid interface={this.state.grid} height='140px'/>
            {/* <OBTListGrid width='100%' height='140px'interface={this.state.grid} onChange={()=>{}} /> */}
            {this.state.delOpen?
              <OBTConfirm type={OBTConfirm.Type.success}
                          title='진단 삭제'
                          labelText='선택한 진단을 삭제하시겠습니까?'
                          onCancel={()=>this.setState({delOpen: false})}
                          onConfirm={this.handleDelete}
              />
            :<></>}
            <OBTSnackbar labelText='삭제되었습니다.'
                        type={OBTSnackbar.Type.success}
                        open={this.state.snack}
                        onChange={()=>this.setState({snack: false})}
            />
          </div>
          <div>
            <OBTComplete value={this.state.keyword}
                        // dataInfo={clrs0107Complete}
                        onSearch={this.handleSearch}
                        onChange={this.handleChange}
                        className='OBTC_test'
                        placeHolder='진단코드, 진단명으로 검색하세요.'
                        width='100%'
            />
          </div>
        </div>
      </>
    );
  }
}
