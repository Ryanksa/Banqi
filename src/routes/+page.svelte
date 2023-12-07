<script lang="ts">
	import {
		ChessPiece,
		ChessPieceColour,
		ChessPieceType,
		shuffleBoard,
		type Coord,
		coordsEq,
		canMoveUp,
		canMoveDown,
		canMoveLeft,
		canMoveRight,
		coordsIn
	} from '$lib/chess';
	import Board from '../components/board.svelte';
	import Wheel from '../components/wheel.svelte';

	let board = shuffleBoard([
		new ChessPiece(ChessPieceType.GENERAL, ChessPieceColour.BLACK, true),
		new ChessPiece(ChessPieceType.GENERAL, ChessPieceColour.RED, true),
		new ChessPiece(ChessPieceType.ADVISOR, ChessPieceColour.BLACK, true),
		new ChessPiece(ChessPieceType.ADVISOR, ChessPieceColour.RED, true),
		new ChessPiece(ChessPieceType.ADVISOR, ChessPieceColour.BLACK, true),
		new ChessPiece(ChessPieceType.ADVISOR, ChessPieceColour.RED, true),
		new ChessPiece(ChessPieceType.ELEPHANT, ChessPieceColour.BLACK, true),
		new ChessPiece(ChessPieceType.ELEPHANT, ChessPieceColour.RED, true),
		new ChessPiece(ChessPieceType.ELEPHANT, ChessPieceColour.BLACK, true),
		new ChessPiece(ChessPieceType.ELEPHANT, ChessPieceColour.RED, true),
		new ChessPiece(ChessPieceType.HORSE, ChessPieceColour.BLACK, true),
		new ChessPiece(ChessPieceType.HORSE, ChessPieceColour.RED, true),
		new ChessPiece(ChessPieceType.HORSE, ChessPieceColour.BLACK, true),
		new ChessPiece(ChessPieceType.HORSE, ChessPieceColour.RED, true),
		new ChessPiece(ChessPieceType.CHARIOT, ChessPieceColour.BLACK, true),
		new ChessPiece(ChessPieceType.CHARIOT, ChessPieceColour.RED, true),
		new ChessPiece(ChessPieceType.CHARIOT, ChessPieceColour.BLACK, true),
		new ChessPiece(ChessPieceType.CHARIOT, ChessPieceColour.RED, true),
		new ChessPiece(ChessPieceType.CANNON, ChessPieceColour.BLACK, true),
		new ChessPiece(ChessPieceType.CANNON, ChessPieceColour.RED, true),
		new ChessPiece(ChessPieceType.CANNON, ChessPieceColour.BLACK, true),
		new ChessPiece(ChessPieceType.CANNON, ChessPieceColour.RED, true),
		new ChessPiece(ChessPieceType.SOLDIER, ChessPieceColour.BLACK, true),
		new ChessPiece(ChessPieceType.SOLDIER, ChessPieceColour.RED, true),
		new ChessPiece(ChessPieceType.SOLDIER, ChessPieceColour.BLACK, true),
		new ChessPiece(ChessPieceType.SOLDIER, ChessPieceColour.RED, true),
		new ChessPiece(ChessPieceType.SOLDIER, ChessPieceColour.BLACK, true),
		new ChessPiece(ChessPieceType.SOLDIER, ChessPieceColour.RED, true),
		new ChessPiece(ChessPieceType.SOLDIER, ChessPieceColour.BLACK, true),
		new ChessPiece(ChessPieceType.SOLDIER, ChessPieceColour.RED, true),
		new ChessPiece(ChessPieceType.SOLDIER, ChessPieceColour.BLACK, true),
		new ChessPiece(ChessPieceType.SOLDIER, ChessPieceColour.RED, true)
	]);
  let turns: (ChessPieceColour | null)[] = [null, null];
	let selected: Coord | null = null;
	let movable: Coord[] = [];
	let isConsecMove = false;
	let wheelRotation = 0;

	const onPickColour = (pickedColour: ChessPieceColour) => {
		turns[0] = pickedColour;
		if (pickedColour === ChessPieceColour.BLACK) {
			turns[1] = ChessPieceColour.RED;
			wheelRotation = 0;
		} else {
			turns[1] = ChessPieceColour.BLACK;
			wheelRotation = 180;
		}
	};

	const onMove = (switchTurns: boolean) => {
		if (switchTurns) {
      isConsecMove = false;
			turns = [turns[1], turns[0]];
			wheelRotation += 180;
		} else {
      isConsecMove = true;
			wheelRotation += 360;
		}
	};

  const onSelect = (coord: Coord | null) => {
    selected = coord;

    if (coord == null) {
      movable = [];
      return;
    }
    const { row, col } = coord;
    
		movable = [];
    if (canMoveUp(board, coord)) {
      movable.push({row: row - 1, col});
    }
    if (canMoveDown(board, coord)) {
      movable.push({row: row + 1, col});
    }
    if (canMoveLeft(board, coord)) {
      movable.push({row, col: col - 1});
    }
    if (canMoveRight(board, coord)) {
      movable.push({row, col: col + 1});
    }
    movable = movable;
  }

	const move = (to: Coord) => {
		const turnColour = turns[0];

		// No chess piece has been selected yet
		if (selected == null) {
			const targetPiece = board[to.row][to.col];

			// Case 1: selected nothing
			if (!targetPiece) {
				return;
			}
			// Case 2: selected a hidden chess piece
			if (targetPiece.isHidden) {
				board[to.row][to.col]!.isHidden = false;
				if (!turnColour) {
					onPickColour(targetPiece.colour);
				}
				onMove(true);
				return;
			}
			// Case 3: selected a chess piece of the correct colour
			if (targetPiece.colour === turnColour) {
        onSelect(to);
				return;
			}
			// Case 4: selected a chess piece of the wrong colour
			if (targetPiece.colour !== turnColour) {
				return;
			}
		}
		// A chess piece has been selected
		else {
      // If clicked on the selected piece, deselect it
      if (coordsEq(to, selected)) {
        onSelect(null);
        if (isConsecMove) onMove(true);
        return;
      }

			// If clicked on a movable square
      if (coordsIn(movable, to)) {
        const selectedPiece = board[selected.row][selected.col]!;
        const targetPiece = board[to.row][to.col];

        // Case 1: move to an empty square
        if (targetPiece == null) {
          if (!isConsecMove) {
            board[to.row][to.col] = selectedPiece;
            board[selected.row][selected.col] = null;
            onMove(true);
            onSelect(null);
          }
          return;
        }
        // Case 2: take a chess piece
        if (!targetPiece.isHidden) {
          board[to.row][to.col] = selectedPiece;
          board[selected.row][selected.col] = null;
          onMove(false);
          onSelect(to);
          return;
        }
        // Case 3: attempt to take a hidden chess piece
        if (targetPiece.isHidden) {
          if (selectedPiece.canTake(targetPiece)) {
            board[to.row][to.col] = selectedPiece;
            board[selected.row][selected.col] = null;
            onMove(false);
            onSelect(to);
          } else {
						board[to.row][to.col]!.isHidden = false;
            onMove(true);
            onSelect(null);
          }
          return;
        }
      }
		}
	};
</script>

<svelte:head>
	<title>半棋</title>
</svelte:head>

<div class="container">
	<div class="header">
		<div>半</div>
		<Wheel
			isActive={turns[0] != null}
			isBlackActive={turns[0] === ChessPieceColour.BLACK}
			isRedActive={turns[0] === ChessPieceColour.RED}
			rotation={wheelRotation}
		/>
		<div>棋</div>
	</div>
	<Board {board} {move} {selected} {movable} />
</div>

<style>
	.container {
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 3rem;
	}

	.header {
		display: flex;
		gap: 1rem;
		justify-content: space-evenly;
		align-items: center;
		font-size: 3rem;
	}
</style>
