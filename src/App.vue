<template>
  <div id="app">
    <header>
      <p>BROCCOLI & CO.</p>
    </header>
    <section>
      <landing />
    </section>
    <footer>
      Made with heart in Melbourne.<br/>
      @ 2020 Broccoli & Co. All rights reserved.
    </footer>
  </div>
</template>
<script>
import Landing from '@/view/Landing'

export default {
  components: { Landing }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
header {
  position: fixed;
  width: 100%;
  top: 0;
  border-bottom: 1PX solid #000;
  p {
    width: 80%;
    text-align: left;
    margin: 0 auto;
    line-height: 90px;
  }
}
footer {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: fixed;
  bottom: 0;
  border-top: 1PX solid #000;
  line-height: 1.3;
  height: 110px;
}
</style>
