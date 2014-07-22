Y.use("node", function (Y) {
	Y.on("domready", function () {

		// initialize all images
		new Y.Squarespace.Loader({
			img: Y.all("img[data-image]:not([data-load])")
		});

		// refresh all images on window resize
		Y.on("windowresize", function () {
			Y.all("img[data-image][src]").each(function (img) {
				ImageLoader.load(img);
			});
		});

	});
});

var sections = Y.all("main > section"),
	currentSectionIndex = 0;

var getSection = function (index) {
	if (index < 0) return null;
	var sectionList = sections.filter(":nth-child(" + (index + 1) + ")");
	if (sectionList && sectionList.size() > 0) return sectionList.item(0);
};

var updateSections = function (force) {

	var region = Y.one(window).get("viewportRegion"),
		newSectionIndex = Math.floor(region.top / region.height);

	if (newSectionIndex !== currentSectionIndex || force === true) {
		currentSectionIndex = newSectionIndex;

		var currentSection = getSection(currentSectionIndex),
			nextSection = getSection(currentSectionIndex + 1),
			previousSection = getSection(currentSectionIndex - 1),
			followingSection = getSection(currentSectionIndex + 2);

		if (nextSection) nextSection.toggleClass("current", true);
		if (currentSection) currentSection.toggleClass("current", true);
		if (previousSection) previousSection.toggleClass("current", false);
		if (followingSection) followingSection.toggleClass("current", false);
	}

};

Y.one(window).on("scroll", updateSections);
Y.on("resize", updateSections);
updateSections(true);

