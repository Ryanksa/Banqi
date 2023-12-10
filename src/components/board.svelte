<script lang="ts">
	import { flip } from 'svelte/animate';
	import { coordsIn, coordsEq, type Coord } from '../lib/chess';
	import { send, receive } from "../lib/transition";
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

	const handleClick = (coord: Coord) => {
		$game.move(coord);
		game.set($game);
	};
</script>

<div class="container">
	<div class="taken-red">
		{#each $game.takenRed as piece (piece.id)}
			<Piece piece={piece} dropDown floatUp={$game.ended} />
		{/each}
	</div>
	<div class="board-container">
		<div class="board">
			{#each $game.board as rowPieces, row}
				{#each rowPieces as _piece, col}
					{@const i = row * 8 + col}
					<Cell
						topLeftCorner={topLeftCornerIndices.includes(i)}
						topRightCorner={topRightCornerIndices.includes(i)}
						bottomLeftCorner={bottomLeftCornerIndices.includes(i)}
						bottomRightCorner={bottomRightCornerIndices.includes(i)}
						leftLineAcross={leftLineAcrossIndices.includes(i)}
						rightLineAcross={rightLineAcrossIndices.includes(i)}
						onClick={() => handleClick(coords[i])}
						highlighted={coordsIn($game.movable, coords[i])}
					/>
				{/each}
			{/each}
		</div>
		<div class="board pieces">
			{#each $game.board as rowPieces, row}
				{#each rowPieces as piece, col (piece ? `p${piece.id}` : `e${row * 8 + col}`)}
					{@const i = row * 8 + col}
					<div
						class="piece"
						on:click={(event) => {
							event.stopPropagation();
							handleClick(coords[i]);
						}}
						in:receive={{ key: piece?.id }}
						out:send={{ key: piece?.id }}
						animate:flip={{ duration: 300 }}
					>
						{#if piece != null}
							<Piece
								piece={piece}
								selected={$game.selected != null && coordsEq($game.selected, coords[i])}
								dropDown
								floatUp={$game.ended}
							/>
						{/if}
					</div>
				{/each}
			{/each}
		</div>
	</div>
	<div class="taken-black">
		{#each $game.takenBlack as piece (piece.id)}
			<Piece piece={piece} dropDown floatUp={$game.ended} />
		{/each}
	</div>
</div>

<style>
.container {
		position: relative;
		height: 480px;
		margin: auto;
	}

	.taken-red {
		position: absolute;
		top: 0;
		right: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap-reverse;
	}

	.taken-black {
		position: absolute;
		top: 0;
		left: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
	}

	.board-container {
		position: relative;
		width: max-content;
		padding: 3rem;
		background-color: var(--wood);
		box-shadow: 0 0 9px var(--wood-shadow);
		border-bottom: 3px solid var(--wood-shadow);
	}

	.board {
		box-sizing: padding-box;
		display: grid;
		grid-template-columns: repeat(8, 90px);
		grid-template-rows: repeat(4, 90px);
		gap: 2px;
		cursor: pointer;
	}

	.board.pieces {
		position: absolute;
		left: 50%;
		top: 50%;
		translate: -50% -50%;
		z-index: 1;
	}
	
	.piece {
		width: 90px;
    height: 90px;
    border: 2px solid transparent;
    display: grid;
		place-items: center;
	}
</style>
