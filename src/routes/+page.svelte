<svelte:head>
  <title>暗棋</title>
</svelte:head>

<script lang="ts">
	import Board from "../components/board.svelte";
import Wheel from "../components/wheel.svelte";

  let isWheelActive = $state(false);
  let isBlackActive = $state(false);
  let isRedActive = $state(false);
  let wheelRotation = $state(0);

  const activateWheel = (blackActive: boolean) => {
    isWheelActive = true;
    isBlackActive = blackActive;
    isRedActive = !blackActive;
    if (blackActive) wheelRotation = 0;
    else wheelRotation = 180;
  };

  const turnWheel = (flip: boolean) => {
    if (flip) {
      isBlackActive = !isBlackActive;
      isRedActive = !isRedActive;
      wheelRotation += 180;
    } else {
      wheelRotation += 360;
    }
  };
</script>

<div class="container">
  <div class="header">
    <div>暗</div>
    <Wheel
      isActive={isWheelActive}
      isBlackActive={isBlackActive}
      isRedActive={isRedActive}
      rotation={wheelRotation}
    />
    <div>棋</div>
  </div>
  <Board />
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
