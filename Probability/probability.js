if(!Array.isArray) {
  Array.isArray = function (vArg) {
    return Object.prototype.toString.call(vArg) === "[object Array]";
  };
}

function ProbabilityTools() {
	if (!(this instanceof ProbabilityTools)) {
		return new ProbabilityTools();
	}
}
ProbabilityTools.prototype = {
	random : function() {
		// Returns random number between 0 and 10
		var r = Math.random();
		return (Math.round(r*Math.pow(10,1))*10)/Math.pow(10,1);
	},
	factorial : function(n) {
		// Solves factorials.
		// Example:
		// 5! = 5 * 4 * 3 * 2 * 1 = 120
		if ((n == 0) || (n == 1))
			return 1
		else {
		  result = (n * this.factorial(n-1) )
		  return result
		}
	},
	permutations : function (spots, items) {
		// Use: permutations(5,10)
		// Example:
		// 5 empty chairs = 5 spots
		// 10 people to sit in the chairs = 10 items
		// 
		// 		   10!		 3628800
		//		-------  =  -------- = 30240
		//		(10-5)!       120
		//
		// There are 30240 different ways for the 10 people to sit in the 5 chairs
		return this.factorial(items)/this.factorial(items-spots);
	},
	combinations : function (spots, items) {
		// Example:
		//
		// 5 empty chairs = 5 spots
		// 10 people to sit in the chairs = 10 items
		//
		// Combinations do not care about order.
		// ABC, ACB, BAC, BCA, CAB, and CBA all count as one combination.
		// Similarly, DEF
		// 
		//
		// 		30240
		//		----- = 252
		//		 5!
		//
		// There are 252 order-independant ways that the 10 people can sit down
		if (spots > items) { return undefined; }
		return this.permutations(spots,items)/this.factorial(spots);
	},
	binomialExpansion : function (spot, items, prob) {
		return this.combinations(spot, items) * Math.pow(prob, spot) * Math.pow(1 - prob, items - spot);
	},
	calc : function(event) {
		// Calculates the probability of an event.
		// event can be an Evt object, DisjoinedGroup object,
		// or EventSeries object.
		var that = this;
		
		if (event instanceof Evt) {
			return event.p;
		}	else if (event instanceof EventSeries) {
			var p,
					series = event.series;
					
			var calculateSeries = function(element, index) {
				if (p === undefined) {
					p = this.calc(element);
				} else {
					p = p * this.calc(element);
				}
			}
			
			series.forEach(function(element,index) {
				calculateSeries.apply(that, [element,index]);
			});
			
			return p;
		} else if (event instanceof DisjoinedGroup || event instanceof JoinedGroup) {
			var p,
					group = event.group;
			
			var calculateGroup = function(element, index) {
				if (p === undefined) {
					p = this.calc(element);
				} else {
					p = p + this.calc(element);
				}
			}
			
			group.forEach(function(element,index) {
				calculateGroup.apply(that, [element, index]);
			});
			
			// Do not include the overlap in the probability.
			// DisjoinedGroups calculate evt1 OR evt2 OR evt3 OR...
			// not including evt1 AND evt2 AND evt3 AND...
			if (event instanceof DisjoinedGroup) {
				var overlap = this.calc(new EventSeries(group));
			} else {
				var overlap = 0;
			}
			
			// Simple Inclusion-Exclusion Priprobnciple.
			return p - overlap;
		}
	}
}

var prob = new ProbabilityTools();


function EventSeries(args) {
	// A series of events A,B,C,... n
	// where A union B union C union... n
	
	"use strict";

	if (!(this instanceof EventSeries)) {
		return new EventSeries(arguments);
	}
	
	var args = 'length' in args ? args : arguments;
	var series = [];
	
	if (args.length > 0) {
		for (var i = 0, l = args.length; i < l; i++) {
			series.push(args[i]);
		}
	} else {
		series = args[0];
	}
	this.series = series;
}

