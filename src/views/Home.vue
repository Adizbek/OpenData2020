<template>
  <div class="home">
    <div class="mx-auto home-card">
      <div class="text-center h3">
        Narxni baholay olmayapsizmi? <br> Unda biz sizga yordam beramiz!

        <br>

        <b-button size="lg" variant="outline-primary" class="mt-5">
          <img src="/imgs/best-price.svg" width="32px"> Aniqlash
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
}
</script>

<style scoped>
.home {
  height: 100vh;
  padding-top: 4rem;
  background: #e1ecf9;
}

.home-card {
  padding: 2rem;
  background: white;
  width: 600px;
}
</style>
