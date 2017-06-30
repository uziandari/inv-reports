import React, { Component } from 'react';

import UploadFiles from './UploadFiles';

import LessNineReport from './LessNineReport';

class App extends Component {
  render() {
    return (
      <div className="App">
        <UploadFiles />
        {/*<LessNineReport />*/}
      </div>
    );
  }
}

export default App;
