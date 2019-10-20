import React, { Component } from "react";
import { FileService } from "./FileService";
import AppNav from "../AppNav";

class FileUploader extends Component {
  constructor() {
    super();
    this.fileService = new FileService();
  }

  handleUploadFile = event => {
    const data = new FormData();
    let file = event.target.files[0];
    data.append("file", event.target.files[0]);
    data.append("name", "my_file");
    this.fileService
      .uploadFileToServer(data)
      .then(response => {
        console.log("File " + file.name + " is uploaded");
        alert("File uploaded successfully.");
      })
      .catch(function(error) {
        console.log(error);
        if (error.response) {
          console.log(
            "Upload error. HTTP error/status code=",
            error.response.status
          );
        } else {
          console.log("Upload error. HTTP error/status code=", error.message);
        }
      });
  };

  render() {
    return (
      <div>
        <AppNav />
        <div class="wrapper">
          <div class="file-upload">
            <input type="file" onChange={this.handleUploadFile} />
            <i class="fa fa-arrow-up"></i>
          </div>
        </div>
      </div>
    );
  }
}
export default FileUploader;
