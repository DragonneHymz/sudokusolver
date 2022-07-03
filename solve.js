function clicked() {
    var regex = /^[1-9]+$/;
    let puzzle = [];
    let row = [];
    for (let i = 0; i < 81; i++) {
        let input = document.getElementById(String(i)).value;
        if (!input.match(regex)) {
            input = 0;
        } else {
            input = parseInt(input);
        }
        console.log(input);
        row.push(input);
        if ((i === 8) || (i === 17) || (i == 26) || (i === 35) || (i === 44) || (i === 53) || (i === 62) || (i === 71) || (i === 80)) {
            puzzle.push(row);
            row = [];
        }
    }

    let complete = solve(puzzle)
    if (complete) {
        list = turn_to_list(puzzle);
        for (let i = 0; i < 81; i++) {
            display_num(i, list[i])
        }
    } else {
        alert("Puzzle cannot be solved, please check your input");
    }

    solution = [[4, 3, 5, 9, 6, 2, 8, 7, 1],
    [2, 7, 6, 8, 1, 5, 3, 4, 9],
    [9, 8, 1, 4, 3, 7, 2, 5, 6],
    [1, 9, 3, 5, 8, 6, 4, 2, 7],
    [8, 6, 7, 3, 2, 4, 9, 1, 5],
    [5, 2, 4, 1, 7, 9, 6, 8, 3],
    [7, 4, 9, 6, 5, 8, 1, 3, 2],
    [6, 1, 2, 7, 4, 3, 5, 9, 8],
    [3, 5, 8, 2, 9, 1, 7, 6, 4]]

    if(puzzle==solution){
        console.log("Success!")
    }
}

function possible(puzzle, row, column, num) {
    //check row
    for (let i = 0; i < 9; i++) {
        if (puzzle[row][i] === num) {
            return false;
        }
    }

    //check column
    for (let i = 0; i < 9; i++) {
        if (puzzle[i][column] === num) {
            return false;
        }
    }

    //check square
    let y0 = (Math.floor(column / 3)) * 3;
    let x0 = (Math.floor(row / 3)) * 3;
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            if (puzzle[x0 + x][y0 + y] === num) {
                return false;
            }
        }
    }
    return true;

}

function find_next_empty(puzzle) {
    for (let row = 0; row < 9; row++) {
        for (let column = 0; column < 9; column++) {
            if (puzzle[row][column] == 0) {
                return [row, column];
            }
        }
    }
    return [null, null];
}

function solve(puzzle) {
    let empty = find_next_empty(puzzle);
    let row = empty[0];
    let column = empty[1];
    if (row === null) {
        return true;
    }
    for (let num = 1; num < 10; num++) {
        if (possible(puzzle, row, column, num)) {
            puzzle[row][column] = num;
            if (solve(puzzle)) {
                return true;
            }
        }
        puzzle[row][column] = 0;
    }
    return false;
}

function display_num(id, value) {
    document.getElementById(String(id)).setAttribute("value", String(value))
}

function turn_to_list(puzzle) {
    let list = [];
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            list.push(puzzle[i][j]);
        }
    }
    return list;
}