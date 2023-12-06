<script lang="ts">
	import type { ChessPiece } from '../lib/chess';
	import Cell from './cell.svelte';
	import Piece from './piece.svelte';

	const { board, move } = $props<{
		board: (ChessPiece | null)[][],
		move: (x: number, y: number) => void,
	}>();
</script>

<div class="container">
	<Cell onClick={() => move(0, 0)} bottomLeftCorner>
		{#if board[0][0] != null}
			<Piece dropDown piece={board[0][0]} />
		{/if}
	</Cell>
	<Cell onClick={() => move(0, 1)} bottomRightCorner>
		{#if board[0][1] != null}
			<Piece dropDown piece={board[0][1]} />
		{/if}
	</Cell>
	<Cell onClick={() => move(0, 2)} bottomLeftCorner>
		{#if board[0][2] != null}
			<Piece dropDown piece={board[0][2]} />
		{/if}
	</Cell>
	<Cell onClick={() => move(0, 3)} bottomRightCorner>
		{#if board[0][3] != null}
			<Piece dropDown piece={board[0][3]} />
		{/if}
	</Cell>
	<Cell onClick={() => move(0, 4)} bottomLeftCorner>
		{#if board[0][4] != null}
			<Piece dropDown piece={board[0][4]} />
		{/if}
	</Cell>
	<Cell onClick={() => move(0, 5)} bottomRightCorner>
		{#if board[0][5] != null}
			<Piece dropDown piece={board[0][5]} />
		{/if}
	</Cell>
	<Cell onClick={() => move(0, 6)} bottomLeftCorner>
		{#if board[0][6] != null}
			<Piece dropDown piece={board[0][6]} />
		{/if}
	</Cell>
	<Cell onClick={() => move(0, 7)} bottomRightCorner>
		{#if board[0][7] != null}
			<Piece dropDown piece={board[0][7]} />
		{/if}
	</Cell>
	<Cell onClick={() => move(1, 0)} topLeftCorner bottomRightCorner>
		{#if board[1][0] != null}
			<Piece dropDown piece={board[1][0]} />
		{/if}
	</Cell>
	<Cell onClick={() => move(1, 1)} topRightCorner bottomLeftCorner>
		{#if board[1][1] != null}
			<Piece dropDown piece={board[1][1]} />
		{/if}
	</Cell>
	<Cell onClick={() => move(1, 2)} topLeftCorner>
		{#if board[1][2] != null}
			<Piece dropDown piece={board[1][2]} />
		{/if}
	</Cell>
	<Cell onClick={() => move(1, 3)} topRightCorner>
		{#if board[1][3] != null}
			<Piece dropDown piece={board[1][3]} />
		{/if}
	</Cell>
	<Cell onClick={() => move(1, 4)} topLeftCorner>
		{#if board[1][4] != null}
			<Piece dropDown piece={board[1][4]} />
		{/if}
	</Cell>
	<Cell onClick={() => move(1, 5)} topRightCorner>
		{#if board[1][5] != null}
			<Piece dropDown piece={board[1][5]} />
		{/if}
	</Cell>
	<Cell onClick={() => move(1, 6)} topLeftCorner bottomRightCorner>
		{#if board[1][6] != null}
			<Piece dropDown piece={board[1][6]} />
		{/if}
	</Cell>
	<Cell onClick={() => move(1, 7)} topRightCorner bottomLeftCorner>
		{#if board[1][7] != null}
			<Piece dropDown piece={board[1][7]} />
		{/if}
	</Cell>
	<Cell onClick={() => move(2, 0)} topRightCorner>
		{#if board[2][0] != null}
			<Piece dropDown piece={board[2][0]} />
		{/if}
	</Cell>
	<Cell onClick={() => move(2, 1)} topLeftCorner>
		{#if board[2][1] != null}
			<Piece dropDown piece={board[2][1]} />
		{/if}
	</Cell>
	<Cell onClick={() => move(2, 2)}>
		{#if board[2][2] != null}
			<Piece dropDown piece={board[2][2]} />
		{/if}
	</Cell>
	<Cell onClick={() => move(2, 3)} leftLineAcross>
		{#if board[2][3] != null}
			<Piece dropDown piece={board[2][3]} />
		{/if}
	</Cell>
	<Cell onClick={() => move(2, 4)} rightLineAcross>
		{#if board[2][4] != null}
			<Piece dropDown piece={board[2][4]} />
		{/if}
	</Cell>
	<Cell onClick={() => move(2, 5)}>
		{#if board[2][5] != null}
			<Piece dropDown piece={board[2][5]} />
		{/if}
	</Cell>
	<Cell onClick={() => move(2, 6)} topRightCorner>
		{#if board[2][6] != null}
			<Piece dropDown piece={board[2][6]} />
		{/if}
	</Cell>
	<Cell onClick={() => move(2, 7)} topLeftCorner>
		{#if board[2][7] != null}
			<Piece dropDown piece={board[2][7]} />
		{/if}
	</Cell>
	<Cell onClick={() => move(3, 0)}>
		{#if board[3][0] != null}
			<Piece dropDown piece={board[3][0]} />
		{/if}
	</Cell>
	<Cell onClick={() => move(3, 1)}>
		{#if board[3][1] != null}
			<Piece dropDown piece={board[3][1]} />
		{/if}
	</Cell>
	<Cell onClick={() => move(3, 2)}>
		{#if board[3][2] != null}
			<Piece dropDown piece={board[3][2]} />
		{/if}
	</Cell>
	<Cell onClick={() => move(3, 3)} rightLineAcross>
		{#if board[3][3] != null}
			<Piece dropDown piece={board[3][3]} />
		{/if}
	</Cell>
	<Cell onClick={() => move(3, 4)} leftLineAcross>
		{#if board[3][4] != null}
			<Piece dropDown piece={board[3][4]} />
		{/if}
	</Cell>
	<Cell onClick={() => move(3, 5)}>
		{#if board[3][5] != null}
			<Piece dropDown piece={board[3][5]} />
		{/if}
	</Cell>
	<Cell onClick={() => move(3, 6)}>
		{#if board[3][6] != null}
			<Piece dropDown piece={board[3][6]} />
		{/if}
	</Cell>
	<Cell onClick={() => move(3, 7)}>
		{#if board[3][7] != null}
			<Piece dropDown piece={board[3][7]} />
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
