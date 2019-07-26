import { Component } from '@angular/core';

import { ScannerServiceProvider } from '../providers/scanner-service/scanner.service';

@Component({
	selector: 'dronetab',
	templateUrl: 'drone.page.html',
	styleUrls: ['drone.page.scss']
})
export class DroneTab implements ScannerDelegate {
	public barcodes: Barcode[] = [];
	public continuousMode: boolean = false;
	private contentTop: number;

  	constructor(
  		public scanner: ScannerServiceProvider
  	) {
  		
  	}

	public ionViewDidEnter(): void {
		console.log(this.contentTop);
   	this.scanner.contentTop = 70;
   	this.scanner.delegate = this;
   	this.scanner.start();
  	}

  	public didScan(session: ScanSession) {
   	if (!this.continuousMode) {
      	session.pauseScanning();
    	}
    	this.barcodes = session.newlyRecognizedCodes;
  	}

  	public resumeScanning() {
   	this.scanner.resume();
   	this.barcodes = [];
  	}

  	public toggleContinuousMode() {
   	this.continuousMode = !this.continuousMode;
   	this.scanner.resume();
  	}
}