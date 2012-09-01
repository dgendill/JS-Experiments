// Using binary numbers as flags
// http://en.wikipedia.org/wiki/Bit_field
// http://dreaminginjavascript.wordpress.com/2009/02/09/bitwise-byte-foolish/

var shapes = {};
var convert = function(n) { return parseInt(n,2); }
    
// 3 corners - 4  corners - filled - red
shapes['square'] =   convert("1101");
shapes['triangle'] = convert("1011");
shapes['line'] =     convert("0001");

var search = {
    "are red." : convert("0001"),
    "are filled." : convert("0010"),                
    "have at least 4 corners." : convert("0100"),
    "have at least 3 corners." : convert("1000")
}

var searchShapes = function(search) {
    var i = 1;
    var text = [];
    var results = 0;
    for (var a in shapes) {
        console.log((search&shapes[a]), search);
        if ((search&shapes[a]) === search) {
            results = results + i;
            text.push(a);
        }
        i = (i*2);
    }
    return text;
}

for (var b in search) {
    var results = searchShapes(search[b]);
    document.write("The following shapes " + b + ": " + results + "<br>");
}