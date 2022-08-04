import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ref, Storage } from '@angular/fire/storage';
import { getDownloadURL, uploadBytes } from '@firebase/storage';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-my-first-component',
  templateUrl: './my-first-component.component.html',
  styleUrls: ['./my-first-component.component.css']
})
export class MyFirstComponentComponent implements OnInit {

  uploadTask!:any;
  myImgUrl!:any;

  constructor(private readonly _storage:Storage) { }

  @Input() public inputValue? : string;

  @Output() public outputValue : EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {}

  emitEvent(){
    console.log(`[INFO] EmitEvent to parent component`);
    this.outputValue.emit("evt from child");
  }

  raiseEvent(event:any){
    console.log("event : ",event);
    this.uploadFile(event.target.files[0]);
  }

  async uploadFile(file:File):Promise<string>{
    const filePath = Date.now() + "/" + file.name;
    const storageRef = ref(this._storage, filePath);
    this.uploadTask = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(this.uploadTask.ref);
    this.myImgUrl = url;
    return url;
  }

  startDownload(){
    // NPM file-saver
    const filename = this.myImgUrl.split("/").pop();
    FileSaver.saveAs(this.myImgUrl,filename);
  }
}
