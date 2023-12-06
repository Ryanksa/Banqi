<svelte:head>
  <title>半棋</title>
</svelte:head>

<script lang="ts">
	import { ChessPiece, ChessPieceColour, ChessPieceType, shuffleBoard, type Coord } from "$lib/chess";
	import { swap } from "$lib/utils";
	import Board from "../components/board.svelte";
  import Wheel from "../components/wheel.svelte";

  // Board states
  const board = $state(shuffleBoard([
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
  ]));
  let selected = $state<Coord | null>(null);
	const turns = $state<(ChessPieceColour | null)[]>([null, null]);
  let wheelRotation = $state(0);

  const onMove = (flip: boolean) => {
    if (flip) {
      swap(turns);
      wheelRotation += 180;
    } else {
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

	const move = $derived((x: number, y: number) => {
		const turnColour = turns[0];

		// No chess piece has been selected yet
		if (selected == null) {
			const piece = board[x][y];
      console.log(piece);
			
			// Case 1: selected nothing
			if (!piece) {
				return;
			}
			// Case 2: selected a hidden chess piece
			if (piece.isHidden) {
				board[x][y]!.isHidden = false;
				if (!turnColour) {
					setTurnColours(piece.colour);
				}
        onMove(true);
				return;
			}
			// Case 3: selected a chess piece of the correct colour
			if (piece.colour === turnColour) {
				selected = { x, y };
				return;
			}
			// Case 4: selected a chess piece of the wrong colour
			if (piece.colour !== turnColour) {
				return;
			}
		}
		// A chess piece has been selected
		else {}
	});
</script>

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
  <Board board={board} move={move} />
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
