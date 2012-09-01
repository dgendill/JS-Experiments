// EvalScheem
var evalScheem = function (expr) {
    // Numbers evaluate to themselves
    if (typeof expr === 'number') {
        return expr;
    }
    // Look at head of list for operation
    switch (expr[0]) {
        case '+':
            return evalScheem(expr[1]) + evalScheem(expr[2]);
        case '-':
            return evalScheem(expr[1]) - evalScheem(expr[2]);
        case '*':
            return evalScheem(expr[1]) * evalScheem(expr[2]);
        case '/':
            return evalScheem(expr[1]) / evalScheem(expr[2]);
    }
};

evalScheem(["+",1,2]);										// returns 3
evalScheem(["-",10,5]);										// returns 5
evalScheem(["*",10,5]);										// returns 50
evalScheem(["*",10,["+",2,2]]);						// returns 40
evalScheem(["*",10,["+",5,["-",10,5]]]);  // returns 100


/* ---------------------------
// define and set syntax?  I don't know if this work
var evalScheem = function (expr, env) {
    // Numbers evaluate to themselves
    if (typeof expr === 'number') {
        return expr;
    }
    // Strings are variable references
    // Look at head of list for operation
    
    
    if (typeof expr[0] === 'string') {
        if (expr[0] === '+') {
            return evalScheem(expr[1], env) +
                   evalScheem(expr[2], env);
        } else if (expr[0] === 'define') {
            env[expr[1]] = evalScheem(expr[2], env);
            return 0;
        } else if (expr[0] === "set!") {
            env[expr[1]] = evalScheem(expr[2], env);
        } else {
            return env[expr];        
        }
    }
};*/