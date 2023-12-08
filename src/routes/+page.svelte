<script lang="ts">
	import {
		ChessPiece,
		ChessPieceColour,
	} from '$lib/chess';
	import Board from '../components/board.svelte';
	import Piece from '../components/piece.svelte';
	import Wheel from '../components/wheel.svelte';
	import { game } from '../stores/chess';

	let wheelRotation = 0;
	let coloursPicked = false;
	let isBlackActive = false;
	let isRedActive = false;

	game.subscribe((game) => {
		if (!coloursPicked) {
			if (game.turns[0] === ChessPieceColour.BLACK) {
				isBlackActive = true;
				wheelRotation = 0;
				coloursPicked = true;
			} else if (game.turns[0] === ChessPieceColour.RED) {
				isRedActive = true;
				wheelRotation = 180;
				coloursPicked = true;
			}
		} else {
			if (game.isConsecMove) {
				wheelRotation += 360;
			} else if (isRedActive && game.turns[0] === ChessPieceColour.BLACK) {
				isBlackActive = true;
				isRedActive = false;
				wheelRotation += 180;
			} else if (isBlackActive && game.turns[0] === ChessPieceColour.RED) {
				isBlackActive = false;
				isRedActive = true;
				wheelRotation += 180;
			}
		}
	});
</script>

<svelte:head>
	<title>半棋</title>
</svelte:head>

<div class="container">
	<div class="header">
		<div>半</div>
		<Wheel
			isActive={coloursPicked}
			isBlackActive={isBlackActive}
			isRedActive={isRedActive}
			rotation={wheelRotation}
		/>
		<div>棋</div>
	</div>
	<div class="game-container">
		<div class="taken-red">
			{#each $game.takenRed as piece (piece.id)}
				<Piece piece={piece} dropDown />
			{/each}
		</div>
		<Board />
		<div class="taken-black">
			{#each $game.takenBlack as piece (piece.id)}
				<Piece piece={piece} dropDown />
			{/each}
		</div>
	</div>
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

	.game-container {
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
</style>
