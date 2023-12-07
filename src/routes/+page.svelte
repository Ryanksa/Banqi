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
	import { swap } from '$lib/utils';
	import Board from '../components/board.svelte';
	import Wheel from '../components/wheel.svelte';

	// Board states
	let board = $state(
		shuffleBoard([
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
		])
	);
  const turns = $state<(ChessPieceColour | null)[]>([null, null]);
	let selected = $state<Coord | null>(null);
  let movable = $state<Coord[]>([]);
  let isConsecMove = $state(false);
	let wheelRotation = $state(0);

	const onMove = (flip: boolean) => {
		if (flip) {
      isConsecMove = false;
			swap(turns);
			wheelRotation += 180;
		} else {
      isConsecMove = true;
			wheelRotation += 360;
		}
	};

	const setTurnColours = (movedColour: ChessPieceColour) => {
		turns[0] = movedColour;
		if (movedColour === ChessPieceColour.BLACK) {
			turns[1] = ChessPieceColour.RED;
			wheelRotation = 0;
		} else {
			turns[1] = ChessPieceColour.BLACK;
			wheelRotation = 180;
		}
	};

  const onSelect = (coord: Coord | null) => {
    selected = coord;

    if (coord == null) {
      movable = [];
      return;
    }
    const { row, col } = coord;
    
    const newMovable = [];
    if (canMoveUp(board, coord)) {
      newMovable.push({row: row - 1, col});
    }
    if (canMoveDown(board, coord)) {
      newMovable.push({row: row + 1, col});
    }
    if (canMoveLeft(board, coord)) {
      newMovable.push({row, col: col - 1});
    }
    if (canMoveRight(board, coord)) {
      newMovable.push({row, col: col + 1});
    }
    movable = newMovable;
  }

	const move = (coord: Coord) => {
		const turnColour = turns[0];

		// No chess piece has been selected yet
		if (selected == null) {
			const piece = board[coord.row][coord.col];

			// Case 1: selected nothing
			if (!piece) {
				return;
			}
			// Case 2: selected a hidden chess piece
			if (piece.isHidden) {
				board[coord.row][coord.col]!.isHidden = false;
				if (!turnColour) {
					setTurnColours(piece.colour);
				}
				onMove(true);
				return;
			}
			// Case 3: selected a chess piece of the correct colour
			if (piece.colour === turnColour) {
        onSelect(coord);
				return;
			}
			// Case 4: selected a chess piece of the wrong colour
			if (piece.colour !== turnColour) {
				return;
			}
		}
		// A chess piece has been selected
		else {
      // If clicked on the selected piece, deselect it
      if (coordsEq(coord, selected)) {
        onSelect(null);
        if (isConsecMove) {
          onMove(true);
        }
        return;
      }

      if (coordsIn(movable, coord)) {
        const selectedPiece = board[selected.row][selected.col]!;
        const targetPiece = board[coord.row][coord.col];

        // Case 1: move to an empty spot
        if (targetPiece == null) {
          if (!isConsecMove) {
            board[coord.row][coord.col] = selectedPiece;
            board[selected.row][selected.col] = null;
            onMove(true);
            onSelect(null);
          }
          return;
        }
        // Case 2: take a chess piece
        if (!targetPiece.isHidden) {
          board[coord.row][coord.col] = selectedPiece;
          board[selected.row][selected.col] = null;
          onMove(false);
          onSelect(coord);
          return;
        }
        // Case 3: attempt to take a hidden chess piece
        if (targetPiece.isHidden) {
          targetPiece.isHidden = false;
          if (selectedPiece.canTake(targetPiece)) {
            board[coord.row][coord.col] = selectedPiece;
            board[selected.row][selected.col] = null;
            onMove(false);
            onSelect(coord);
          } else {
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
