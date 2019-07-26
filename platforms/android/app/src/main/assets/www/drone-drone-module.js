(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["drone-drone-module"],{

/***/ "./src/app/drone/drone.module.ts":
/*!***************************************!*\
  !*** ./src/app/drone/drone.module.ts ***!
  \***************************************/
/*! exports provided: DroneTabModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DroneTabModule", function() { return DroneTabModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _drone_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./drone.page */ "./src/app/drone/drone.page.ts");







var DroneTabModule = /** @class */ (function () {
    function DroneTabModule() {
    }
    DroneTabModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
            imports: [
                _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["IonicModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild([{ path: '', component: _drone_page__WEBPACK_IMPORTED_MODULE_6__["DroneTab"] }])
            ],
            declarations: [_drone_page__WEBPACK_IMPORTED_MODULE_6__["DroneTab"]]
        })
    ], DroneTabModule);
    return DroneTabModule;
}());



/***/ }),

/***/ "./src/app/drone/drone.page.html":
/*!***************************************!*\
  !*** ./src/app/drone/drone.page.html ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n\t<ion-toolbar>\n    <ion-title>\n      Scandit Ionic Sample\n    </ion-title>\n\n    <ion-buttons end>\n        <button ion-button icon-only (click)=\"toggleContinuousMode()\">\n          <ion-icon name=\"infinite\" [color]=\"continuousMode ? 'dark' : 'light'\"></ion-icon>\n        </button>\n    </ion-buttons>\n   </ion-toolbar>\n</ion-header>\n\n<ion-content padding [ngStyle]=\"{ 'margin-top': scanner.contentHeight + 'px' }\">\n  <p text-center *ngIf=\"!barcodes || barcodes.length < 1\">\n    Scan a barcode!\n  </p>\n\n  <p text-center *ngFor=\"let barcode of barcodes\">\n    {{barcode.symbology}}: {{barcode.data}}\n  </p>\n\n  <button full ion-button *ngIf=\"!continuousMode && barcodes && barcodes.length > 0\" (click)=\"resumeScanning()\">Continue Scanning</button>\n</ion-content>\n\n"

/***/ }),

/***/ "./src/app/drone/drone.page.scss":
/*!***************************************!*\
  !*** ./src/app/drone/drone.page.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2Ryb25lL2Ryb25lLnBhZ2Uuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/drone/drone.page.ts":
/*!*************************************!*\
  !*** ./src/app/drone/drone.page.ts ***!
  \*************************************/
/*! exports provided: DroneTab */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DroneTab", function() { return DroneTab; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _providers_scanner_service_scanner_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../providers/scanner-service/scanner.service */ "./src/app/providers/scanner-service/scanner.service.ts");



var DroneTab = /** @class */ (function () {
    function DroneTab(scanner) {
        this.scanner = scanner;
        this.barcodes = [];
        this.continuousMode = false;
    }
    DroneTab.prototype.ionViewDidEnter = function () {
        console.log(this.contentTop);
        this.scanner.contentTop = 70;
        this.scanner.delegate = this;
        this.scanner.start();
    };
    DroneTab.prototype.didScan = function (session) {
        if (!this.continuousMode) {
            session.pauseScanning();
        }
        this.barcodes = session.newlyRecognizedCodes;
    };
    DroneTab.prototype.resumeScanning = function () {
        this.scanner.resume();
        this.barcodes = [];
    };
    DroneTab.prototype.toggleContinuousMode = function () {
        this.continuousMode = !this.continuousMode;
        this.scanner.resume();
    };
    DroneTab = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'dronetab',
            template: __webpack_require__(/*! ./drone.page.html */ "./src/app/drone/drone.page.html"),
            styles: [__webpack_require__(/*! ./drone.page.scss */ "./src/app/drone/drone.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_providers_scanner_service_scanner_service__WEBPACK_IMPORTED_MODULE_2__["ScannerServiceProvider"]])
    ], DroneTab);
    return DroneTab;
}());



/***/ })

}]);
//# sourceMappingURL=drone-drone-module.js.map