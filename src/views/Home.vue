<template>
  <div class="home pb-4">
    <transition-group :name="direction === 1? 'home-slide': 'home-slide-out'" mode="out-in">
      <HomeSlide1 key="1" @next="slide++" v-if="slide === 1 || isDev" class="mb-4"/>

      <HomeSlide2 key="2" v-model="form" @next="slide++" @prev="slide--" v-if="slide === 2 || isDev" class="mb-4"/>

      <HomeSlide3 key="3" @next="slide++" @prev="slide--" v-if="slide === 3 || isDev"/>
    </transition-group>
  </div>
</template>

<script>

import HomeSlide1 from '@/components/HomeSlide1'
import HomeSlide2 from '@/components/HomeSlide2'
import HomeSlide3 from '@/components/HomeSlide3'

export default {
  name: 'Home',
  components: { HomeSlide3, HomeSlide2, HomeSlide1 },

  data () {
    return {
      slide: 1,
      lastSlide: 1,
      direction: 1,
      isDev: false,

      form: null
    }
  },

  watch: {
    slide (val) {
      this.direction = val > this.lastSlide ? 1 : -1

      if (val === 1) {
        this.form = null
      }

      this.$nextTick(() => {
        this.lastSlide = val
      })
    }
  }
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
