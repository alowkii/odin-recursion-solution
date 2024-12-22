function createBoard() {
    let board = [];
    for (let i = 0; i < 8; i++) {
        board.push([]);
        for (let j = 0; j < 8; j++) {
            board[i].push(0);
        }
    }
    return board;
}

let moves = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];

function knightMoves(startPos, endPos) {
    let board = createBoard();
    let queue = [];
    let [startX, startY] = startPos;
    let [endX, endY] = endPos;

    queue.push([startX, startY, 0, [[startX, startY]]]);
    board[startX][startY] = 1;

    while (queue.length > 0) {
        let [x, y, steps, path] = queue.shift();

        if (x === endX && y === endY) {
            console.log(`Shortest path found in ${steps} moves`);
            console.log(`Path: ${path.map(pos => `[${pos[0]}, ${pos[1]}]`).join(" -> ")}`);
            return { moves: steps, path };
        }

        for (let i = 0; i < moves.length; i++) {
            let newX = x + moves[i][0];
            let newY = y + moves[i][1];

            if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8 && board[newX][newY] === 0) {
                board[newX][newY] = 1;
                queue.push([newX, newY, steps + 1, [...path, [newX, newY]]]);
            }
        }
    }

    return -1;
}

console.log(knightMoves([3, 3], [4, 3]));
