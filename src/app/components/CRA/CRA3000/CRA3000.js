import React from 'react';
import { OBTComplete, OBTConfirm, OBTSnackbar, OBTTreeView } from 'luna-orbit';
import trashcan from '../../../css/imgs/ic_trashcan_m_normal.svg';
import file from '../../../css/imgs/CLR/CLRS0103/ic_file_menu.svg';
import folder from '../../../css/imgs/CLR/CLRS0103/ic_folder.svg';
import folder_open from '../../../css/imgs/CLR/CLRS0103/ic_folder_open.svg';
import img_empty_rx_check_s from '../../../css/imgs/img_empty_rx_check_s.svg';
import CRA3001 from './CRA3001';
import '../../../css/index.scss'

export default class CRA3000 extends React.Component {
  pageContainer = this.props.pageContainer;
  util = this.props.util;

  constructor(props) {
    super(props);
    this.pageContainer.initialize({
      mainButtons: this.getMainButtons(),
      isSideBarCollapsed: false,
    });
    this.state = {
      keyword: '',  // 약속처방 검색 키워드 저장 및 설정
      clsfList: [{}], // 약속처방 상위 분류 목록 저장
      list: [], // 약속처방 목록 저장
      set_cd: -1, // 선택된 약속처방 코드
      set: {},  // 선택된 약속처방
      overItem: 0,  // 마우스 오버시 약속처방 코드 저장
      childrenSet: [],  // 하위 약속처방 저장
      open: false,  // 삭제 시 확인 Confirm value
      snack: false  // 삭제 확인 버튼 클릭 시 snackbar value
    };
  };

  // TreeView로 변환
  onMap(e) {
    let list = e.list;
    if(list.set_cd === 1) {
      e.item = {
        key : list.set_cd,
        parentKey: list.set_clsf_cd,
        labelText: list.set_nm,
        imageUrl: 
         {
          normal: {
            open: folder_open,
            close: folder
          }
        },
        collapsed: false
      }
    } else {
      e.item = {
        key: list.set_cd,
        parentKey: list.set_clsf_cd,
        labelText: list.set_nm,
        imageUrl: file,
        collapsed: false
      }
    }
  };

  render() {
    return (
      <>
        <div className='flex'>
          <div className='flex-1'>
            <div className='h-box'>
              <h3>약속처방 목록</h3>
              <button className='right' onClick={()=>this.setState({set_cd: 0})}>
                추가
              </button>
            </div>
            
            <div>
              <div className='h-box'>
                <OBTComplete value={this.state.keyword}
                            dataInfo={this.clrm0300SetComplete}
                            placeHolder='약속처방을 검색하세요'
                            onChange={(e)=>{this.setState({keyword: e.value}); this.handleSelect(e)}}
                            onSearch={this.handleSearch}
                            width='90%' 
                />
              </div>
              <div>
                <OBTTreeView list={this.state.list} width='90%' height='700px'
                            onMapItem={this.onMapItem}
                            childCount={true}
                            selectedItem={this.state.set_cd}                           
                            onAfterSelectChange={this.handleSelect}
                            onMouseEnter={(e)=>this.setState({overItem: e.item.set_cd})}
                            images={[
                              <>
                              {this.state.overItem !== 1 ?
                                <div onClick={()=>{this.setState({open: true})}} 
                                onMouseEnter={this.handleBtn}>
                                  <img src={trashcan} alt=''/>
                                </div>
                              :<></>}
                              </>
                            ]}
                />
                {this.state.open?
                  <OBTConfirm title='약속처방 삭제'
                              labelText={(this.state.childrenSet.length > 1 ? '하위 약속처방도 삭제됩니다. ':'') + '선택한 약속처방을 삭제하시겠습니까?'}
                              type={OBTConfirm.Type.success}
                              onCancel={()=>this.setState({open: false})}
                              onConfirm={this.handleDelete}
                  />
                :<></>}
                <OBTSnackbar labelText='삭제되었습니다.'
                            type={OBTSnackbar.Type.success}
                            open={this.state.snack}
                            onChange={()=>this.setState({snack: false})}
                />
              </div>
            </div>
          </div>
          <div className='flex-3'>
            {this.state.set_cd === -1 ?
              <div className='center'>
                <img src={img_empty_rx_check_s} alt=''/>
                <div>등록된 약속처방이 없습니다. <br/>아래 버튼을 눌러 약속처방을 추가해 주세요.</div>
                <button onClick={()=>this.setState({set_cd:0})}>
                  새 약속처방 추가
                </button>
              </div>
              :
              // <CLRM0300_1 set_cd={state.set_cd} selectedSet={state.set} clsfList={state.clsfList}/>
              <CRA3001 set_cd={this.state.set_cd} selected_set={this.state.set} clsfList={this.state.clsfList}/>
            }
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
