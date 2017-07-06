import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dropzone from 'react-dropzone';
import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
import IconButton from 'material-ui/IconButton';
import ContentClear from 'material-ui/svg-icons/content/clear';
import {red500} from 'material-ui/styles/colors';
import Request from 'superagent';

import Loading from '../components/Loading';
import LoadingComplete from '../components/LoadingComplete';

injectTapEventPlugin();
export default class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filesPreview: [],
      filesToBeSent: [],
      rejectedFiles: [],
      filecount: 8,
      filesUploading: false,
      filesUploaded: false
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
       
    this.setState({
      rejectedFiles,
      filesUploading: false,
      filesUploaded: false
    })
  }

  deleteElement (index) {
    this.setState({
      filesToBeSent: this.state.filesToBeSent.filter((event, i) => {
        return i !== index;
      }),
      filesPreview: this.state.filesPreview.filter((event, i) => {
        return i !== index;
      }),
      filesUploading: false,
      filesUploaded: false
    });
  }

  handleClick(event) {
    if (this.state.filesToBeSent.length > 0) {
      let filesArray = this.state.filesToBeSent;
      let req = Request.post('api/upload');

      for (let i in filesArray) {
        req.attach('files', filesArray[i])
      }

      this.setState({
        filesUploading: true,
        filesUploaded: false
      });
      
      req.end((err, res) => {
        if (err) {
          console.log("error ocurred", err);
        }
        this.setState({
          filesPreview: [],
          filesToBeSent: [],
          filesUploading: false,
          filesUploaded: true
        });
      });
    }
    else {
      alert("Please upload some files first");
    }
  }

  onRequest() {
    Request
      .get('reports/lessnine')
      .end( (err, res) => {
        if (err) {
          console.log(err)
        }
        let sku = res.body;
        console.log(sku)
        //this.setState({skus: [...this.state.skus, sku]})
      });
  }

  render() {

    const FileList = this.state.filesPreview.map((file, index) => 
      <li key={index} style={styles.list}>
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
        <button onClick={(event) => this.onRequest(event)}>click</button>
        <MuiThemeProvider>
          <div>
            {/*appbar*/}
          </div>
        </MuiThemeProvider>
        <center>
          <div style={styles.divStyle}>
            You can upload {this.state.filecount - this.state.filesToBeSent.length} files.
          </div>
          <div className='drop-area' style={styles.dropArea}>
            <Dropzone 
              accept=".txt, .csv, text/plain, application/vnd.ms-excel"
              style={styles.dropzoneStyle} 
              onDrop={(files, rejected) => this.onDrop(files, rejected)}>
              <div>
                Drop files here or click to select files.
              </div>
            </Dropzone>
          </div>
          <MuiThemeProvider>
            <RaisedButton label="Upload Files" primary={true} disabled={this.state.filesToBeSent.length === 0 ? true : false } style={styles.button}
              onClick={(event) => this.handleClick(event)}
            />
          </MuiThemeProvider>
          {
            
            (this.state.filesUploading) ? 
              <div style={styles.divStyle}>
                <Loading />
              </div> : (this.state.filesUploaded) ?
              <div style={styles.divStyle}>
                <LoadingComplete />
              </div> : null
          }
          <div style={styles.filesListStyle}>
            Files Pending Upload:
            <ul style={styles.list}>
              {FileList}
            </ul>
          </div>
        </center>
      </div>
    )
  }
}

const styles = {
  dropzoneStyle: {
    width: '80%',
    height: '100%',
    border: '1px groove rgb(232, 232, 232)',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dropArea: {
    width: '100vw',
    height: 360
  },
  divStyle: {
    margin: 15
  },
  button: {
    margin: 15
  },
  filesListStyle: {
    marginTop: 15
  },
  list: {
    listStyle: 'none',
    margin: 0
  }
};