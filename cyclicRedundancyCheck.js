// Cyclic Redundancy Check
// http://en.wikipedia.org/wiki/Cyclic_redundancy_check
// I can't remember where I left off with this.
// I don't think it's currently working.

var b = function(n) {
	return parseInt(n,2);
}

toB = function(n) {
	return n.toString(2);
}
var zeros = function(num) {
	var s = "";
	while (num--) { s = s + "0"; }
	return s;
}
var crc = function(num, divisor, bits, offset) {
	offset = offset||1;
	num = toB(b(num)) + zeros(bits);
	divisor = toB(b(divisor));
	var pad = num.length - divisor.length;
	divisor = divisor + zeros(pad)
	var answer = zeros(offset) + toB((b(divisor)^b(num)) >> bits);
	if (b(answer) === 0) {
		var fullAnswer = (zeros(offset) + toB((b(divisor)^b(num))));
		fullAnswer.substr(fullAnswer.length-3,3);
	}
	return {'answer':answer,'crc':fullAnswer};
}

var ans = crc(11010011101100, 1011, 3, 1);
for(var a = 2; a < 12; a++) {
	console.log(ans.answer);
	if (ans.crc) { console.log("CRC is: " + ans.crc); break; }
	ans = crc(ans, 1011, 3, a);
}
console.log(ans.answer);
if (ans.crc) { console.log("CRC is: " + ans.crc); }
