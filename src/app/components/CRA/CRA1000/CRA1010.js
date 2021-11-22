import React from 'react';
import { OBTDialog, OBTDatePicker, OBTDropDownList2 } from 'luna-orbit';
import '../../../css/CLR/CLRS0101.scss';
import ic_setting_s from '../../../css/imgs/CLR/CLRS0101/ic_setting_s.svg';
import ic_arr_left_green from '../../../css/imgs/CLR/CLRS0101/ic_arr_left_green.svg';

export default class CRA1010 extends React.Component {
  state = {
    open: false, // 다이얼로그 열림 여부를 설정합니다.
    alert: false, // 확인 버튼을 눌렀을 때 나오는 alert의 여부를 설정합니다.
    todayDate: new Date(), // DatePicker value
    doctor: '2', // DropDownList 선택 의사
    selectedMenu: '대기', // 선택된 접수상태
    rcpn_stat_cd: ['R', 'M'], // 접수상태코드
    stat1Count: 0, // 대기 환자 수
    stat2Count: 0, // 보류 환자 수
    stat3Count: 0, // 예약 환자 수
    stat4Count: 0, // 완료 환자 수
    statAllCount: 0, // 전체 환자 수
  };

  // 버튼 열기 처리
  handleClick = (e) => {
    this.setState({
      open: true,
    });
  };

  // 버튼 확인 처리
  handleConfirm = (e) => {
    this.setState(
      {
        open: false,
      },
      () => {
        this.setState({
          alert: true,
        });
      },
    );
  };

  // 버튼 캔슬 처리
  handleCancel = (e) => {
    this.setState({
      open: false,
    });
  };

  render() {
    //컴포넌트에 들어갈 리스트입니다.
    const list = [
      { value: '1', text: '전체' },
      { value: '2', text: '김의사' },
      { value: '3', text: '이의사' },
      { value: '4', text: '박의사' },
      { value: '5', text: '최의사' },
    ];

    const MenuButton = [{ stat1: '대기' }, { stat2: '보류' }, { stat3: '예약' }, { stat4: '완료' }, { statAll: '전체' }];

    return (
      <>
        <div className="lside-btn-close">
          <img src={ic_arr_left_green} alt="" />
        </div>

        <div className="lside-topBox">
          <div className="title-line">
            <span className="lside-title">환자현황</span>
            <button
              className="option-btn-box"
              onClick={() => {
                this.handleClick();
              }}
            >
              <img src={ic_setting_s} alt="" />
            </button>
            <OBTDialog open={this.state.open} buttons={OBTDialog.Buttons.ConfirmAndCancel(this.handleConfirm, this.handleCancel)} title="설정" type={OBTDialog.Type.small}>
              상태 | 시간 | 이름 | 등록번호 | 성별 | 나이 | 호출 | 보험구분 | 초재진구분 | 진료의 | 진료과
            </OBTDialog>
          </div>
          <div className="select-line">
            <span>
              <OBTDatePicker format={OBTDatePicker.Format.YYYYMMDD} value={this.state.todayDate} inputStyle={{ width: 102 }} onChange={(e) => this.setState({ todayDate: e.value })} />
            </span>
            <span>
              <OBTDropDownList2 displayType={OBTDropDownList2.DisplayType.text} width="105px" list={list} value={this.state.doctor} onChange={(e) => this.setState({ doctor: e.value })} />
            </span>
          </div>
          <div className="lside-topBox-btnArea">
            <button
              className={this.state.selectedMenu === '대기' ? 'btn-on' : ''}
              onClick={() => {
                this.setState({ rcpn_stat_cd: ['R', 'M'], selectedMenu: '대기' });
              }}
            >
              대기 {this.state.stat1Count}
            </button>
            <button
              className={this.state.selectedMenu === '보류' ? 'btn-on' : ''}
              onClick={() => {
                this.setState({ rcpn_stat_cd: ['W'], selectedMenu: '보류' });
              }}
            >
              보류 {this.state.stat2Count}
            </button>
            <button
              className={this.state.selectedMenu === '예약' ? 'btn-on' : ''}
              onClick={() => {
                this.setState({ rcpn_stat_cd: ['V'], selectedMenu: '예약' });
              }}
            >
              예약 {this.state.stat3Count}
            </button>
            <button
              className={this.state.selectedMenu === '완료' ? 'btn-on' : ''}
              onClick={() => {
                this.setState({ rcpn_stat_cd: ['D', 'T'], selectedMenu: '완료' });
              }}
            >
              완료 {this.state.stat4Count}
            </button>
            <button
              className={this.state.selectedMenu === '전체' ? 'btn-on' : ''}
              onClick={() => {
                this.setState({ rcpn_stat_cd: ['V', 'R', 'M', 'T', 'D', 'W'], selectedMenu: '전체' });
              }}
            >
              전체 {this.state.statAllCount}
            </button>
          </div>
          <div style={{ fontSize: '9px' }} className="lside-grid-area"></div>
        </div>
      </>
    );
  }
}
