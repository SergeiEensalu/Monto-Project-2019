import Service from "./Service";

export class FileService {
  uploadFileToServer(data) {
    return Service.getRestClient().post("/api/fileUploading", data);
  }
}
