var hutils = new Object();

/**
 * History call back. Load new content form server by AJAX.
 * 
 * @param anchor
 */
hutils.pageload = function (hash) {
	var treeUl = document.getElementById("treePages");
	var treeControl = treeUl.tree;
	treeControl.detectAnchor(hash);
};

/**
 * Initialize and use browser history
 */
$(document).ready(function() {
	if ($.browser.msie && $.browser.version == 8) {
		// Logger.append('You are using IE8 in version ' + document.documentMode
		// + ' compatible mode.');
	}
	// Logger.append('The plugin is running in ' + $.history.type + ' mode.');
	$.history.init(hutils.pageload);
});

hutils.loadHistory = function (hash) {
	// Logger.append('[load history] hash=' + hash);
	$.history.load(hash);
};
