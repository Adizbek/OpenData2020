<template>
  <div class="home">
    <HomeSlide1 class="mb-4"/>

    <HomeSlide2/>
  </div>
</template>

<script>

import HomeSlide1 from '@/components/HomeSlide1'
import HomeSlide2 from '@/components/HomeSlide2'

export default {
  name: 'Home',
  components: { HomeSlide2, HomeSlide1 },
}
</script>

<style scoped lang="scss">
@import "src/scss/vars";

.home {
  min-height: 100vh;
  padding-top: 5vh;
  background: #e1ecf9;
}

.back-button {
  width: 48px;
  height: 48px;
  text-align: center;
  cursor: pointer;
  transition: .2s;
  border-radius: 4px;

  &:hover {
    border-radius: 50%;
    background: lighten($primary, 35%);
  }
}

.home-card {
  border-radius: 4px;
  padding: 2rem;
  background: white;
  width: 500px;
  max-width: 90%;
}
</style>
