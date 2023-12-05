<script lang="ts">
	import type { ChessPiece } from "../entities/piece";

  let { piece } = $props<{piece: ChessPiece}>();
</script>

<div class="container">
  <div class="piece" style:transform={piece.isHidden ? "rotateX(-165deg)" : "rotateX(15deg)"}>
    <div class="bottom" />
    {#each {length: 36} as _}
      <div class="side" />
    {/each}
    <div class="top">
      <img src={piece.image} alt="" width="60px" height="60px" />
    </div>
  </div>
</div>

<style lang="scss">
  .container {
    transform-style: preserve-3d;
  }

  .piece {
    position: relative;
    transform-style: preserve-3d;
    width: 60px;
    height: 60px;
    transition: transform 750ms;
    transform: rotateX(15deg);
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
</style>