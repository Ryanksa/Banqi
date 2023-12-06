<script lang="ts">
	import { coordsIn, type ChessPiece, type Coord, coordsEq } from '../lib/chess';
	import Cell from './cell.svelte';
	import Piece from './piece.svelte';

	const { board, move, selected, movable } = $props<{
		board: (ChessPiece | null)[][],
		move: (coord: Coord) => void,
		selected: Coord | null,
		movable: Coord[],
	}>();

	const coords = [
		{row: 0, col: 0},
		{row: 0, col: 1},
		{row: 0, col: 2},
		{row: 0, col: 3},
		{row: 0, col: 4},
		{row: 0, col: 5},
		{row: 0, col: 6},
		{row: 0, col: 7},
		{row: 1, col: 0},
		{row: 1, col: 1},
		{row: 1, col: 2},
		{row: 1, col: 3},
		{row: 1, col: 4},
		{row: 1, col: 5},
		{row: 1, col: 6},
		{row: 1, col: 7},
		{row: 2, col: 0},
		{row: 2, col: 1},
		{row: 2, col: 2},
		{row: 2, col: 3},
		{row: 2, col: 4},
		{row: 2, col: 5},
		{row: 2, col: 6},
		{row: 2, col: 7},
		{row: 3, col: 0},
		{row: 3, col: 1},
		{row: 3, col: 2},
		{row: 3, col: 3},
		{row: 3, col: 4},
		{row: 3, col: 5},
		{row: 3, col: 6},
		{row: 3, col: 7},
	];
</script>

