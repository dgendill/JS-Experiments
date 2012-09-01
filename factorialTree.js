// factorialTree returns a string of javascript functions
// that solve a factorial when called with eval

function factorialTree(n) {
  if (n == 0) {
    return "(function() { return 1; }())";
  } else {
    return "(function (n) { return n * " + factorialTree(n-1) + " }(" + n + "))";
	}
}

eval(factorialTree(5));