import { Component, ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  template: '<signature-pad [options]="signaturePadOptions" (onBeginEvent)="drawStart()" (onEndEvent)="drawComplete()"></signature-pad>',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild(SignaturePad,null) signaturePad: SignaturePad;
 
  private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 5,
    'canvasWidth': 500,
    'canvasHeight': 300
  };
 
  constructor() {
    // no-op
  }
 
  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }
 
  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    console.log(this.signaturePad.toDataURL());
  }
 
  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }
}


