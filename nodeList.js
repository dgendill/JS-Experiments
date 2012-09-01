// Node Data Structure in Javascript
// http://en.wikibooks.org/wiki/Data_Structures/Introduction

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

var nodes;
var max = 0;
var numbers = [8,4,5,1,7,9,10,12,15,22,37,89,12,1000,44,77,8,9,1,2,45];

for(var i = 0; i < numbers.length; i++) {
	nodes = new Node(numbers[i], nodes);
	max = Math.max(max, numbers[i]);
}

console.log("Max is:" + max);
 
var total = 0;
var count = 0;

while(nodes) {
	var val = nodes.getValue();
	if (max%val === 0) {
		total = total + val;
		count = count + 1;
	}
	nodes = nodes.getNext();
}
if (count !== 0) {
	console.log("Average: " + (total / count));
}