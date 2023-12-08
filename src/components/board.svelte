<script lang="ts">
	import { coordsIn, coordsEq } from '../lib/chess';
	import { game } from '../stores/chess';
	import Cell from './cell.svelte';
	import Piece from './piece.svelte';

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

	const topLeftCornerIndices = [8, 10, 12, 14, 17, 23];
	const topRightCornerIndices = [9, 11, 13, 15, 16, 22];
	const bottomLeftCornerIndices = [0, 2, 4, 6, 9, 15];
	const bottomRightCornerIndices = [1, 3, 5, 7, 8, 14];
	const leftLineAcrossIndices = [19, 28];
	const rightLineAcrossIndices = [20, 27];
</script>

<div class="container">
	{#each $game.board as rowPieces, row}
		{#each rowPieces as piece, col}
			{@const i = row * 8 + col}
			<Cell
				topLeftCorner={topLeftCornerIndices.includes(i)}
				topRightCorner={topRightCornerIndices.includes(i)}
				bottomLeftCorner={bottomLeftCornerIndices.includes(i)}
				bottomRightCorner={bottomRightCornerIndices.includes(i)}
				leftLineAcross={leftLineAcrossIndices.includes(i)}
				rightLineAcross={rightLineAcrossIndices.includes(i)}
				onClick={() => {
					$game.move(coords[i]);
					game.set($game);
				}}
				highlighted={coordsIn($game.movable, coords[i])}
			>
				{#if piece != null}
					<Piece
						dropDown 
						piece={piece}
						highlighted={$game.selected != null && coordsEq($game.selected, coords[i])}	
					/>
				{/if}
			</Cell>
		{/each}
	{/each}
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
