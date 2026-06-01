<script setup lang="ts">
const {
  favorites,
  applyFavorite,
  removeFavorite,
} = useGradient()
</script>

<template>
  <Transition name="favorites">
    <div
      v-if="favorites.length"
      class="favorite-gradients"
    >
      <div class="favorite-gradients__header">
        <span>
          Favorites
        </span>

        <span>
          {{ favorites.length }}
        </span>
      </div>

      <div class="favorite-gradients__list">
        <div
          v-for="favorite in favorites"
          :key="favorite.id"
          class="favorite-gradients__card"
        >
          <button
            class="favorite-gradients__preview"
            :style="{
              background: createGradientCss(
                favorite.gradient,
              ),
            }"
            @click="
              applyFavorite(
                favorite.id,
              )
            "
          />

          <button
            class="favorite-gradients__delete"
            @click="
              removeFavorite(
                favorite.id,
              )
            "
          >
            ×
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.favorite-gradients {
  position: fixed;

  left: 50%;
  bottom: 24px;

  transform: translateX(-50%);

  z-index: 100;

  width: min(
    900px,
    calc(100vw - 32px)
  );

  padding: 16px;

  border: 1px solid
    rgb(255 255 255 / 0.15);

  border-radius: 24px;

  background:
    rgb(255 255 255 / 0.08);

  backdrop-filter: blur(24px);

  &__header {
    display: flex;
    justify-content: space-between;

    margin-bottom: 12px;

    color: white;

    font-size: 0.875rem;

    opacity: 0.8;
  }

  &__list {
    display: flex;
    gap: 12px;

    overflow-x: auto;

    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__card {
    position: relative;

    flex-shrink: 0;
  }

  &__preview {
    width: 120px;
    height: 72px;

    border: none;
    border-radius: 14px;

    cursor: pointer;

    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }

  &__preview:hover {
    transform: translateY(-3px);

    box-shadow:
      0 12px 24px
      rgb(0 0 0 / 0.15);
  }

  &__delete {
    position: absolute;

    top: 6px;
    right: 6px;

    width: 24px;
    height: 24px;

    border: none;
    border-radius: 50%;

    background:
      rgb(0 0 0 / 0.35);

    color: white;

    cursor: pointer;
  }
}

.favorites-enter-active,
.favorites-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.favorites-enter-from,
.favorites-leave-to {
  opacity: 0;

  transform:
    translateX(-50%)
    translateY(20px);
}
</style>
