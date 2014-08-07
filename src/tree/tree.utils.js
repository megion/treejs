/**
 * Обработчик события выделения узла дерева
 */
mycontrol.onSelectTreeNode = function(event) {
	// IE

	if ($.browser.msie) {
		window.event.cancelBubble = true;
	}
	if (event.stopPropagation) {
		event.stopPropagation();
	}

	var treeControl = this.treeControl;
	var setClosed = (this.opened==null?false:this.opened);
	this.opened = !setClosed;
	var nodeHash = treeControl.getNodeHash(this);
	hutils.loadHistory(nodeHash);
	//treeControl.selectTreeNode(this, true, false, setClosed);
	//alert("Li selected: " + this.id);

	return false;
};

/**
 * В указанном дереве открыть указанный узел
 */
mycontrol.openTreeNode = function(treeId, nodeId) {
	var treeUl = document.getElementById(treeId);
	var treeControl = treeUl.tree;
	var nodeLi = document.getElementById(nodeId);
	treeControl.openNode(nodeLi);
};

/**
 * Предопределенные CSS классы для дерева
 */
mycontrol.TREE_CLASSES = {
	selectedTreeNode : "selected",
	treeNode : "menu",
	open : "open",
	closed : "closed",
	expandable : "expandable",
	expandableHitarea : "expandable-hitarea",
	lastExpandableHitarea : "lastExpandable-hitarea",
	collapsable : "collapsable",
	collapsableHitarea : "collapsable-hitarea",
	lastCollapsableHitarea : "lastCollapsable-hitarea",
	lastCollapsable : "lastCollapsable",
	lastExpandable : "lastExpandable",
	last : "last",
	hitarea : "hitarea"
};