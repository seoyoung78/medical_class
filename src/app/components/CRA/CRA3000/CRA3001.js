import React from 'react';
import { OBTAlert, OBTComplete, OBTConfirm, OBTDataGridInterface, OBTDialog, OBTDropDownList2, OBTFormPanel, OBTDataGrid, OBTNumberField, OBTSnackbar, OBTTextField } from 'luna-orbit';
import deleteImg from '../../../css/imgs/ic_trashcan_m_normal.svg'
export default class CRA3001 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      set_clsf_cd: 0,   // 약속처방 분류코드
      set_cd: 0,        // 약속처방 코드
      set_nm: '',       // 약속 명칭
      set: {},
      dgnsKeyword: '',  // 진단 complete 검색어 저장
      dgnsList: [],     // 진단 리스트
      dgnsGrid: this.getDgnsGrid(),
      prscKeyword: '',  // 차방 complete 검색어 저장
      prscList: [],     // 처방 리스트
      prscGrid: this.getPrscGrid(),
      open: false,      // 다이얼로그 알림
      snack: false,     // 확인 버튼 클릭 시 snackbar
      mix: false,       // mix 팝업
      mixList: [],      // mix 목록 저장
      mixAlert: false,  // mix 저장 시 알림 value
      mixMount: 1,
    }
  };

  // 약속처방 진단 상세 그리드 설정
  getDgnsGrid () {
    return new OBTDataGridInterface('grid_column_type', {
      gridType: OBTDataGridInterface.GridType.gridView,
      editable: true,
    }).setColumns([
      {name: 'dgns_cd', header: '진단코드', type: 'text', width: 20, visible: true, sortable: false},
      {name: 'dgns_nm', header: '진단명', type: 'text', width: 60, visible: true, sortable: false, tooltip: true,
      style: {
        textWrap: "ellipse" // 말줄임 사용
      }},
      {name: 'spcf_rgno', header: '특정 기호', type: 'text', width: 15, visible: true, sortable: false},
      {name: 'img', header: '삭제', type: 'button', buttonVisibility: "mouseOver", width: 5, visible: true, sortable: false,
        imageButtons: {
          images: [{
            name: 'del', up: deleteImg, hover: deleteImg, down: deleteImg, cusor: 'pointer'
          }]
        }
      },
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

  // 약속처방 처방 상세 그리드 설정
  getPrscGrid () {
    return new OBTDataGridInterface('grid_column_type', {
      gridType: OBTDataGridInterface.GridType.gridView,
      editable: true
    }).setColumns([
      {name: 'mix_yn', header: 'MIX', type: 'text', width: 10, visible: true, sortable: false},
      {name: 'prsc_cd', header: '처방코드', type: 'text', width: 20, visible: true, sortable: false},
      {name: 'prsc_nm', header: '처방명', type: 'text', width: 80, visible: true, sortable: false, useTooltip: true,
      style: {
        textWrap: "ellipse" // 말줄임 사용
      }},
      {name: 'ontm_vol', header: '1회량', type: 'text', width: 20, visible: true, sortable: false},
      {name: 'notm', header: '횟수', type: 'text', width: 20, visible: true, sortable: false},
      {name: 'nody', header: '일수', type: 'text', width: 20, visible: true, sortable: false},
      {name: 'iotm_cd', header: '용법', type: 'text', width: 20, visible: true, sortable: false},
      {name: 'prsc_pay_dvcd', header: '급여', type: 'dropDown', width: 20, visible: true, sortable: false,
        dropDownDataItems: [
          {code: '1', text: '급여'},
          {code: '2', text: '비급여'},
          {code: '3', text: '100/100'},
          {code: '4', text: '100/50'},
          {code: '5', text: '100/80'},
          {code: '6', text: '100/30'},
          {code: '7', text: '100/90'},
        ], 
        dropDownCodeProperty: 'code', //dropDownDataItems에서 사용할 코드 값의 프로퍼티
        dropDownTextProperty: 'text', //dropDownDataItems에서 사용할 텍스트 값의 프로퍼티
        buttonVisibility: 'always',
        showButtonOnlyEditable: true
      },
      {name: 'hsin_hsot_dvcd', header: '원외', type: 'dropDown', width: 20, visible: true, sortable: false, 
        dropDownDataItems: [
          {text: '-'},
          {text: '원외'},
          {text: '원내'},
        ], 
        dropDownCodeProperty: 'text', //dropDownDataItems에서 사용할 코드 값의 프로퍼티
        dropDownTextProperty: 'text', //dropDownDataItems에서 사용할 텍스트 값의 프로퍼티
        buttonVisibility: 'always',
        showButtonOnlyEditable: true,
      },
      {name: 'hsin_prsc_resn_cd', header: '예외', type: 'text', width: 15, visible: true},
      {name: 'img', header: '삭제', type: 'button', buttonVisibility: "mouseOver", width: 10, visible: true,
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
        });
      },
      store: (e) => {
        return new Promise((resolve) => {
          resolve();
        });
      }
    });
  };

  render() {
    return (
      <>
        <div>
          {this.props.set_cd === 0 ? 
            <h3>약속처방 추가</h3>
          :
            <div className='h-box'>
              <h3>약속처방 수정</h3>
              {/* <div>약속처방 &gt; {state.set_nm}</div> */}
            </div>
          }
          <div className=''>
            <h4>분류 및 명칭</h4>
            <div>
              <OBTFormPanel disabled={false}>
                <colgroup>
                  <col width='30%'/>
                  <col width='900px'/>
                </colgroup>
                <tbody>
                  <tr>
                    <th>약속처방 분류</th>
                    <td>
                      <OBTDropDownList2 list={this.props.clsfList}
                                        value={this.state.set_clsf_cd}
                                        displayType={OBTDropDownList2.DisplayType.text}
                                        onChange={(e)=>this.setState({set_clsf_cd: e.value})}
                                        width='100%'
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>약속 명칭</th>
                    <td>
                      <OBTTextField value={this.state.set_nm} 
                                    onChange={(e)=>this.setState({set_nm: e.value})}
                                    placeHolder='약속처방 명칭을 입력하세요.'
                                    width='100%'
                      />
                    </td>
                  </tr>
                </tbody>
              </OBTFormPanel>
            </div>
          </div>
          <div>
            <div style={{height: '300px'}}>
              <h4>진단</h4>
              <div>
                <div style={{width: '100%', height: '250px'}}>
                  <OBTDataGrid interface={this.state.dgnsGrid}/>
                </div>
                <div>
                  <OBTComplete value={this.state.dgnsKeyword}
                              dataInfo={this.clrm0300dgnsComplete}
                              onSearch={this.handleSearchDgns}
                              onChange={this.handleChangeDgns}
                              placeHolder='진단코드, 진단명으로 검색하세요.'
                              width='100%'
                  />
                </div>
              </div>
            </div>
            <div style={{height: '300px'}}>
              <div className='h-box'>
                <h4>처방</h4>
                <button onClick={this.handleMix}>MIX</button>
                {this.state.mixAlert?
                  <OBTAlert title='선택된 처방이 없습니다.'
                            type={OBTAlert.Type.warning}
                            onClose={()=>this.setState({mixAlert: false})}
                  />
                :<></>}
                <OBTDialog title='mix'
                          open={this.state.mix}
                          width='250px' height='200px'
                          buttons={OBTDialog.Buttons.SaveAndClose(this.handleMixSave, ()=>this.setState({mix: false}))}>
                  <div>
                    {/* <OBTNumberField value={state.mixMount} 
                                    width='100%'
                                    onChange={(e)=>setState({...state, mixMount: e.value})}
                    /> */}
                    <OBTTextField value={this.state.mixMount}
                                  width='100%'
                                  onChange={(e)=>this.setState({mixMount: e.value})}
                    />
                  </div>
                </OBTDialog>
              </div>
              <div>
                <div style={{width: '100%', height: '250px'}}>
                  <OBTDataGrid interface={this.state.prscGrid}/>
                </div>
                <div>
                  <OBTComplete value={this.state.prscKeyword}
                              dataInfo={this.clrm0300PrscComplete}
                              onSearch={this.handleSearchPrsc}
                              onChange={this.handleChangePrsc}
                              placeHolder='처방코드, 처방명, 성분명으로 검색하세요.'
                              width='100%'
                  />
                </div>
              </div>          
            </div>
          </div>
          <div className='f-right'>
            <button onClick={this.handleCancle}>
              취소
            </button>
            <button onClick={()=>this.setState({open: true})}>
              저장
            </button>
            {this.state.open?
              <OBTConfirm title='약속처방 저장' 
                          labelText='약속처방을 저장하시겠습니까?' 
                          type={OBTConfirm.Type.success} 
                          onCancel={()=>this.setState({open:false})} 
                          onConfirm={this.handleConfirm}
              />
            :''}
            <OBTSnackbar labelText='저장되었습니다.'
                        type={OBTSnackbar.Type.success}
                        open={this.state.snack}
                        onChange={()=>this.setState({snack:false})}
            />
          </div>
        </div>
      </>
    );
  }
  // Mix 버튼 클릭 시
  handleMix = (e) => {
    if(this.state.mixList.length === 0) {
      this.setState({
        mixAlert: true
      });
    } else {
      this.setState({
        mix: true
      });
    }
  }
  // Mix 저장
  handleMixSave = (e) => {
    let newList = this.state.prscList.concat();

    newList.map((list, index) => {
      for(let i = 0; i < this.state.mixList.length; i++) {
        if(index === this.state.mixList[i]) {
          list.mix_yn = this.state.mixMount;
        };
      };
    });

    this.setState({
      prscList: newList,
      mix: false,
      mixList: [],
      mixMount: 1
    });

    this.state.prscGrid.readData({
      readPageCallback: () => {
        return new Promise((resolve) => {
          resolve(newList);
        });
      }
    });
  }

  // 취소 버튼 클릭
  handleCancle = () => {
    let clsf_cd = 1;
    let set_nm = '';

    if(this.set_cd !== 0) {
      clsf_cd = this.props.selectedSet.set_clsf_cd;
      set_nm = this.props.selectedSet.set_nm
    }

    this.setState({
      set_nm : set_nm,
      set_clsf_cd : clsf_cd,
      dgnsList: [],
      prscList: []
    })

    this.state.dgnsGrid.clearData();
    this.state.prscGrid.clearData();
  }
}
