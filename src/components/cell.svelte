<script lang="ts">
  let {
    topLeftCorner,
    topRightCorner,
    bottomLeftCorner,
    bottomRightCorner,
    leftLineAcross,
    rightLineAcross,
  } = $props<{
    topLeftCorner?: boolean;
    topRightCorner?: boolean;
    bottomLeftCorner?: boolean;
    bottomRightCorner?: boolean;
    leftLineAcross?: boolean;
    rightLineAcross?: boolean;
  }>();
</script>

<div class="cell">
  <svg width="90px" height="90px">
    <path
      d="M5 20 L5 5 L20 5"
      stroke="#000"
      fill="transparent"
      style:display={topLeftCorner ? "block" : "none"}
    />
    <path
      d="M70 5 L85 5 L85 20"
      stroke="#000"
      fill="transparent"
      style:display={topRightCorner ? "block" : "none"}
    />
    <path
      d="M5 70 L5 85 L20 85"
      stroke="#000"
      fill="transparent"
      style:display={bottomLeftCorner ? "block" : "none"}
    />
    <path
      d="M70 85 L85 85 L85 70"
      stroke="#000"
      fill="transparent"
      style:display={bottomRightCorner ? "block" : "none"}
    />
    <path
      d="M0 0 L90 90"
      stroke-width="2"
      stroke="#000"
      fill="transparent"
      style:display={leftLineAcross ? "block" : "none"}
    />
    <path
      d="M90 0 L0 90"
      stroke-width="2"
      stroke="#000"
      fill="transparent"
      style:display={rightLineAcross ? "block" : "none"}
    />
  </svg>
</div>

<style>
  .cell {
    width: 90px;
    height: 90px;
    background-color: var(--wood);
    border: 2px solid black;
  }
</style>