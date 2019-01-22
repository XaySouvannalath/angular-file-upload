import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

const URL = 'http://localhost:3000/api/upload';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'docs'});
  public upload_passport: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'passport'
  })
  public upload_family: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'family'
  })
  public upload_personalcard: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'personalcard'
  })

  constructor() { }


  pdfSrc = "http://localhost:3000/uploads/docs-1547001481326.pdf"
  BASE_FILE_URL = "http://localhost:3000/uploads/"
  FILE_NAME = "docs-1547001481326.pdf"


  ngOnInit() {
   this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
  }


  uploadFile(){
    this.uploader.uploadAll()
  console.log(this.uploader.queue)
    //this.uploader.uploadItem
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded:', item, status, response);
      console.log(response)
      alert('File uploaded successfully');
    };
  }

  uploadPersonalCard(){

  }

  uploadFamily(){
    this.upload_family.uploadAll()
  }

}


