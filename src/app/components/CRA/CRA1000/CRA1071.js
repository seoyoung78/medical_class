import React from 'react';
import { OBTDialog, OBTDataGrid, OBTDataGridInterface } from 'luna-orbit';

export default class CRA1071 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: '',
      check: []
    }
  };

  getGrid () {
    return new OBTDataGridInterface('grid_cloumn_type', {
      
    })
  };

  render() {
    return (
      <>
        <div>
          진단 환경설정
        </div>
      </>
    );
  }
}
