import React from 'react';
import { OBTButton, OBTDatePicker, OBTDialog, OBTDropDownList2, OBTFormPanel, OBTMultiLineTextField, OBTSnackbar, OBTTextField, OBTTimePicker } from 'luna-orbit';

export default class CRA1021 extends React.Component {
  dialog = this.props.dialog;
  
  render() {
    return (
      <>
        <div>
          환자정보수정
        </div>
        <div>
          접수정보수정
        </div>
      </>
    );
  }
}
