// Starting point for creating chat bots
// on Omegle.  Sends a bunch of zeros
// over the chat client.  Copy and paste
// in the console on omegle.com

(function() {  
  var count = -5;
  var timer = 0;
  var t = document.getElementsByClassName('chatmsg');
  var s = document.getElementsByClassName('sendbtn');
  
  var absSquare = function(val) {
    return Math.abs(Math.pow(val,2));
  };
  var generateString = function(l, c) {
    var chars = c;
    for(var a = 0; a < l; a++) {
      chars = chars + c;
    }
    return chars;
  };
  
  var a = function() {
    t[0].value = generateString(absSquare(count), "0");
    count++;
    s[0].click();
    timer = window.setTimeout(function() { a(); }, 100);
    if (count === 6) { window.clearTimeout(timer); }
  };
  a();
}());