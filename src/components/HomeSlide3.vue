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


      <div class="mt-5">
        <line-chart
            :chartdata="chartKmValues"
            :options="chartKmOptions"/>
      </div>

      <div class="mt-5">
        <line-chart
            :chartdata="chartYearValues"
            :options="chartYearOptions"/>
      </div>
    </div>
  </div>
</template>

<script>

import LineChart from '@/components/LineChart'
export default {
  name: 'HomeSlide3',
  components: { LineChart },
  props: {
    info: {}
  },


  data () {
    let labelsKm = this.info.stats_by_driven_km.map(x => x.driven_km + ' km')
    let labelsYear = this.info.stats_by_manufactured_year.map(x => x.manufactured_year + ' yil')

    return {
      chartKmOptions: {
        responsive: true,
        maintainAspectRatio: false
      },

      chartYearOptions: {
        responsive: true,
        maintainAspectRatio: false
      },

      chartKmValues: {
        labels: labelsKm,
        datasets: [{
          label: 'Narx',
          backgroundColor: '#8298e3',
          data: this.info.stats_by_driven_km.map(x => x.avg_price_usd)
        }]
      },

      chartYearValues: {
        labels: labelsYear,
        datasets: [{
          label: 'Narx',
          backgroundColor: '#9ce382',
          data: this.info.stats_by_manufactured_year.map(x => x.avg_price_usd)
        }]
      },
    }
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
