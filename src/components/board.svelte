<script lang="ts">
	import { shuffleBoard } from '../lib/piece';
	import Cell from './cell.svelte';
	import Piece from './piece.svelte';

	const board = $state(shuffleBoard());
</script>

<div class="container">
	<Cell bottomLeftCorner>
		{#if board[0][0] != null}
			<Piece dropDown piece={board[0][0]} />
		{/if}
	</Cell>
	<Cell bottomRightCorner>
		{#if board[0][1] != null}
			<Piece dropDown piece={board[0][1]} />
		{/if}
	</Cell>
	<Cell bottomLeftCorner>
		{#if board[0][2] != null}
			<Piece dropDown piece={board[0][2]} />
		{/if}
	</Cell>
	<Cell bottomRightCorner>
		{#if board[0][3] != null}
			<Piece dropDown piece={board[0][3]} />
		{/if}
	</Cell>
	<Cell bottomLeftCorner>
		{#if board[0][4] != null}
			<Piece dropDown piece={board[0][4]} />
		{/if}
	</Cell>
	<Cell bottomRightCorner>
		{#if board[0][5] != null}
			<Piece dropDown piece={board[0][5]} />
		{/if}
	</Cell>
	<Cell bottomLeftCorner>
		{#if board[0][6] != null}
			<Piece dropDown piece={board[0][6]} />
		{/if}
	</Cell>
	<Cell bottomRightCorner>
		{#if board[0][7] != null}
			<Piece dropDown piece={board[0][7]} />
		{/if}
	</Cell>
	<Cell topLeftCorner bottomRightCorner>
		{#if board[1][0] != null}
			<Piece dropDown piece={board[1][0]} />
		{/if}
	</Cell>
	<Cell topRightCorner bottomLeftCorner>
		{#if board[1][1] != null}
			<Piece dropDown piece={board[1][1]} />
		{/if}
	</Cell>
	<Cell topLeftCorner>
		{#if board[1][2] != null}
			<Piece dropDown piece={board[1][2]} />
		{/if}
	</Cell>
	<Cell topRightCorner>
		{#if board[1][3] != null}
			<Piece dropDown piece={board[1][3]} />
		{/if}
	</Cell>
	<Cell topLeftCorner>
		{#if board[1][4] != null}
			<Piece dropDown piece={board[1][4]} />
		{/if}
	</Cell>
	<Cell topRightCorner>
		{#if board[1][5] != null}
			<Piece dropDown piece={board[1][5]} />
		{/if}
	</Cell>
	<Cell topLeftCorner bottomRightCorner>
		{#if board[1][6] != null}
			<Piece dropDown piece={board[1][6]} />
		{/if}
	</Cell>
	<Cell topRightCorner bottomLeftCorner>
		{#if board[1][7] != null}
			<Piece dropDown piece={board[1][7]} />
		{/if}
	</Cell>
	<Cell topRightCorner>
		{#if board[2][0] != null}
			<Piece dropDown piece={board[2][0]} />
		{/if}
	</Cell>
	<Cell topLeftCorner>
		{#if board[2][1] != null}
			<Piece dropDown piece={board[2][1]} />
		{/if}
	</Cell>
	<Cell>
		{#if board[2][2] != null}
			<Piece dropDown piece={board[2][2]} />
		{/if}
	</Cell>
	<Cell leftLineAcross>
		{#if board[2][3] != null}
			<Piece dropDown piece={board[2][3]} />
		{/if}
	</Cell>
	<Cell rightLineAcross>
		{#if board[2][4] != null}
			<Piece dropDown piece={board[2][4]} />
		{/if}
	</Cell>
	<Cell>
		{#if board[2][5] != null}
			<Piece dropDown piece={board[2][5]} />
		{/if}
	</Cell>
	<Cell topRightCorner>
		{#if board[2][6] != null}
			<Piece dropDown piece={board[2][6]} />
		{/if}
	</Cell>
	<Cell topLeftCorner>
		{#if board[2][7] != null}
			<Piece dropDown piece={board[2][7]} />
		{/if}
	</Cell>
	<Cell>
		{#if board[3][0] != null}
			<Piece dropDown piece={board[3][0]} />
		{/if}
	</Cell>
	<Cell>
		{#if board[3][1] != null}
			<Piece dropDown piece={board[3][1]} />
		{/if}
	</Cell>
	<Cell>
		{#if board[3][2] != null}
			<Piece dropDown piece={board[3][2]} />
		{/if}
	</Cell>
	<Cell rightLineAcross>
		{#if board[3][3] != null}
			<Piece dropDown piece={board[3][3]} />
		{/if}
	</Cell>
	<Cell leftLineAcross>
		{#if board[3][4] != null}
			<Piece dropDown piece={board[3][4]} />
		{/if}
	</Cell>
	<Cell>
		{#if board[3][5] != null}
			<Piece dropDown piece={board[3][5]} />
		{/if}
	</Cell>
	<Cell>
		{#if board[3][6] != null}
			<Piece dropDown piece={board[3][6]} />
		{/if}
	</Cell>
	<Cell>
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
