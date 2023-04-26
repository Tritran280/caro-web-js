def main():
    rows = 20
    cols = 20
    board = create_board(rows, cols)
    print_board(board)
    while True:
        # Lượt của người chơi
        row = int(input("Nhập số hàng: "))
        col = int(input("Nhập số cột: "))
        if board[row][col] != 0:
            print("Ô đã được đánh, vui lòng chọn ô khác.")
            continue
        make_move(board, 1, row, col)
        print_board(board)
        winner = check_winner(board)
        if winner:
            print(f"Người chơi {winner} đã thắng!")
            break
        # Lượt của máy tính
        print("Lượt của máy tính...")
        depth = 3
        moves = get_legal_moves(board, 2)
        best_move = None
        max_value = -infinity
        alpha = -infinity
        beta = infinity
        for move in moves:
            row, col = move
            make_move(board, 2, row, col)
            value = alpha_beta(board, 1, depth-1, alpha, beta)
            undo_move(board, row, col)
            if value > max_value:
                max_value = value
                best_move = move
            alpha = max(alpha, max_value)
            if alpha >= beta:
                break
        row, col = best_move
        make_move(board, 2, row, col)
        print_board(board)
        print(row, col)
        winner = check_winner(board)
        if winner:
            print(f"Máy tính đã thắng!")
            break


infinity = float('inf')

def create_board(rows, cols):
    return [[0] * cols for _ in range(rows)]

def print_board(board):
    for row in board:
        print(' '.join(str(cell) for cell in row))

def check_winner(board):
    rows = len(board)
    cols = len(board[0])
    for row in range(rows):
        for col in range(cols):
            if board[row][col] == 0:
                continue
            # Kiểm tra hàng dọc
            if row <= rows - 5 and all(board[row+i][col] == board[row][col] for i in range(5)):
                return board[row][col]
            # Kiểm tra hàng ngang
            if col <= cols - 5 and all(board[row][col+i] == board[row][col] for i in range(5)):
                return board[row][col]
            # Kiểm tra đường chéo xuôi
            if row <= rows - 5 and col <= cols - 5 and all(board[row+i][col+i] == board[row][col] for i in range(5)):
                return board[row][col]
            # Kiểm tra đường chéo ngược
            if row <= rows - 5 and col >= 4 and all(board[row+i][col-i] == board[row][col] for i in range(5)):
                return board[row][col]
    return 0

def get_legal_moves(board, player):
    rows = len(board)
    cols = len(board[0])
    moves = []
    for row in range(rows):
        for col in range(cols):
            if board[row][col] == 0:
                moves.append((row, col))
    return moves

def make_move(board, player, row, col):
    board[row][col] = player

def undo_move(board, row, col):
    board[row][col] = 0

def evaluate_board(board):
    rows = len(board)
    cols = len(board[0])
    score = 0
    for row in range(rows):
        for col in range(cols):
            if board[row][col] == 1:
                score += 1
            elif board[row][col] == 2:
                score -= 1
    return score

def alpha_beta(board, player, depth, alpha, beta):
    if depth == 0:
        return evaluate_board(board)
    moves = get_legal_moves(board, player)
    if player == 1:
        max_value = -infinity
        for move in moves:
            row, col = move
            make_move(board, player, row, col)
            value = alpha_beta(board, 3-player, depth-1, alpha, beta)  # đổi player=3-player
            undo_move(board, row, col)
            if value is not None:  # kiểm tra giá trị trả về có rỗng hay không
                max_value = max(max_value, value)
                alpha = max(alpha, max_value)
                if alpha >= beta:
                    break
        return max_value
    else:
        min_value = infinity
        for move in moves:
            row, col = move
            make_move(board, player, row, col)
            value = alpha_beta(board, 3-player, depth-1, alpha, beta)  # đổi player=3-player
            undo_move(board, row, col)
            if value is not None:  # kiểm tra giá trị trả về có rỗng hay không
                min_value = min(min_value, value)
                beta = min(beta, min_value)
                if beta <= alpha:
                    break
        return min_value




main()