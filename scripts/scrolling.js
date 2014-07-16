var speeds = [],
	tops = [0,0,0,0,0,0,0,0,0,0],
	down = false;

setInterval(function () {

	var region = Y.one(window).get("viewportRegion");
	tops.unshift(region.top);
	tops.pop();

	if (tops[0] - tops[1] < 100 && tops[1] - tops[2] > 100) scrollToNextSection(region);
	if (tops[0] - tops[1] > -100 && tops[1] - tops[2] < -100) scrollToPreviousSection(region);

}, 100);


var scrollToNextSection = function (region) {
	var sectionIndex = Math.floor(region.top / region.height),
		destination = (sectionIndex + 1) * region.height,
		initialSpeed = (tops[0] - tops[1]) * 10, // pixels per second
		distance = destination - region.top,
		targetTime = distance / initialSpeed;
	new Y.Anim({
		duration: targetTime * 2.5,
		node: "win",
		easing: "easeOut",
		to: {
			scroll: [0, (sectionIndex + 1) * region.height]
		}
	}).run();
};

var scrollToPreviousSection = function (region) {
	var sectionIndex = Math.floor(region.top / region.height);
	new Y.Anim({
		duration: 1,
		node: "win",
		easing: "easeOut",
		to: {
			scroll: [0, sectionIndex * region.height]
		}
	}).run();
};

