import React from 'react';
import { OBTMultiLineTextField, OBTTab, OBTTabs, OBTTooltip } from 'luna-orbit';
import dayjs from 'dayjs';
import img_empty_user_s from '../../../css/imgs/CLR/CLRS0102/img_empty_user_s.svg'
import '../../../css/CLR/CLRS0102.scss'
import CRA1021 from './CRA1021';

export default class CRA1020 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      tab: '1',
      rcpn_memo: '',
      clr_memo: '',
      patient: {}
    }
  }
  
  render() {
    return (
      <>
        <div className="patient-info-container">
          <div className='h-box'>
            <div className="h-box w-full info-top flex-1">
              <div className="user-info bold flex-1">환자정보</div>
              {/* {!pid ?
                <></>
              :
                <div className="btn-collection">
                  <div className="btn-box" onClick={()=>this.setState({open:true})}><div className="patient-edit"/></div>
                </div>
              } */}
            </div>
            {/* <CLRS0102_1 state={this.state} handleClose={handelClose} patient={patient} setPatient={setPatient}/> */}
            <CRA1021 />
          </div>
          <div className="pannel-line"></div>
          {/* {!pid ?  */}
          {/* (<div className="user-info-empty">
              <img src={img_empty_user_s} alt="환자정보가 없습니다." />
              <span style={{ fontSize: '12px', color: '#8c8c8c', marginTop: '10px'}}>선택된 환자가 없습니다.</span>
            </div>) */}
            {/* :( */}
            <div>
              <div className="patient-detail">
                <div className='h-box'>
                  <div className="pt-name">{this.state.patient.pt_nm}</div>
                  <div className="ic-container">
                    {/* {this.state.patient.cncn_pt_yn === 'Y' ?
                      // <OBTTooltip className='favorite' labelText='관심 환자입니다.' onClick={() => handleBookmark('N')}/>
                    :
                      // <OBTTooltip className='favorite_off' labelText='관심 환자 표시영역입니다.' onClick={() => handleBookmark('Y')}/>
                    } */}
                    {this.state.patient.priv_pt_yn === 'Y' ?
                      <OBTTooltip className="warning" labelText='사생활보호 환자 입니다.'/>
                    : <></>}
                    {this.state.patient.vip_pt_yn === 'Y' ?
                      <OBTTooltip className="vip" labelText='VIP 환자 입니다.'/>
                    : <></>}
                    {this.state.patient.pat_cnts !== null && this.state.patient.pat_cnts !== ''? 
                      <OBTTooltip className="memo_on" labelText={this.state.patient.pat_cnts}/>
                    :<div className="memo_off"></div>}
                  </div>
                </div>
                <div className='h-box patient-data'>
                  <div>{this.state.patient.pid}</div>
                  <div>{this.state.patient.sex_age}</div>
                  <div>{this.state.patient.dobr}</div>
                </div>
                <div className='h-box patient-util'>
                  <OBTTooltip className='flex-1 location ellipsis' labelText={(this.state.patient.basc_addr !== null ? this.state.patient.basc_addr : '') + ' ' + (this.state.patient.detl_addr !== null ? this.state.patient.detl_addr : '')}>
                    <span>{this.state.patient.basc_addr} {this.state.patient.detl_addr}</span>
                  </OBTTooltip>
                  <div className='flex-1 call'>
                    <span>{this.state.patient.clph_no}</span>
                  </div>
                </div>
              </div>
              <div className="pannel-line"></div>
              <div className='h-box patient-division center'>
                <div className='flex-1'>
                  <div>보험구분</div>
                  <div className="badge">
                    {/* <span>{patient.insn_tycd}</span> */}
                    <span>건보</span>
                  </div>
                </div>
              <div className='flex-1'>
                <div>초/재진구분</div>
                <div className="badge">
                  {/* <span>{patient.fvnr_dvcd}</span> */}
                  <span>재진</span>
                </div>
              </div>
              <div className='flex-1'>
                <div>보조구분</div>
                {/* <div>{patient.type_asst_cd}</div> */}
                <div>중증암</div>
              </div>
              <div className='flex-1'>
                <div>내원경로</div>
                {/* <div>{patient.cmhs_path_cd}</div> */}
                <div>지인추천</div>
              </div>
                <div className='flex-1'>
                  <div>내원일</div>
                  <div>{dayjs(this.state.patient.mdcr_date).format('YY-MM-DD')}</div>
                </div>
              </div>
              <div className="pannel-line"></div>
              <div>
                <OBTTabs value={this.state.tab} onChange={(e)=>this.setState({tab: e.value})}>
                  <OBTTab labelText='접수메모' value='1'>
                    <OBTMultiLineTextField value={this.state.rcpn_memo}
                                          placeHolder='접수메모를 입력하세요.'
                                          fixed={true} 
                                          width='100%'
                                          height='65px'
                                          onChange={(e)=>this.setState({rcpn_memo: e.value})}
                                          // onBlur={()=>{handleSave('rcpn')}}
                    />
                    
                  </OBTTab>
                  <OBTTab labelText='진료메모' value='2'>
                    <OBTMultiLineTextField value={this.state.clr_memo}
                                          placeHolder='진료메모를 입력하세요.'
                                          fixed={true} 
                                          width='100%'
                                          height='65px'
                                          onChange={(e)=>this.setState({clr_memo: e.value})}
                                          // onBlur={()=>{handleSave('CLR')}}
                    />
                  </OBTTab>
                </OBTTabs>
              </div>
            </div>
          {/* ) */}
          {/* } */}
        </div>
      </>
    );
  }
}
