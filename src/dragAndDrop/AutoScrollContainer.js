/**
 * 
 * @param managedScrollContainer
 *            элемент полосой прокруткой которого необходимо управлять
 * @returns {AutoScrollContainer}
 */
function AutoScrollContainer(managedScrollContainer) {

	var rememberBound = null;

	this.onDragStart = function() {
		var containerOffset = getOffset(managedScrollContainer);
		rememberBound = {
			minY : containerOffset.top,
			minX : containerOffset.left,
			maxY : containerOffset.top + managedScrollContainer.clientHeight,
			maxX : containerOffset.left + managedScrollContainer.clientWidth
		};
		//log("Container rect: minY=" + rememberBound.minY + ", minX: "
				//+ rememberBound.minX + ", maxY: " + rememberBound.maxY
				//+ ", maxX: " + rememberBound.maxX);
	};

	this.onDragMove = function(x, y) {

		if (y >= rememberBound.maxY) {
			// курсор находится внизу контейнера
			if ((managedScrollContainer.scrollTop + managedScrollContainer.clientHeight) < managedScrollContainer.scrollHeight) {
				managedScrollContainer.scrollTop = managedScrollContainer.scrollTop + 10;
			}
		} else if (y <= rememberBound.minY) {
			// курсор находится у верхней границы элемента контейнера
			if (managedScrollContainer.scrollTop > 0) {
				// необходимо прокрутить вверх
				managedScrollContainer.scrollTop = managedScrollContainer.scrollTop - 10;
			}
		}
	};

}
