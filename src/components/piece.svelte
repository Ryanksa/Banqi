<script lang="ts">
	import type { ChessPiece } from '../lib/chess';
	import { getRandomInt } from '../lib/utils';

	export let piece: ChessPiece;
	export let selected: boolean = false;
	export let dropDown: boolean = false;
	export let floatUp: boolean = false;

	// Random rotation when dropping / floating
	const x = getRandomInt(0, 7);
	const y = getRandomInt(0, 7);
	const z = getRandomInt(0, 7);
	const a = getRandomInt(0, 361);
</script>

<div
	class="container"
	class:selected
	class:drop-down={dropDown}
	class:float-up={floatUp}
	style:--x={x}
	style:--y={y}
	style:--z={z}
	style:--a={`${a}deg`}
>
	<div class="piece" style:transform={piece.isHidden ? 'rotateX(-165deg)' : 'rotateX(15deg)'}>
		<div class="bottom" />
		{#each { length: 36 } as _}
			<div class="side" />
		{/each}
		<div class="top">
			<img src={piece.image} alt="" width="60px" height="60px" />
		</div>
	</div>
</div>

<style lang="scss">
	.container {
		position: relative;
		transform-style: preserve-3d;
		bottom: var(--bottom);
		transform: var(--transform);
		transition: bottom 300ms, transform 300ms;
		--bottom: 0;
		--transform: none;
	}

	.container.selected {
		--bottom: 15px;
		--transform: rotateX(12deg);
	}

	.container.drop-down {
		animation: drop-down 750ms ease-out;
	}

	.container.float-up {
		animation: float-up 1800ms ease-in forwards;
	}

	.piece {
		position: relative;
		transform-style: preserve-3d;
		width: 60px;
		height: 60px;
		transition: transform 750ms;
	}

	.top {
		position: absolute;
		left: calc(50% - 30px);
		top: calc(50% - 30px);
		width: 100%;
		height: 100%;
		border-radius: 50%;
		box-sizing: border-box;
		border: 1px solid var(--chesspiece-side);
		translate: 0 0 12px;
	}

	.bottom {
		position: absolute;
		left: calc(50% - 30px);
		top: calc(50% - 30px);
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background-color: var(--chesspiece-back);
		box-sizing: border-box;
		border: 1px solid var(--chesspiece-side);
	}

	.side {
		position: absolute;
		bottom: 50%;
		left: calc(50% - 3px);
		width: 6px;
		height: 12px;
		background-color: var(--chesspiece-side);
		transform-origin: bottom;
		transform: rotateX(-90deg) rotateY(var(--ry)) translateZ(30px);
	}

	@for $i from 1 through 37 {
		.side:nth-child(#{$i}) {
			--ry: #{($i - 1) * 10}deg;
		}
	}

	@keyframes drop-down {
		0% {
			bottom: 120px;
			transform: rotate3d(var(--x), var(--y), var(--z), var(--a));
		}
		50% {
			bottom: var(--bottom);
			transform: rotate3d(2, 3, 1, -30deg);
		}
		60% {
			bottom: var(--bottom);
			transform: rotate3d(2, -1, 0, 24deg);
		}
		75% {
			bottom: var(--bottom);
			transform: rotate3d(3, 1, 0, 24deg);
		}
		90% {
			bottom: var(--bottom);
			transform: rotate3d(3, 1, 0, 6deg);
		}
		100% {
			bottom: var(--bottom);
			transform: var(--transform);
		}
	}

	@keyframes float-up {
		0% {
			bottom: var(--bottom);
			transform: var(--transform);
		}
		99% {
			bottom: 100vh;
			transform: rotate3d(var(--x), var(--y), var(--z), var(--a));
		}
		100% {
			bottom: 100vh;
			transform: none;
			display: none;
		}
	}
</style>
