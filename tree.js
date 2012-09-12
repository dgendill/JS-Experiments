function TreeNode (params) {
	if (typeof params !== "object") {
		var value = params;
		params = {};
		params.value = value;
	}
	this.value = params.value || 0;
	this.left = params.left;
	this.right = params.right;
	this.parent = params.parent;
}
TreeNode.prototype.isLeaf = function() {
	return (this.left !== undefined) && (this.right !== undefined);
}

function Tree (value) {
	this.root = new TreeNode(value);
}
Tree.prototype.find = function(value, node) {
	if (node === undefined) {
		return this.find(value, this.root); 
	}
	if (value === node.value) {
		return node;
	} else if (value < node.value) {
		if (node.left) {
			return this.find(value, node.left);
		}
	} else if (value > node.value) {
		if (node.right) {
			return this.find(value, node.right);
		}
	}
	 
	return false;
};
Tree.prototype.height = function(node) {
	if (node === undefined) {
		node = this.root;
	} else if (node === 0) {
		return 0;
	}
	
	var leftNode = node.left || 0;
	var rightNode = node.right || 0;
	if ((leftNode === 0) && (rightNode === 0)) { return -1; }
	
	return Math.max(this.height(leftNode), this.height(rightNode)) + 1;	
}
Tree.prototype.findInsertionPoint = function(value, node) {
	if (node === undefined) {
		return this.findInsertionPoint(value, this.root); 
	}
	if (value === node.value) {
		return false;
	} else if (value < node.value) {
		if (node.left) {
			return this.findInsertionPoint(value, node.left);
		} else {
			return node;
		}
	} else if (value > node.value) {
		if (node.right) {
			return this.findInsertionPoint(value, node.right);
		} else {
			return node;
		}
	}
	 
	return false;
};

Tree.prototype.add = function(value) {
	var node = this.findInsertionPoint(value);
	if (node === false) { return undefined; }
	if (value < node.value) {
		node.left = new TreeNode({
			value : value,
			parent : node
		});
	} else if (value > node.value) {
		node.right = new TreeNode({
			value : value,
			parent : node
		});
	}
};
Tree.prototype.rebalance = function() {
	var balanceFactor = this.balanceFactor;
	// P is root
	if (balanceFactor(this.root) === -2) {
		// check balance factor of right
		// left rotation with P as root is necessary
	} else if (balanceFactor(this.root.right) === -1) {
		// single left rotation with P as root is needed
	} else if (balanceFactor(this.root.right) === 1) {
		// right rotation with R as root and left rotation with P as root
	} else if (balanceFactor(this.root) === 2) {
		// balance factor of left must be checked.
		// right rotation with P as the root is necessary
	} else if (balanceFactor(this.root.left) === 1) {
		// single right rotation with P as the root
	} else if (balanceFactor(this.root) === -1) {
		// left rotation with l as the root
		// right rotation with p as the root	
	}
};
Tree.prototype.balanceFactor = function(node) {
	return this.height(node.left) - this.height(node.right);	
};

var tree = new Tree(10);
tree.add(5);
tree.add(20);
tree.add(25);
tree.add(8);
tree.height(tree.find(8));