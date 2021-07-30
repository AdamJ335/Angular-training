import {ErrorHandler} from "@angular/core";

export class AppErrorHandler implements ErrorHandler {

  handleError(error:Error){
    alert("An unexpected error occured.");
    console.log(error);
  }
}
