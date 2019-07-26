import { Injectable, NgZone } from '@angular/core';

@Injectable()
export class ScannerServiceProvider {
  public contentHeight;
  public delegate: ScannerDelegate;

  private picker;
  private _contentTop: number = 0;

  private portraitConstraints: Constraints;
  private landscapeConstraints: Constraints;

  constructor(
    private zone: NgZone,
  ) {
    Scandit.License.setAppKey("AcUdeCTWOU8QCeCwCBcl05QwFCPbKhuZlz4qE3dd3BeEZbJib26KC6pJFNR3S8RIbkiS66tyOzBWDWFyU1sznqV8bJNUVePvMAZfX7pN/5DyTNhcpDg9FvJxl4w0fB49TFR7ry5urx/sZKG03kwX9PxsqGSsRcl73msGxaN/sKNsbw8ueVh64817r6VIVypIlVGSWLJkTRgbbBrSM09PymV4CHh9bwnDRmnBg+pTKAw3Wluvn3erb7wTXIhfZFoltVHLMeJ2BzwbdwcIv2wdRgpxnRwEZasqaGrHj49wWFXiImjXy2Omu11M46vPWX/uIlFQfutL2cn6bWaUaE81+zEQF8qqRWEKXkI2r5NwVOllUpX1sUrfY2xI/cIEUV9XiFMCBrhnRNuMUBG4pXMhdYtVjJu6ZBN/cSdn1DRUV8IRXyTEUVEb4+1XCa53RRoLimscavNwKAJ0LV1RvWIbPz9ms1h1WtjNa0I/6IdFLe2RS+ygJ1mDqh1tPYfiVzeJXkD+xQgsaH9hNuB26CiuLUp49L0Diy7uyxJKBbQfQnWV1mfaMttYly0hJmx73/cRofOLbpPIGZIgdwsx+7AZ5XGXc/1QA9Fam5W45FYVh8w5ruq8x/Fv4e9LAeD8S4tLBq8E5/0kds8DkckZ8LfjTPyqk6rK/KmFjuwc9M6jBMCTOz9k5KVMXXAiWE2+yJcWcOfojWfo3WI5hf6P9vYrhlSrzHIe9i7OTjy70OSfTBc+uLd92+8JS1+g0HWo8DNhQfOJ1tdPZKJJyQ84BaI3VqBxsr+ojBOyW8WKQMarBkaivYdB7zFc3hc6/4nZmjv6+EuicXeGGyKhMcO45GUJmK/VUlMP1b308XtFvRwEj1QOkE25lvu6FQlhaTRj4ni1YH8D0kqmXQKu7BgazhcTgsfdPSVDTVNeguNEGaIZuuEiHb/PLeYGiH4lV0fMqJPdsM+OkesAziawYYO/7j8v4U8iji5vusAvOmHtUv5VXs3TZcWEYIcAyWBKhwv7AdeEiPSz3uwEqDzFAd2exiW5n9j7T24W2vB3u7ovy4ZlBRP7dnmLTUymeLrA6aZnv0Im9a3DU0PvJ6/FB8EHqUJrY8b1FAkaiTlHDnLtf6xKi7XaaWuVHaBRT+y5jjjj++YzWDB+uv4VuliRhnWXQHHWZmzonHfV43Vtc4HANkU5sb1e/cM1Eeogbgk0Fv0=");    
    
    var settings = new Scandit.ScanSettings();
    settings.setSymbologyEnabled(Scandit.Barcode.Symbology.EAN13, true);
    // Instantiate the barcode picker by using the settings defined above.
    this.picker = new Scandit.BarcodePicker(settings);
  }

  public get contentTop(): number {
    return this._contentTop;
  }

  public set contentTop(newValue: number) {
    this._contentTop = newValue;
    this.setScannerConstraints();
  }

  public start(): void {
    // We only want to pause the scanner if not in continuous mode, not stop it, so we're setting it to true here
    this.picker.continuousMode = true;

    this.picker.show({
      didScan: session => {
        if (this.delegate) {
          this.zone.run(() => {
            this.delegate.didScan(session);
          })
        }
      },
    });
    this.picker.startScanning();
  }

  public resume(): void {
    this.picker.resumeScanning();
  }

  // ================================================ //
  // ===== Constraint setting & related helpers ===== //
  // ================================================ //

  private setScannerConstraints(): void {
    const top = this.contentTop;
    if (top === undefined) {
      setTimeout(this.setScannerConstraints.bind(this), 500);
    }

    const topConstraint = top || 0;
    const rightConstraint = 0;
    const bottomConstraint = screen.height / 4;
    const leftConstraint = 0;

    this.contentHeight = screen.height - bottomConstraint - topConstraint;

    console.log(this.contentHeight, topConstraint, rightConstraint, bottomConstraint, leftConstraint);
    this.setConstraints(topConstraint, rightConstraint, bottomConstraint, leftConstraint);
  }

  private setConstraints(top: Constraint, right: Constraint, bottom: Constraint, left: Constraint, animationDuration: number = 0): void {
    const newConstraints = this.getConstraintsWith(top, right, bottom, left);
    this.setPortraitConstraints(newConstraints, animationDuration);
    this.setLandscapeConstraints(newConstraints, animationDuration);
  }

  private setPortraitConstraints(newConstraints: Constraints, animationDuration: number = 0): void {
    if (this.needsConstraintUpdates(this.portraitConstraints, newConstraints)) {
      this.portraitConstraints = newConstraints;
      this.applyConstraints(animationDuration);
    }
  }

  private setLandscapeConstraints(newConstraints: Constraints, animationDuration: number = 0): void {
    if (this.needsConstraintUpdates(this.landscapeConstraints, newConstraints)) {
      this.landscapeConstraints = newConstraints;
      this.applyConstraints(animationDuration);
    }
  }

  private getConstraintsWith(top: Constraint, right: Constraint, bottom: Constraint, left: Constraint, animationDuration: number = 0): Constraints {
    const newConstraints = new Scandit.Constraints();
    newConstraints.topMargin = top;
    newConstraints.rightMargin = right;
    newConstraints.bottomMargin = bottom;
    newConstraints.leftMargin = left;
    return newConstraints;
  }

  private needsConstraintUpdates(constraint: Constraints, newConstraints: Constraints): boolean {
    return !constraint ||
    newConstraints.topMargin !== constraint.topMargin ||
    newConstraints.rightMargin !== constraint.rightMargin ||
    newConstraints.bottomMargin !== constraint.bottomMargin ||
    newConstraints.leftMargin !== constraint.leftMargin
  }

  private applyConstraints(animationDuration: number = 0): void {
    this.picker.setConstraints(this.portraitConstraints, this.landscapeConstraints, animationDuration);
  }

}
