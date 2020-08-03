/*
Delay Bar replacement
this replacement Delay bar will deplete using an animation frame, and will always ensure
that the previous animation is cancelled, before starting a new one
*/

// Define our Variables so we can easily substitute name changes in interface code
var theDelayBar = BarneyDiv
var delayLeftHalf = theDelayBar.children[0].rows[0].cells[1]
var delayRightHalf = theDelayBar.children[0].rows[0].cells[2]


delayRightHalf.width = `100%`
var delayBarAnimation // we define this to use later

// doDelay will initiate a new delay, with x as the parameter for how long in
// ms the delay should last (e.g doDelay(500)) will result in a 500 ms delay
function doDelay(y) {
  window.cancelAnimationFrame(delayBarAnimation);
  requestAnimationFrame((timestamp) => {
    starttime = timestamp || new Date().getTime();
    processDelay(timestamp, theDelayBar, 100, y, true);
  });
}

// updateDelay will insert a new delay timer on an active delay, and resume from
// where the current one left off
// i.e if the delay has depleted 50 percent and updateDelay(1000) is called,
// it will take 1000 ms to deplete the remaining 50 percent
function updateDelay(y) {
  window.cancelAnimationFrame(delayBarAnimation);
  requestAnimationFrame((timestamp) => {
    starttime = timestamp || new Date().getTime();
    processDelay(timestamp, theDelayBar, parseInt(percentRemaining), y);
  });
}

// Process delay is not designed to be called directly, use one of the helper functions,
// doDelay, or updateDelay
function processDelay(timestamp, el, dist, duration, red = 0) {
  const runtime = timestamp - starttime;

  let progress = runtime / duration;
  progress = Math.min(progress, 1);
  percentRemaining = 100 - (progress * 100);
  delayLeftHalf.attributes.width.nodeValue = `${(dist * (1 - progress)).toFixed(2)}%`
  if (runtime < duration) {
    delayBarAnimation = requestAnimationFrame((timestamp) => {
      processDelay(timestamp, el, dist, duration, red);
    });
  }
}
