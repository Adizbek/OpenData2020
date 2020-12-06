<template>
  <div class="mx-auto home-card">
    <div class="text-center h3">
      <div class="h3 d-flex align-items-center">
        <div class="back-button" @click="$emit('prev')">
          <b-icon-arrow-left class="mt-2 h3"/>
        </div>

        <span class="ml-3">Sizga tavsiya etiladigan narx</span>
      </div>

      <div class="text-left mt-4" style="font-size: 18px; line-height: 28px">
        <div class="row">
          <div class="col-6">
            <div style="font-size: 28px; line-height: 50px">
              <b>${{ toPrice(info.prices.avg_price_usd) }}</b>
            </div>

            <div>Min: <b>${{ toPrice(info.prices.min_price_usd) }}</b></div>
            <div>Maks: <b>${{ toPrice(info.prices.max_price_usd) }}</b></div>
          </div>

          <div class="col-6">
            <div style="font-size: 28px; line-height: 50px">
              <b>{{ toPrice(info.prices.avg_price_uzs) }} so'm</b>
            </div>

            <div>Min: <b>{{ toPrice(info.prices.min_price_uzs) || '0' }} so'm</b></div>
            <div>Maks: <b>{{ toPrice(info.prices.max_price_uzs) }} so'm</b></div>
          </div>
        </div>

        <div class="mt-4">Narxlar <b>{{ info.similar_ads_total }}</b> ta e'lon asosida taklif qilindi</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeSlide3',
  props: {
    info: {}
  },

  methods: {
    toPrice (price) {
      if (price) {
        return new Intl.NumberFormat('ru-RU').format(price)
      } else {
        ''
      }
    }
  }
}
</script>

<style scoped>

</style>
