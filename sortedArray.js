/*
	Sorted Array Data Structure
	September 1, 2012
	Usage:
	var list = new SortedArray([6,1,10,100,5,57,2,99,101,2,2,-20]);
  
		SortedArray
		data: Array[10]
			0: -20
			1: 1
			2: 2
			3: 5
			4: 6
			5: 10
			6: 57
			7: 99
			8: 100
			9: 101
			length: 10
		
		Notice that duplicate values are removed.
		
		> list.indexOf(-20);
		  0
		> list.indexOf(101);
		  9
		
		If the return index is negative or false, the value is not in the SortedArray.  If the return index is 0 or greater, the value is in the SortedArray.  If the value is not in the SortedArray, the return index
		indicates the insertion position (or false if the insertion position is 0).
		
		> list.indexOf(3);
			-3
		> list.indexOf(22);
			-6
		> list.indexOf(-400);
			false
			
		3 is the insertion position if were going to add 3 to the array.  6 is the insertion position if you were going to add 6 to the array.  This is used internally for the add function.
		
		> list.add(3);
		> list.add(22);
			
		SortedArray
			data: Array[13]
				0: -20
				1: 1
				2: 2
				3: 3
				4: 4
				5: 5
				6: 6
				7: 10
				8: 22
				9: 57
				10: 99
				11: 100
				12: 101
				length: 13	
				
		> list.index(list.indexOf(22));
			8
		> list.index(list.indexOf(57));
			9
		> list.index(list.indexOf(-300);
			false
				
*/

function SortedArray (data) {
	if (!(this instanceof SortedArray)) {
		return new SortedArray(data);
	}
	this.data = data || [];
	this.linearSort();
}
SortedArray.prototype.linearSort = function() {
	for(var i = 0; i < this.data.length-1; i++) {
		if (this.data[i] > this.data[i+1]) {
			var old = this.data[i];
			this.data[i] = this.data[i+1];
			this.data[i+1] = old;
			this.linearSort();
		} else if (this.data[i] === this.data[i+1]) {
			this.data.splice(i,1);
			this.linearSort();
		}
	}
}
SortedArray.prototype.index = function(index) {
	var value = this.data[index];
	if (value === undefined) { return undefined; };
	return value;
}
SortedArray.prototype.add = function(value) {
	var index = this.indexOf(value);
	if (index < 0) {
		this.data.splice(-index,0,value);
	} else if (index === false) {
		this.data.splice(0,0,value);
	}
}
SortedArray.prototype.indexOf = function(needle, lbound, ubound) {
	if (lbound === undefined) {
		 lbound = 0;
	}
	
	if (ubound === undefined) {
		ubound = this.data.length;
	}
	
	var half = lbound + Math.floor((ubound - lbound) / 2);
	
	var value = this.data[half];
	//console.log("value:" + value + ", lbound:" + lbound);
	//console.log("ubound:" + ubound + ", half:" + half);
	if (needle === value) {
		return half;
	} else if (ubound - lbound === 1) {
		if (half === 0) { return false; }
		return -half-1;
	} else if (needle < value) {
		return this.indexOf(needle, 0, half);
	} else if (needle > value) {
		return this.indexOf(needle, half, ubound); 
	}
}