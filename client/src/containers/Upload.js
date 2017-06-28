import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dropzone from 'react-dropzone';
import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
import IconButton from 'material-ui/IconButton';
import ContentClear from 'material-ui/svg-icons/content/clear';
import {red500} from 'material-ui/styles/colors';
import Request from 'superagent';

const apiBaseUrl = "http://localhost:3001/api/";

injectTapEventPlugin();
export default class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filesPreview: [],
      filesToBeSent: [],
      rejectedFiles: [],
      filecount: 8,
    }
  }
            
  onDrop (acceptedFiles, rejectedFiles) {
    let filesToBeSent = this.state.filesToBeSent;
    let filesPreview = this.state.filesPreview;
    
    for (let i in acceptedFiles) {
      if (filesToBeSent.length < this.state.filecount) {
        filesToBeSent.push(acceptedFiles[i]);
        filesPreview.push(acceptedFiles[i].name)
        this.setState({filesToBeSent, filesPreview});
      }
      else {
        alert(`Could not upload ${acceptedFiles[i].name}. You have reached the file upload limit.`)
      }
    }
       
    this.setState({rejectedFiles})
  }

  deleteElement (index) {
    this.setState({
      filesToBeSent: this.state.filesToBeSent.filter((event, i) => {
        return i !== index;
      }),
      filesPreview: this.state.filesPreview.filter((event, i) => {
        return i !== index;
      })
    });
  }

  handleClick (event) {
    if (this.state.filesToBeSent.length > 0) {
      let filesArray = this.state.filesToBeSent;
      let req = Request.post(apiBaseUrl + 'upload');

      for (let i in filesArray) {
        req.attach(filesArray[i].name, filesArray[i])
        console.log(filesArray[i].name)
      }
      
      req.end((err, res) => {
        if (err) {
          console.log("error ocurred", err);
        }
        //console.log("res", res);
        //alert("File upload completed")
      });
    }
    else {
      alert("Please upload some files first");
    }
  }

  render() {

    const FileList = this.state.filesPreview.map((file, index) => 
      <li key={index} style={style.list}>
        {file}
        <MuiThemeProvider>
          <IconButton tooltip="Remove File" onClick={() => this.deleteElement(index)} >
            <ContentClear color={red500} />
          </IconButton>
        </MuiThemeProvider>
      </li>
    )

    return (
      <div className="upload">
        <MuiThemeProvider>
          <div>
            {/*appbar*/}
          </div>
        </MuiThemeProvider>
        <center>
          <div style={style.divStyle}>
            You can upload {this.state.filecount - this.state.filesToBeSent.length} files.
          </div>
          <Dropzone accept=".txt, .csv, text/plain, application/vnd.ms-excel" onDrop={(files, rejected) => this.onDrop(files, rejected)}>
            <div>
              Drop files here or click to select files.
            </div>
          </Dropzone>
          <div style={style.divStyle}>
            Files added:
            <ul style={style.list}>
              {FileList}
            </ul>
          </div>
        </center>
        {/*files uploading*/}
        <MuiThemeProvider>
          <RaisedButton label="Upload Files" primary={true} style={style.button}
            onClick={(event) => this.handleClick(event)}
          />
        </MuiThemeProvider>
      </div>
    )
  }
}

const style = {
  divStyle: {
    margin: 15
  },
  button: {
    margin: 15
  },
  list: {
    listStyle: 'none'
  }
};