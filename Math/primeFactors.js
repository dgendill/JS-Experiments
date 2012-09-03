/**
  Returns an array of all factors of a number X.
  
  @param {Number} lbound Exits the function if num/prime is less than lbound.
  @param {Number} num The number whose prime factors we are looking for.
  @param {Array} [primes] An array of prime numbers
  @returns {Array} An array of all factors of num
*/
var primeFactors = function(lbound, num, primes) {
	// By default, accurate to 1000
  var primes = primes || [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101];
  var factors = [];
  
  var getFactors = function(num) {
    if (num === 0 || num === 1) { return false; }
    factors.push(num);
    if (primes.indexOf(num) !== -1) { return true; }
    var l = 0;
    var max = primes.length;
    while (l < max) {
			l++;
      if (num%primes[l] === 0) {
        factors.pop();
				factors.push(primes[l]);
				var nextNumber = num/primes[l];
				if (lbound <= nextNumber) {
					getFactors(num/primes[l]);
				}
        return true;
      }
    }
    return true;
  };
    getFactors(num);
    return factors;
};

/**
  Returns an array of all primes from 0 to num
  @param {Number} num The stopping point for our prime number search.
  @returns {Array} An array of all prime numbers from 0 to num
*/
var primeFactorsTo = function(num) {
  var primes = {},
      store = [],
      found = 0,
      lbound = 0;
      
  for(var a = 0; a < num; a++) {
    var b = Math.floor(store.length / 2);
    var f = primeFactors(lbound, a, store.slice(0, found));
    for (var b = 0, l = f.length; b < l; b++) {
      if (f[b] in primes) {
        continue;
      } else {
        primes[f[b]] = 1;
        found = store.push(f[b]);
        lbound = f[b];
      }
    }
  }
  return store;
};