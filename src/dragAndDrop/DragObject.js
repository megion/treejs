function DragObject(element, autoScrollContainer) {
	element.dragObject = this;

	dragMaster.makeDraggable(element);

	// var rememberPosition = null;
	var mouseOffset = null;
	var objectClone = null;

	/**
	 * В текущей реализации отрывает объект "от земли" и запоминает текущую
	 * позицию в rememberPosition и сдвиг курсора мыши от левого-верхнего угла
	 * объекта в mouseOffset.
	 * 
	 * В другой реализации может показывать перенос как-то по-другому, например
	 * создавать "переносимый клон" объекта.
	 */
	this.onDragStart = function(offset) {
		objectClone = document.createElement("span");
		objectClone.setAttribute("class", "menu");
		objectClone.innerHTML = element.innerHTML;
		objectClone.style.position = 'absolute';
		document.body.appendChild(objectClone);

		/*
		 * var s = element.style; rememberPosition = { top : s.top, left :
		 * s.left, position : s.position };
		 */
		// s.position = 'absolute';
		autoScrollContainer.onDragStart();

		mouseOffset = offset;
	};

	this.hide = function() {
		objectClone.style.visibility = 'hidden';
	};

	this.show = function() {
		objectClone.style.visibility = 'visible';
	};

	this.onDragMove = function(x, y) {
		// element.style.top = y - mouseOffset.y + 'px';
		// element.style.left = x - mouseOffset.x + 'px';

		objectClone.style.top = y - mouseOffset.y + 'px';
		objectClone.style.left = x - mouseOffset.x + 'px';
		
		autoScrollContainer.onDragMove(x, y);

		
		//container.scrollTop = container.scrollTop - (x - startX);
		// container.scrollLeft=container.scrollLeft + (y-startY);
	};

	this.onDragSuccess = function(dropTarget) {
	};

	this.onDragFail = function() {
		// var s = element.style;
		// s.top = rememberPosition.top;
		// s.left = rememberPosition.left;
		// s.position = rememberPosition.position;
		document.body.removeChild(objectClone);
		objectClone = null;

	};

	this.toString = function() {
		return element.id;
	};

	this.getId = function() {
		return element.id;
	};
}