<template>
  <div class="home pb-4">
    <transition-group :name="direction === 1? 'home-slide': 'home-slide-out'" mode="out-in">
      <HomeSlide1 key="1" @next="slide++" v-if="slide === 1 || isDev" class="mb-4"/>

      <HomeSlide2 key="2" v-model="form" @priceInfo="onPriceInfo" @next="slide++" @prev="slide--"
                  v-if="slide === 2 || isDev" class="mb-4"/>
    </transition-group>
  </div>
</template>

<script>

import HomeSlide1 from '@/components/HomeSlide1'
import HomeSlide2 from '@/components/HomeSlide2'

export default {
  name: 'Home',
  components: { HomeSlide2, HomeSlide1 },

  mounted () {
    this.checkSimilar()
  },

  data () {
    return {
      slide: 1,
      lastSlide: 1,
      direction: 1,
      isDev: false,

      form: null,

      prices: {}
    }
  },

  chimera: {
    similar: {
      auto: false,
      url: '/vehicle/buyer/recommendations_by_url/'
    }
  },

  methods: {
    onPriceInfo (prices) {
      this.prices = prices
      this.slide++
    },

    checkSimilar () {
      if (this.$route.query.similar) {
        this.$chimera.similar.send({
          url: this.$route.query.similar
        }).then(({data}) => {
          if(data.current_ad) {
            this.form = {
              brand_id: data.current_ad.brand,
              model_id: data.current_ad.model,
              transmission_type: data.current_ad.transmission_type,
              manufactured_year: data.current_ad.manufactured_year,
              driven_km: data.current_ad.driven_km,
              condition: data.current_ad.condition,
            }

            this.slide++;
          }
          console.log(data)
        })
      }
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
  width: 600px;
  max-width: 90%;
}

.home-card-wide {
  border-radius: 4px;
  padding: 2rem;
  background: white;
  width: 1200px;
  max-width: 90%;
}
</style>
