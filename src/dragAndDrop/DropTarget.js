/**
 * Обобщенный объект-акцептор, потенциальная цель переноса. Может быть большим
 * контейнером или маленьким элементом - не важно.
 * 
 * Поддерживаются вложенные DropTarget: объект будет положен туда, куда следует,
 * вне зависимости от степени вложенности.
 * 
 * @param element
 * @returns {DropTarget}
 */
function DropTarget(element) {
	element.dropTarget = this;

	var rememberClassName = null;
	var position = null;

	/**
	 * При проносе объекта над DropTarget, dragMaster спросит у акцептора, может
	 * ли он принять dragObject. Если нет - dragMaster проигнорирует этот
	 * акцептор.
	 */
	this.canAccept = function(dragObject) {
		if (element.id==dragObject.getId()) {
			// запрет принимать объект в самого себя
			return false;
		}
		return true;
	};

	/**
	 * Принимает переносимый объект. Объект может быть перемещен(в другой
	 * каталог) или уничтожен(корзина) - зависит от вашей логики обработки
	 * переноса.
	 */
	this.accept = function(dragObject) {
		this.onLeave();

		dragObject.hide();

		alert("Акцептор '" + this + "': принял объект '" + dragObject + "'");
	};

	this.onLeave = function() {
		element.className = rememberClassName;
	};

	this.onEnter = function() {
		if (element.className) {
			rememberClassName = element.className;
			element.className = rememberClassName + ' enterTarget enterCenterTarget';
		}

		position = getOffset(element);
		//log("calculate dropTarget position: left=" + position.left
				//+ ", top=" + position.top);
	};
	
	this.onMove = function(x, y) {
		if (position) {
			//var offsetX = x - position.left;
			var offsetY = y - position.top;
			// определить какая из частей акцептора перекрыта
			var part = offsetY/element.clientHeight;
			//log("calculate part: " + part);
			
			if (part>=0 && part<0.5) {
				// элемент перемещается над объектом приемником
				element.className = rememberClassName + ' enterTarget enterOverTarget';
			} /*else if (part>0.75) {
				element.className = rememberClassName + ' enterTarget enterUnderTarget';
			}*/ else {
				// перемещение в объект приемника
				element.className = rememberClassName + ' enterTarget enterCenterTarget';
			}
		}
	};

	this.toString = function() {
		return element.id;
	};
}