let width = 1920;
let height = 951;

let w = 1;
let h = 1;

let h_cells = width/w;
let v_cells = height/h;

let threshold = 0.1;

class Cells {
    constructor() {
        this.grid = [];
        for (let i = 0; i < h_cells; i++) {
            let line = [];
            for (let j = 0; j < v_cells; j++) {
                if (random() < threshold) {
                    line.push(true);
                } else {
                    line.push(false);
                }
            }
            this.grid.push(line);
        }
    }

    at(x, y) {
        return x >= 0 && y >= 0 && x < h_cells && y < v_cells && this.grid[x][y];
    }

    next(neighbours, current) {
        if (neighbours <= 1) {
            return false;
        } else if (neighbours == 2) {
            return current;
        } else if (neighbours == 3) {
            return true;
        } else {
            return false;
        }
    }

    update() {
        for (let i = 0; i < h_cells; i++) {
            for (let j = 0; j < v_cells; j++) {
                let neighbours = [
                    this.at(i - 1, j - 1),
                    this.at(i - 1, j),
                    this.at(i - 1, j + 1),
                    this.at(i, j + 1),
                    this.at(i, j - 1),
                    this.at(i + 1, j - 1),
                    this.at(i + 1, j),
                    this.at(i + 1, j + 1)
                ].reduce((a, b) => a + b, 0);
                this.grid[i][j] = this.next(neighbours, this.grid[i][j]);
            }
        }
    }

    draw() {
        for (let i = 0; i < h_cells; i++) {
            for (let j = 0; j < v_cells; j++) {
                if (this.grid[i][j]) {
                    rect(i*w, j*h, w, h);
                }
            }
        }
    }
}

let cells;

function setup() {
    createCanvas(1920, 951);
    cells = new Cells();
}

function draw() {
    background(0, 0, 0);
    cells.update();
    cells.draw();
}