<div class="container">
	<Cell
		bottomLeftCorner
		onClick={() => move(coords[0])}
		highlighted={coordsIn(movable, coords[0])}
	>
		{#if board[0][0] != null}
			<Piece
				dropDown 
				piece={board[0][0]}
				highlighted={selected != null && coordsEq(selected, coords[0])}	
			/>
		{/if}
	</Cell>
	<Cell
		bottomRightCorner
		onClick={() => move(coords[1])}
		highlighted={coordsIn(movable, coords[1])}
	>
		{#if board[0][1] != null}
			<Piece
				dropDown 
				piece={board[0][1]}
				highlighted={selected != null && coordsEq(selected, coords[1])}	
			/>
		{/if}
	</Cell>
	<Cell
		bottomLeftCorner
		onClick={() => move(coords[2])}
		highlighted={coordsIn(movable, coords[2])}
	>
		{#if board[0][2] != null}
			<Piece
				dropDown 
				piece={board[0][2]}
				highlighted={selected != null && coordsEq(selected, coords[2])}	
			/>
		{/if}
	</Cell>
	<Cell
		bottomRightCorner
		onClick={() => move(coords[3])}
		highlighted={coordsIn(movable, coords[3])}
	>
		{#if board[0][3] != null}
			<Piece
				dropDown 
				piece={board[0][3]}
				highlighted={selected != null && coordsEq(selected, coords[3])}	
			/>
		{/if}
	</Cell>
	<Cell
		bottomLeftCorner
		onClick={() => move(coords[4])}
		highlighted={coordsIn(movable, coords[4])}
	>
		{#if board[0][4] != null}
			<Piece
				dropDown 
				piece={board[0][4]}
				highlighted={selected != null && coordsEq(selected, coords[4])}	
			/>
		{/if}
	</Cell>
	<Cell
		bottomRightCorner
		onClick={() => move(coords[5])}
		highlighted={coordsIn(movable, coords[5])}
	>
		{#if board[0][5] != null}
			<Piece
				dropDown 
				piece={board[0][5]}
				highlighted={selected != null && coordsEq(selected, coords[5])}	
			/>
		{/if}
	</Cell>
	<Cell
		bottomLeftCorner
		onClick={() => move(coords[6])}
		highlighted={coordsIn(movable, coords[6])}
	>
		{#if board[0][6] != null}
			<Piece
				dropDown 
				piece={board[0][6]}
				highlighted={selected != null && coordsEq(selected, coords[6])}	
			/>
		{/if}
	</Cell>
	<Cell
		bottomRightCorner
		onClick={() => move(coords[7])}
		highlighted={coordsIn(movable, coords[7])}
	>
		{#if board[0][7] != null}
			<Piece
				dropDown 
				piece={board[0][7]}
				highlighted={selected != null && coordsEq(selected, coords[7])}	
			/>
		{/if}
	</Cell>
	<Cell
		topLeftCorner bottomRightCorner
		onClick={() => move(coords[8])}
		highlighted={coordsIn(movable, coords[8])}
	>
		{#if board[1][0] != null}
			<Piece
				dropDown 
				piece={board[1][0]}
				highlighted={selected != null && coordsEq(selected, coords[8])}	
			/>
		{/if}
	</Cell>
	<Cell
		topRightCorner bottomLeftCorner
		onClick={() => move(coords[9])}
		highlighted={coordsIn(movable, coords[9])}
	>
		{#if board[1][1] != null}
			<Piece
				dropDown 
				piece={board[1][1]}
				highlighted={selected != null && coordsEq(selected, coords[9])}	
			/>
		{/if}
	</Cell>
	<Cell
		topLeftCorner
		onClick={() => move(coords[10])}
		highlighted={coordsIn(movable, coords[10])}
	>
		{#if board[1][2] != null}
			<Piece
				dropDown 
				piece={board[1][2]}
				highlighted={selected != null && coordsEq(selected, coords[10])}	
			/>
		{/if}
	</Cell>
	<Cell
		topRightCorner
		onClick={() => move(coords[11])}
		highlighted={coordsIn(movable, coords[11])}
	>
		{#if board[1][3] != null}
			<Piece
				dropDown 
				piece={board[1][3]}
				highlighted={selected != null && coordsEq(selected, coords[11])}	
			/>
		{/if}
	</Cell>
	<Cell
		topLeftCorner
		onClick={() => move(coords[12])}
		highlighted={coordsIn(movable, coords[12])}
	>
		{#if board[1][4] != null}
			<Piece
				dropDown 
				piece={board[1][4]}
				highlighted={selected != null && coordsEq(selected, coords[12])}	
			/>
		{/if}
	</Cell>
	<Cell
		topRightCorner
		onClick={() => move(coords[13])}
		highlighted={coordsIn(movable, coords[13])}
	>
		{#if board[1][5] != null}
			<Piece
				dropDown 
				piece={board[1][5]}
				highlighted={selected != null && coordsEq(selected, coords[13])}	
			/>
		{/if}
	</Cell>
	<Cell
		topLeftCorner bottomRightCorner
		onClick={() => move(coords[14])}
		highlighted={coordsIn(movable, coords[14])}
	>
		{#if board[1][6] != null}
			<Piece
				dropDown 
				piece={board[1][6]}
				highlighted={selected != null && coordsEq(selected, coords[14])}	
			/>
		{/if}
	</Cell>
	<Cell
		topRightCorner bottomLeftCorner
		onClick={() => move(coords[15])}
		highlighted={coordsIn(movable, coords[15])}
	>
		{#if board[1][7] != null}
			<Piece
				dropDown 
				piece={board[1][7]}
				highlighted={selected != null && coordsEq(selected, coords[15])}	
			/>
		{/if}
	</Cell>
	<Cell
		topRightCorner
		onClick={() => move(coords[16])}
		highlighted={coordsIn(movable, coords[16])}
	>
		{#if board[2][0] != null}
			<Piece
				dropDown 
				piece={board[2][0]}
				highlighted={selected != null && coordsEq(selected, coords[16])}	
			/>
		{/if}
	</Cell>
	<Cell
		topLeftCorner
		onClick={() => move(coords[17])}
		highlighted={coordsIn(movable, coords[17])}
	>
		{#if board[2][1] != null}
			<Piece
				dropDown 
				piece={board[2][1]}
				highlighted={selected != null && coordsEq(selected, coords[17])}	
			/>
		{/if}
	</Cell>
	<Cell
		onClick={() => move(coords[18])}
		highlighted={coordsIn(movable, coords[18])}
	>
		{#if board[2][2] != null}
			<Piece
				dropDown 
				piece={board[2][2]}
				highlighted={selected != null && coordsEq(selected, coords[18])}	
			/>
		{/if}
	</Cell>
	<Cell
		leftLineAcross
		onClick={() => move(coords[19])}
		highlighted={coordsIn(movable, coords[19])}
	>
		{#if board[2][3] != null}
			<Piece
				dropDown 
				piece={board[2][3]}
				highlighted={selected != null && coordsEq(selected, coords[19])}	
			/>
		{/if}
	</Cell>
	<Cell
		rightLineAcross
		onClick={() => move(coords[20])}
		highlighted={coordsIn(movable, coords[20])}
	>
		{#if board[2][4] != null}
			<Piece
				dropDown 
				piece={board[2][4]}
				highlighted={selected != null && coordsEq(selected, coords[20])}	
			/>
		{/if}
	</Cell>
	<Cell
		onClick={() => move(coords[21])}
		highlighted={coordsIn(movable, coords[21])}>

		{#if board[2][5] != null}
			<Piece
				dropDown 
				piece={board[2][5]}
				highlighted={selected != null && coordsEq(selected, coords[21])}	
			/>
		{/if}
	</Cell>
	<Cell
		topRightCorner
		onClick={() => move(coords[22])}
		highlighted={coordsIn(movable, coords[22])}
	>
		{#if board[2][6] != null}
			<Piece
				dropDown 
				piece={board[2][6]}
				highlighted={selected != null && coordsEq(selected, coords[22])}	
			/>
		{/if}
	</Cell>
	<Cell
		topLeftCorner
		onClick={() => move(coords[23])}
		highlighted={coordsIn(movable, coords[23])}
	>
		{#if board[2][7] != null}
			<Piece
				dropDown 
				piece={board[2][7]}
				highlighted={selected != null && coordsEq(selected, coords[23])}	
			/>
		{/if}
	</Cell>
	<Cell
		onClick={() => move(coords[24])}
		highlighted={coordsIn(movable, coords[24])}
	>
		{#if board[3][0] != null}
			<Piece
				dropDown 
				piece={board[3][0]}
				highlighted={selected != null && coordsEq(selected, coords[24])}	
			/>
		{/if}
	</Cell>
	<Cell
		onClick={() => move(coords[25])}
		highlighted={coordsIn(movable, coords[25])}
	>
		{#if board[3][1] != null}
			<Piece
				dropDown 
				piece={board[3][1]}
				highlighted={selected != null && coordsEq(selected, coords[25])}	
			/>
		{/if}
	</Cell>
	<Cell
		onClick={() => move(coords[26])}
		highlighted={coordsIn(movable, coords[26])}
	>
		{#if board[3][2] != null}
			<Piece
				dropDown 
				piece={board[3][2]}
				highlighted={selected != null && coordsEq(selected, coords[26])}	
			/>
		{/if}
	</Cell>
	<Cell
		rightLineAcross
		onClick={() => move(coords[27])}
		highlighted={coordsIn(movable, coords[27])}
	>
		{#if board[3][3] != null}
			<Piece
				dropDown 
				piece={board[3][3]}
				highlighted={selected != null && coordsEq(selected, coords[27])}	
			/>
		{/if}
	</Cell>
	<Cell
		leftLineAcross
		onClick={() => move(coords[28])}
		highlighted={coordsIn(movable, coords[28])}
	>
		{#if board[3][4] != null}
			<Piece
				dropDown 
				piece={board[3][4]}
				highlighted={selected != null && coordsEq(selected, coords[28])}	
			/>
		{/if}
	</Cell>
	<Cell
		onClick={() => move(coords[29])}
		highlighted={coordsIn(movable, coords[29])}
	>
		{#if board[3][5] != null}
			<Piece
				dropDown 
				piece={board[3][5]}
				highlighted={selected != null && coordsEq(selected, coords[29])}	
			/>
		{/if}
	</Cell>
	<Cell
		onClick={() => move(coords[30])}
		highlighted={coordsIn(movable, coords[30])}
	>
		{#if board[3][6] != null}
			<Piece
				dropDown 
				piece={board[3][6]}
				highlighted={selected != null && coordsEq(selected, coords[30])}	
			/>
		{/if}
	</Cell>
	<Cell
		onClick={() => move(coords[31])}
		highlighted={coordsIn(movable, coords[31])}
	>
		{#if board[3][7] != null}
			<Piece
				dropDown 
				piece={board[3][7]}
				highlighted={selected != null && coordsEq(selected, coords[31])}	
			/>
		{/if}
	</Cell>
</div>

<style>
	.container {
		background-color: var(--wood);
		width: max-content;
		padding: 3rem;
		margin: auto;
		box-sizing: padding-box;
		border-bottom: 3px solid var(--wood-shadow);
		box-shadow: 0 0 9px var(--wood-shadow);
		display: grid;
		grid-template-columns: repeat(8, 90px);
		grid-template-rows: repeat(4, 90px);
		gap: 2px;
	}
</style>
