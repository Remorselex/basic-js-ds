const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

	BinarySearchTree() {
		this._root = null;
	}

	root() {
		if (!this._root) {
			return null;
		}
		return this._root;
	}

	add(data) {
		const newNode = new Node(data);

		if (!this._root) {
			this._root = newNode;
		} else {
			treeDiveAdd(this._root, newNode);
		}

		function treeDiveAdd(currentNode, newNode) {
			// left
			if (newNode.data < currentNode.data) {
				if (!currentNode.left) {
					currentNode.left = newNode;
					return;
				}
				treeDiveAdd(currentNode.left, newNode);
			}
			//right
			if (newNode.data > currentNode.data) {
				if (!currentNode.right) {
					currentNode.right = newNode;
					return;
				}
				treeDiveAdd(currentNode.right, newNode);
			}
		}
	}

	has(data) {
		return treeDiveHas(data, this.root());

		function treeDiveHas(data, currentNode) {
			if (!currentNode) {
				return false;
			}
			if (data == currentNode.data) {
				return true;
			}

			if (data < currentNode.data) {
				return treeDiveHas(data, currentNode.left);
			}
			if (data > currentNode.data) {
				return treeDiveHas(data, currentNode.right);
			}
		}
	}

	find(data) {
		return treeDiveFind(data, this.root());

		function treeDiveFind(data, currentNode) {
			if (!currentNode) {
				return null;
			}
			if (data == currentNode.data) {
				return currentNode;
			}

			if (data < currentNode.data) {
				return treeDiveFind(data, currentNode.left);
			}
			if (data > currentNode.data) {
				return treeDiveFind(data, currentNode.right);
			}
		}
	}

	remove(data) {
		this._root = treeDiveRemove(data, this.root());

		function treeDiveRemove(data, currentNode) {
			if (!currentNode) {
				return null;
			}

			if (data < currentNode.data) {
				currentNode.left = treeDiveRemove(data, currentNode.left);
				return currentNode;
			}
			else if (data > currentNode.data) {
				currentNode.right = treeDiveRemove(data, currentNode.right);
				return currentNode;
			}
			else if (data == currentNode.data) {
				if (currentNode.left === null && currentNode.right === null) {
					currentNode = null;
					return currentNode;
				}

				if (currentNode.left === null) {
					currentNode = currentNode.right;
					return currentNode;
				}
				else if (currentNode.right === null) {
					currentNode = currentNode.left;
					return currentNode;
				}
				var subtree = minInSubtree(currentNode.right);
				currentNode.data = subtree.data;

				currentNode.right = treeDiveRemove(subtree.data, currentNode.right);

				return currentNode;
			}
		}

		function minInSubtree(currentNode) {
			if (!currentNode) {
				return null;
			}

			if (!currentNode.left) {
				return currentNode;
			}
			return minInSubtree(currentNode.left);
		}
	}

	min() {
		return treeDiveMin(this.root());

		function treeDiveMin(currentNode) {
			if (!currentNode) {
				return null;
			}

			if (currentNode.left) {
				return treeDiveMin(currentNode.left);
			}
			return currentNode.data;
		}
	}

	max() {
		return treeDiveMin(this.root());

		function treeDiveMin(currentNode) {
			if (!currentNode) {
				return null;
			}

			if (currentNode.right) {
				return treeDiveMin(currentNode.right);
			}
			return currentNode.data;
		}
	}
}

module.exports = {
	BinarySearchTree
};