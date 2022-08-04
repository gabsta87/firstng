import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: `./app.component.html`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FirstNg';
  prop1 = "angular binding test";

  myMethod(param:any){
    console.log("myMethod called ",param);
    this.prop1 = "Title clicked"
  }

  myOutputMethod(param: string){
    console.log("output in component.ts is working");
    this.prop1 = "final step of output in component.ts is working";
    console.log("message : ",param);
  }
}

