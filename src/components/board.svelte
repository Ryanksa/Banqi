<script>
	import Cell from "./cell.svelte";

</script>
<div class="container">
  <Cell bottomLeftCorner />
  <Cell bottomRightCorner />
  <Cell bottomLeftCorner />
  <Cell bottomRightCorner />
  <Cell bottomLeftCorner />
  <Cell bottomRightCorner />
  <Cell bottomLeftCorner />
  <Cell bottomRightCorner />
  <Cell topLeftCorner bottomRightCorner />
  <Cell topRightCorner bottomLeftCorner />
  <Cell topLeftCorner />
  <Cell topRightCorner />
  <Cell topLeftCorner />
  <Cell topRightCorner />
  <Cell topLeftCorner bottomRightCorner />
  <Cell topRightCorner bottomLeftCorner />
  <Cell topRightCorner />
  <Cell topLeftCorner />
  <Cell />
  <Cell leftLineAcross />
  <Cell rightLineAcross />
  <Cell />
  <Cell topRightCorner />
  <Cell topLeftCorner />
  <Cell />
  <Cell />
  <Cell />
  <Cell rightLineAcross />
  <Cell leftLineAcross />
  <Cell />
  <Cell />
  <Cell />
</div>

<style>
  .container {
    background-color: var(--wood);
    width: max-content;
    padding: 3rem;
    margin: auto;
    box-sizing: padding-box;
    border-bottom: 6px solid var(--wood-shadow);
    box-shadow: 0 0 9px var(--wood-shadow);
    display: grid;
    grid-template-columns: repeat(8, 90px);
    grid-template-rows: repeat(4, 90px);
    gap: 2px;
  }
</style>