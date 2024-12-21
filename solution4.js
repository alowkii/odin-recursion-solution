class Node{
    constructor(value) {
        this.value = value,
        this.left = null,
        this.right = null;
    }
}

class Tree{
    constructor(){
        this.root = null;
    }

    sort(array){
        return this.mergeSort(array);
    }

    merge(left, right){
        let l = 0, r = 0;
        let result = [];
        while(l<left.length && r<right.length){
            if(left[l] < right[r]){
                result.push(left[l]);
                l++;
            }else{
                result.push(right[r]);
                r++;
            }
        }
        return result.concat(left.slice(l)).concat(right.slice(r));
    }

    mergeSort(array){
        if(array.length <= 1) return array;
        let mid = Math.floor(array.length/2);
        let left = this.mergeSort(array.slice(0,mid));
        let right = this.mergeSort(array.slice(mid));
        return this.merge(left, right);
    }

    createTree(array){
        array = this.sort(array);
        this.root = this.buildTree(array);
    }

    buildTree(array){
        if(array.length < 1) return null;
        let mid = Math.floor(array.length/2);
        let currentNode = new Node(array[mid]);
        currentNode.left = this.buildTree(array.slice(0, mid));
        currentNode.right = this.buildTree(array.slice(mid + 1));
        return currentNode;
    }

    insert(value, currentNode=this.root){
        if(currentNode === null) return new Node(value)
        if(currentNode.value === value) return currentNode;
        if(currentNode.value > value)
            currentNode.left = this.insert(value, currentNode.left);
        else if(currentNode.value < value)
            currentNode.right = this.insert(value, currentNode.right);
        return currentNode;
    }

    getSuccessor(currentNode){
        currentNode = currentNode.right;
        while(currentNode !== null && currentNode.left !== null)
            currentNode = currentNode.left;
        return currentNode;
    }

    deleteItem(value, currentNode=this.root){
        if(currentNode === null) return currentNode;

        if(currentNode.value > value)
            currentNode.left = this.deleteItem(value, currentNode.left);
        else if(currentNode.value < value)
            currentNode.right = this.deleteItem(value, currentNode.right);
        else{
            if(currentNode.left === null)
                return currentNode.right;
            if(currentNode.right === null)
                return currentNode.left;

            let successor = this.getSuccessor(currentNode);
            currentNode.value = successor.value;
            currentNode.right = this.deleteItem(successor.value, currentNode.right);
        }
        return currentNode;
    }

    find(value){
        let currentNode = this.root;
        while(currentNode !== null){
            if(currentNode.value === value) return currentNode;
            if(currentNode.value > value)
                currentNode = currentNode.left;
            else
                currentNode = currentNode.right;
        }
        return null;
    }

    levelOrder(callback) {
        if (typeof callback !== "function")
            throw new Error("A callback function is required.");
        if (this.root === null) return;
    
        const queue = [this.root];
        while (queue.length > 0) {
            const currentNode = queue.shift();
            callback(currentNode);
            
            if (currentNode.left !== null) 
                queue.push(currentNode.left);
            if (currentNode.right !== null) 
                queue.push(currentNode.right);
        }
    }

    inOrder(callback, currentNode = this.root) {
        if (currentNode === null) return;
        this.inOrder(callback, currentNode.left);
        callback(currentNode);
        this.inOrder(callback, currentNode.right);
    }

    preOrder(callback, currentNode = this.root) {
        if (currentNode === null) return;
        callback(currentNode);
        this.preOrder(callback, currentNode.left);
        this.preOrder(callback, currentNode.right);
    }

    postOrder(callback, currentNode = this.root) {
        if (currentNode === null) return;
        this.postOrder(callback, currentNode.left);
        this.postOrder(callback, currentNode.right);
        callback(currentNode);
    }

    height(currentNode = this.root) {
        if (currentNode === null) return 0;
        const leftHeight = this.height(currentNode.left);
        const rightHeight = this.height(currentNode.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(currentNode = this.root) {
        if (currentNode === null) return 0;
        let depth = 0;
        while (currentNode !== null) {
            depth++;
            currentNode = currentNode.left;
        }
        return depth;
    }

    isBalanced(currentNode = this.root) {
        if (currentNode === null) return true;
        const leftHeight = this.height(currentNode.left);
        const rightHeight = this.height(currentNode.right);
        return Math.abs(leftHeight - rightHeight) <= 1;
    }

    rebalance() {
        const nodes = [];
        this.inOrder(node => nodes.push(node));
        this.root = this.buildTree(nodes.map(node => node.value));
    }

    prettyPrint(node, prefix = "", isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }
}

let tree = new Tree();
tree.createTree([2, 9, 1, 3, 6, 5, 4]);
tree.prettyPrint(tree.root);
tree.deleteItem(4);
tree.insert(7);
tree.prettyPrint(tree.root);
console.log(tree.find(6));
console.log(tree.levelOrder(node => console.log(node.value)));
console.log(tree.inOrder(node => console.log(node.value)));
console.log(tree.preOrder(node => console.log(node.value)));
console.log(tree.postOrder(node => console.log(node.value)));
console.log("Height "+tree.height());
console.log("Depth "+tree.depth());
console.log("Is it balanced?: "+tree.isBalanced());
tree.rebalance();
tree.prettyPrint(tree.root);
console.log("\n\n\n\nDriver Script:\n");

function driverScript(){
    let tree = new Tree();
    let array = [];
    for(let i=0; i<10; i++){
        array.push(Math.floor(Math.random()*100));
    }
    tree.createTree(array);
    tree.prettyPrint(tree.root);
    for(let i=0; i<5; i++){
        tree.insert(Math.floor(Math.random()*100+100));
    }
    console.log("Is it balanced?: "+tree.isBalanced());
    tree.prettyPrint(tree.root);
    tree.rebalance();
    console.log("Is it balanced?: "+tree.isBalanced());
    tree.prettyPrint(tree.root);
    console.log("\nLevel Order\n"+tree.levelOrder(node => console.log(node.value)));
    console.log("\nIn Order\n"+tree.inOrder(node => console.log(node.value)));
    console.log("\nPre Order\n"+tree.preOrder(node => console.log(node.value)));
    console.log("\nPost Order\n"+tree.postOrder(node => console.log(node.value)));
}

driverScript();
