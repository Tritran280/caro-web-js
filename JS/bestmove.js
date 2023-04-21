class Best_move {

    constructor(size){
        this.size = size
    }

    possible_moves(board) {
        let taken = [];
        let directions = [[0,1],[0,-1],[1,0],[-1,0],[1,1],[-1,-1],[-1,1],[1,-1]]; // array of possible directions to move
        let cord = {};
      
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] != ' ') {
                taken.push([i,j]);
                }
            }
        }

        for (let direction of directions) {
            let [dy,dx] = direction;
            for (let coord of taken) {
                let [y,x] = coord;
                for (let length of [1,2,3,4,5]) {
                    let move = this.march(y,x,dy,dx,length);
                    if (!taken.some(pos => pos[0] === move[0] && pos[1] === move[1]) && !cord.hasOwnProperty(move)) {
                    cord[move] = false;
                    }
                }
            }
        }
        return cord;
    }

    best_move(board, xo) {
        let anti_xo = xo === 'o' ? 'x' : 'o';
        let max_score = -Infinity;
        let best_move = [0, 0];
      
        let a = this.possible_moves(board);
        for (let [y, x] of Object.keys(a).map(str => str.split(",").map(Number))) {
            let score = this.stupid_score(board, xo, anti_xo, y, x);
            if (score > max_score) {
                max_score = score;
                best_move = [y, x];
            }
        }
        return best_move;
    }

    stupid_score(board, xo, anti_xo, y, x) {
        let M = 1000;
        let res = 0, adv = 0, dis = 0;
    
        // Tấn công
        board[y][x] = xo;
        let sumcol = this.score_of_col_one(board, xo, y, x);
        let a = this.winning_situation(sumcol);
        adv += a * M;
        this.sum_sumcol_values(sumcol);
        adv += sumcol[-1] + sumcol[1] + 4 * sumcol[2] + 10 * sumcol[3] + 24 * sumcol[4];
    
        // Phòng thủ
        board[y][x] = anti_xo;
        let sumanticol = this.score_of_col_one(board, anti_xo, y, x);
        let d = this.winning_situation(sumanticol);
        dis += d * (M - 100);
        this.sum_sumcol_values(sumanticol);
        dis += sumanticol[-1] + sumanticol[1] + 4 * sumanticol[2] + 8 * sumanticol[3] + 16 * sumanticol[4];
    
        res = adv + dis;
        board[y][x] = ' ';
        return res;
    
    }

    march(y, x, dy, dx, length) {
        let xf = x + length * dx;
        let yf = y + length * dy;
        while (!(0 <= yf && yf < this.size && 0 <= xf && xf < this.size)) {
            xf -= dx;
            yf -= dy;
        }
        return [yf, xf];
    }

    score_ready(score_xo) { 
        const sum_xo = {0: {}, 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, "-1": {}};
        for (let key in score_xo) { 
            for (let score of score_xo[key]) { 
                if (key in sum_xo[score]) {
                    sum_xo[score][key] += 1;
                } else {
                    sum_xo[score][key] = 1;
                }
            }
        }
        return sum_xo;
    }

    sum_sumcol_values(sum_xo) {
        for (const key in sum_xo) {
            if (key === '5') {
                sum_xo['5'] = Number(1 in Object.values(sum_xo['5']));
            } else {
                sum_xo[key] = Object.values(sum_xo[key]).reduce((acc, cur) => acc + cur, 0);
            }
        }
    }

    score_of_list(lis, xo) {
        const blank = lis.filter(x => x === ' ').length;
        const player = lis.filter(x => x === xo).length;
        if (blank + player < 5) {
            return -1;
        } else if (blank === 5) {
            return 0;
        } else {
            return player;
        }
    }
  
    row_to_list(board, y, x, dy, dx, yf, xf) {
        let row = [];
        while ((y != yf + dy) || (x != xf + dx)) {
            row.push(board[y][x]);
            y += dy;
            x += dx;
        }
        return row;
    }

    score_of_row(board, cordi, dy, dx, cordf, xo) {
        const xo_scores = [];
        const [y, x] = cordi;
        const [yf, xf] = cordf;
        const row = this.row_to_list(board, y, x, dy, dx, yf, xf);
        for (let start = 0; start <= row.length - 5; start++) {
            xo_scores.push(this.score_of_list(row.slice(start, start+5), xo));
        }
        return xo_scores;
    }

    score_of_col(board, xo) {
        const lenb = board.length;
        const scores_xo = { '0,1': [], '-1,1': [], '1,0': [], '1,1': [] };
  
        for (let start = 0; start < lenb; start++) {
            scores_xo['0,1'] = scores_xo['0,1'].concat(
                this.score_of_row(board, [start, 0], 0, 1, [start, lenb - 1], xo)
            );
  
            scores_xo['1,0'] = scores_xo['1,0'].concat(
                this.score_of_row(board, [0, start], 1, 0, [lenb - 1, start], xo)
            );
    
            scores_xo['1,1'] = scores_xo['1,1'].concat(
                this.score_of_row(board, [start, 0], 1, 1, [lenb - 1 - start, lenb - 1], xo)
            );
    
            scores_xo['-1,1'] = scores_xo['-1,1'].concat(
                this.score_of_row(board, [start, 0], -1, 1, [0, start], xo)
            );
    
            if (start + 1 < lenb) {
                scores_xo['1,1'] = scores_xo['1,1'].concat(
                this.score_of_row(board, [0, start + 1], 1, 1, [lenb - 2 - start, lenb - 1], xo)
                );
    
                scores_xo['-1,1'] = scores_xo['-1,1'].concat(
                this.score_of_row(board, [lenb - 1, start + 1], -1, 1, [start + 1, lenb - 1], xo)
                );
            }
        }
  
        return this.score_ready(scores_xo);
    }

    score_of_col_one(board, xo, y, x) {
        const scores_xo = { '0,1': [], '-1,1': [], '1,0': [], '1,1': []};
        const directions = [ [0, 1], [1, 0], [1, 1], [-1, 1]];
        for (let i = 0; i < directions.length; i++) {
            const [dy, dx] = directions[i];
            scores_xo[`${dy},${dx}`].push(...this.score_of_row(board,this.march(y, x, -dy, -dx, 5),dy,dx, this.march(y, x, dy, dx, 5), xo,));
        }
        return this.score_ready(scores_xo);
    }

    TF34score(score3, score4) {
        for (let key4 in score4) {
            if (score4[key4] >= 1) {
                for (let key3 in score3) {
                    if (key3 !== key4 && score3[key3] >= 2) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    winning_situation(sum_xo) {
        if (Object.values(sum_xo[5]).includes(1)) {
            return 5;
        } else if (Object.keys(sum_xo[4]).length >= 2 || (Object.keys(sum_xo[4]).length >= 1 && Math.max(...Object.values(sum_xo[4])) >= 2)) {
            return 4;
        } else if (this.TF34score(sum_xo[3], sum_xo[4])) {
            return 4;
        } else {
            let score3 = Object.values(sum_xo[3]).sort((a, b) => b - a);
            if (score3.length >= 2 && score3[0] >= score3[1] && score3[0] >= 2) {
                return 3;
            }
        }
        return 0;
    }
  
    make_empty_board() {
        return Array(this.size).fill().map(() => Array(this.size).fill(' '));
    }
}