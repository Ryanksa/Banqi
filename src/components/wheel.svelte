<script lang="ts">
  let { isActive, isBlackActive, isRedActive, rotation } = $props<{
    isActive: boolean, 
    isBlackActive: boolean,
    isRedActive: boolean,
    rotation: number,
  }>();
</script>

<div class="container" style:opacity={isActive ? 1 : 0.5} style:rotate={`${rotation}deg`}>
  <div 
    class="black-half" 
    style:--blur={isBlackActive ? "0px" : "1.5px"}
  />
  <div 
    class="red-half" 
    style:--blur={isRedActive ? "0px" : "1.5px"}
  />
  <div 
    class="black-circle" 
    style:--blur={isBlackActive ? "0px" : "1.5px"}
  />
  <div 
    class="red-circle" 
    style:--blur={isRedActive ? "0px" : "1.5px"}
  />
  <div 
    class="black-eye"
    style:opacity={isBlackActive ? 1 : 0}
  />
  <div 
    class="red-eye"
    style:opacity={isRedActive ? 1 : 0}
  />
</div>

<style>
  .container {
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    position: relative;
    transition: rotate 300ms;
  }

  .black-half {
    position: absolute;
    left: 0;
    top: calc(50% - 3rem);
    width: 3rem;
    height: 6rem;
    border-radius: 3rem 0 0 3rem;
    background-color: var(--black);
    filter: blur(var(--blur));
    transition: filter 300ms;
  }

  .red-half {
    position: absolute;
    right: 0;
    top: calc(50% - 3rem);
    width: 3rem;
    height: 6rem;
    border-radius: 0 3rem 3rem 0;
    background-color: var(--red);
    filter: blur(var(--blur));
    transition: filter 300ms;
  }

  .black-circle {
    position: absolute;
    left: calc(50% - 1.5rem);
    top: 0;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background-color: var(--black);
    filter: blur(var(--blur));
    transition: filter 300ms;
  }

  .red-circle {
    position: absolute;
    left: calc(50% - 1.5rem);
    bottom: 0;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background-color: var(--red);
    filter: blur(var(--blur));
    transition: filter 300ms;
  }

  .black-eye {
    position: absolute;
    top: 0.75rem;
    left: calc(50% - 0.25rem);
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 0 50% 50% 50%;
    background-color: var(--red);
    transform: rotate(-15deg) skew(12deg, 12deg);
    transition: opacity 300ms;
  }

  .red-eye {
    position: absolute;
    bottom: 0.75rem;
    right: calc(50% - 0.25rem);
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50% 50% 0 50%;
    background-color: var(--black);
    transform: rotate(-15deg) skew(12deg, 12deg);
    transition: opacity 300ms;
  }
</style>