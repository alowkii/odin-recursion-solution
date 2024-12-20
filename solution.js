// Fibonacci series using recursion
function fib(n){
    if(n==0) return 0;
    if(n==1) return 1;
    return fib(n-1) + fib(n-2);
}

function listFib(n){
    let arr = [];
    for(let i=1; i<=n; i++){
        arr.push(fib(i));
    }
    return arr;
}

let arr = listFib(10);

document.getElementById('result').innerHTML += "Fibonacci" + '<br>';
arr.forEach(element => {
    document.getElementById('result').innerHTML += element + '<br>';
});


// Merge sort using recursion
function mergeSort(arr){
    if(arr.length <= 1) return arr;
    let mid = Math.floor(arr.length/2);
    let left = mergeSort(arr.slice(0, mid));
    let right = mergeSort(arr.slice(mid));
    return merge(left, right);
}

function merge(left, right){
    let result = [];
    let l = 0;
    let r = 0;
    while(l<left.length && r<right.length){
        if(left[l] < right[r]){
            result.push(left[l]);
            l++;
        } else {
            result.push(right[r]);
            r++;
        }
    }
    return result.concat(left.slice(l)).concat(right.slice(r));
}

arr = [5, 3, 8, 4, 2, 7, 1, 6];
const sortedArr = mergeSort(arr);

document.getElementById('result').innerHTML += '<br>' + "MergeSort" + '<br>';
sortedArr.forEach(element => {
    document.getElementById('result').innerHTML += element + '<br>';
});

