<template>
  <div class="mx-auto home-card">
    <div class="text-center h3">
      <div class="h3 d-flex align-items-center">
        <div class="back-button" @click="$emit('prev')">
          <b-icon-arrow-left class="mt-2 h3"/>
        </div>

        <span class="ml-3">Sizga tavsiya etiladigan narx</span>
      </div>

      <div style="line-height: 2.5rem; font-size: 40px; font-weight: bold" class="mt-4">
        1 960 500 so'm

      </div>

    </div>
  </div>
</template>

<script>
export default {
name: "HomeSlide3"
}
</script>

<style scoped>

</style>
