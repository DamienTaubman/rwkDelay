
class RwkDelayBar {
  constructor() {
    this.uiElement = BarneyDiv
    this.leftHalf = this.uiElement.children[0].rows[0].cells[1]
    this.rightHalf = this.uiElement.children[0].rows[0].cells[2]
    this.delayBarAnimation
    this.startTime = ``
    this.percentRemaining = 0

    this.rightHalf.width = `100%`
  }

  doDelay(y) {
    window.cancelAnimationFrame(this.delayBarAnimation);
    requestAnimationFrame((timestamp) => {
      this.startTime = timestamp || new Date().getTime();
      this.processDelay(timestamp, this.uiElement, 100, y, true);
    });
  }

  updateDelay(y) {
    window.cancelAnimationFrame(this.delayBarAnimation);
    requestAnimationFrame((timestamp) => {
      this.startTime = timestamp || new Date().getTime();
      this.processDelay(timestamp, this.uiElement, parseInt(this.percentRemaining), y);
    });
  }

  processDelay(timestamp, el, dist, duration, red = 0) {
    const runtime = timestamp - this.startTime;

    let progress = runtime / duration;
    progress = Math.min(progress, 1);
    this.percentRemaining = 100 - (progress * 100);
    this.leftHalf.attributes.width.nodeValue = `${(dist * (1 - progress)).toFixed(2)}%`
    if (runtime < duration) {
      this.delayBarAnimation = requestAnimationFrame((timestamp) => {
        this.processDelay(timestamp, el, dist, duration, red);
      });
    }
  }
}
