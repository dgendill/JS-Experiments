var Node = function(value, next) {
	this.value = value;
	this.next = next;
}
Node.prototype.getValue = function() {
	return this.value;
}
Node.prototype.getNext = function() {
	return this.next;
}

function LinkedList (data) {
	if (data === undefined) {
		this.head = new Node();
		this.tail = this.head;
	} else {
		if (Object.prototype.toString.call( data ) !== '[object Array]' ) {
			data = [data];
		}
		this.head = new Node(data[0]);
		this.tail = this.head;
		var l = data.length - 1,
				s = 1;
		while (s++ < l) {
			this.add(data[s]);
		}
	}
}
LinkedList.prototype = {
	add : function(value) {
			this.tail = new Node(value, this.tail); 
	},
	insert : function(i, value) {
		var node = this.index(i);
		if (node !== undefined) {
			node.next = new Node(value, node.getNext());
		}
	},
	remove : function(i) {
		var next = this.tail;
		
		do {
			var prev = next;
			var next = next.next;
			if (next === undefined) { return undefined; }
		} while (i--);
		var toReturn = prev;
		prev.value = next.value;
		prev.next = next.next;
		return toReturn;
	},
	index : function(i) {
		var next = this.tail;
		while (i--) {
			next = next.next;
			if (next === undefined) { return undefined; }
		}
		return next.value;
	}
}