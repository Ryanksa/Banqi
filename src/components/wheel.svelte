<script lang="ts">
  export let isActive: boolean;
  export let isBlackActive: boolean;
  export let isRedActive: boolean;
  export let rotation: number;
</script>

<div class="container" style:opacity={isActive ? 1 : 0.5} style:rotate={`${rotation}deg`}>
  <div 
    class="black-half"
  />
  <div 
    class="red-half"
  />
  <div 
    class="black-circle"
  />
  <div 
    class="red-circle"
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
  }

  .red-half {
    position: absolute;
    right: 0;
    top: calc(50% - 3rem);
    width: 3rem;
    height: 6rem;
    border-radius: 0 3rem 3rem 0;
    background-color: var(--red);
  }

  .black-circle {
    position: absolute;
    left: calc(50% - 1.5rem);
    top: 0;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background-color: var(--black);
  }

  .red-circle {
    position: absolute;
    left: calc(50% - 1.5rem);
    bottom: 0;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background-color: var(--red);
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