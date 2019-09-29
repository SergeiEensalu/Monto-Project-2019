import Service from "./Service";

export class FileService {
  uploadFileToServer(data) {
    //returns Promise object
    return Service.getRestClient().post("/fileUploading", data);
  }
}
