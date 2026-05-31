<script setup lang="ts">
const {
  cssDeclaration,
  generateRandomGradient,
} = useGradient()

const { copy, copied } = useClipboard()

const copyCss = async () => {
  await copy(cssDeclaration.value)
}
</script>

<template>
  <div class="gradient-controls">
    <button
      class="gradient-controls__button"
      @click="generateRandomGradient"
    >
      🎲 Random
    </button>

    <button
      class="gradient-controls__button"
      @click="copyCss"
    >
      {{ copied ? '✅ Copied' : '📋 Copy CSS' }}
    </button>
  </div>
</template>

<style scoped lang="scss">
.gradient-controls {
  position: fixed;

  top: 24px;
  right: 24px;

  z-index: 100;

  display: flex;
  gap: 12px;

  padding: 12px;

  border: 1px solid rgb(255 255 255 / 0.15);
  border-radius: 20px;

  background: rgb(255 255 255 / 0.08);

  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
}

.gradient-controls__button {
  border: none;
  border-radius: 12px;

  padding: 12px 18px;

  background: rgb(255 255 255 / 0.12);

  color: white;

  font-size: 0.95rem;
  font-weight: 600;

  cursor: pointer;

  transition:
    transform 0.2s ease,
    background-color 0.2s ease;
}

.gradient-controls__button:hover {
  transform: translateY(-2px);

  background: rgb(255 255 255 / 0.2);
}

.gradient-controls__button:active {
  transform: translateY(0);
}
</style>
