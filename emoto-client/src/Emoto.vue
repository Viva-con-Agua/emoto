<template>
  <div id="app">    
    <el-menu
      :default-active="activeIndex"
      :router=true
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="/mood/form">Stimmungsabfrage</el-menu-item>
      <el-menu-item index="/mood/last">Letzte Stimmung</el-menu-item>
      <el-menu-item index="/mood/course">Stimmungsverlauf</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      activeIndex: 'form',
    };
  },
  methods: {
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