function JoinedGroup(args) {
  // http://en.wikibooks.org/wiki/High_School_Mathematics_Extensions/Discrete_Probability#Events
  // A group of events A,B,C,... n
	// where A or B or C or... n is possible,
	// including the union of A, B, C... n
	
	"use strict";
	
	if (!(this instanceof JoinedGroup)) {
		return new JoinedGroup(arguments);
	}
	
	var args = 'length' in args ? args : arguments;
	var group = [];
	
	if (args.length > 0) {
		for (var i = 0, l = args.length; i < l; i++) {
			group.push(args[i]);
		}
	} else {
		group = args[0];
	}
	this.group = group;
}
JoinedGroup.prototype.happens = function(times) {
	var events = [];
	while(times-- > 0) {
		events.push(new JoinedGroup(this.group));
	}
	return new EventSeries(events);
}

function DisjoinedGroup(args) {
	// http://en.wikibooks.org/wiki/High_School_Mathematics_Extensions/Discrete_Probability#Events
	// A group of events A,B,C,... n
	// where A or B or C or... n is possible,
	// but A union B union C union... n is not possible
	// This should be used where events shared common elements  
	// example:
	// P4 = P(rolling die <= 4) = 2/3
	// Podd = P(rolling odd number) = 1/2
	// P(P4 or Podd) =  P(P4) + P(Podd) - P(P4 union Podd)
	// The "shared events" (union) are rolling a 1 or 3 (both less than 4 and odd)
	
	"use strict";
	
	if (!(this instanceof DisjoinedGroup)) {
		return new DisjoinedGroup(arguments);
	}
	
	var args = 'length' in args ? args : arguments;
	var group = [];
	
	if (args.length > 0) {
		for (var i = 0, l = args.length; i < l; i++) {
			group.push(args[i]);
		}
	} else {
		group = args[0];
	}
	this.group = group;
}
DisjoinedGroup.prototype.happens = function(times) {
	var events = [];
	while(times-- > 0) {
		events.push(new DisjoinedGroup(this.group));
	}
	return new EventSeries(events);
}

function Evt(name, p) {
	if (!(this instanceof Evt)) { return new Evt(name, p); }
	this.p = p;
	this.name = name;
}
Evt.prototype.complement = function() {
	return 1 - this.p;
}
Evt.prototype.happens = function(times) {
	var events = [];
	while(times-- > 0) {
		events.push(new Evt(this.name, this.p));
	}
	return new EventSeries(events);
}
Evt.prototype.transitionStates = function() {
	this.transitionStates = new DisjoinedGroup(arguments);
};


function MChain (events, start) {
	
	var transformMatrix = [];
	
	// subsequent chains
	// i is the row
	for (var i = 0; i < events.length; i++) {
		// columns
		var transitionStates = events[i].transitionStates.group;
		var row = [];
		
		for(var j = 0; j < events.length; j++) {
			transitionStates.forEach(function(element, index) {
				if (events.indexOf(element) === j) {
					row.push(element);
				}
			});
		}
		
		console.log(row);
		transformMatrix.push(row);
	}
	console.log(transformMatrix);
	return transformMatrix;
}

/*
var broke = new Evt('broke', .5);
var one = new Evt('one', .5);
var two = new Evt('two', .5);
var three = new Evt('three', .5);
var four = new Evt('four', .5);
var five = new Evt('five end', .5);

broke.transitionStates(new Evt('broke', 1));
one.transitionStates(broke, two);
two.transitionStates(one, three);
three.transitionStates(two, four);
four.transitionStates(three, five);
five.transitionStates(new Evt('five end', 1));

var chain = new MChain([broke, one, two, three, four, five], three);

*/



/*
var sizeOnDice = Evt('6', (1/6));
var cardFromAceAndSix = Evt('card from ace to six', (24/52));
var cardMatchesDice = Evt('card matches dice', (4/24));

var a = new EventSeries(sizeOnDice, cardFromAceAndSix, cardMatchesDice);
log(prob(a));*/



/*
var heads = new Evt('heads', .5);
var tails = new Evt('tails', .5);
var tHtT = new EventSeries([heads.happens(2),tails.happens(2)]);
log(prob(tHtT));
*/