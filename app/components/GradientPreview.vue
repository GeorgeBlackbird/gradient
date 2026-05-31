<script setup lang="ts">
const { css } = useGradient()
</script>

<template>
  <div
    class="gradient-preview"
    :style="{
      background: css,
    }"
  >
    <div class="gradient-preview__overlay"/>

    <div class="gradient-preview__content">
      <h1>Gradient Generator</h1>

      <p>
        Generate beautiful gradients
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.gradient-preview {
  position: relative;

  width: 100%;
  min-height: 100vh;

  overflow: hidden;

  background-size: 200% 200%;

  animation: gradient-flow 12s ease infinite;

  &__overlay {
    position: absolute;
    inset: 0;

    background:
      radial-gradient(
        circle at top left,
        rgb(255 255 255 / 0.15),
        transparent 40%
      ),
      radial-gradient(
        circle at bottom right,
        rgb(255 255 255 / 0.1),
        transparent 50%
      );

    pointer-events: none;
  }

  &__content {
    position: relative;
    z-index: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    min-height: 100vh;

    text-align: center;

    color: white;
  }

  h1 {
    margin: 0;

    font-size: clamp(
      3rem,
      8vw,
      7rem
    );

    font-weight: 800;

    letter-spacing: -0.04em;

    text-shadow:
      0 10px 30px rgb(0 0 0 / 0.15);
  }

  p {
    margin-top: 1rem;

    font-size: 1.125rem;

    opacity: 0.85;
  }
}

@keyframes gradient-flow {
  0% {
    background-position:
      0% 50%;
  }

  50% {
    background-position:
      100% 50%;
  }

  100% {
    background-position:
      0% 50%;
  }
}
</style>
