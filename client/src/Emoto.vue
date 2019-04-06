<template>
  <div id="app">
     <el-row>
        <el-col :span="18">
            <p class="title"><a href="/emoto">EMOTO</a></p>
            <p class="subtitle"><a href="/emoto">STIMMUNGSBAROMETER</a></p>
        </el-col>
        <el-col :span="6">
          <img src="/emoto/img/logo.png" class="logo" alt="Logo VcA" />
        </el-col>
      </el-row>    
    <el-menu
      v-if='$route.name !== "Landing Page"'
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
      <el-menu-item index="/settings">Infos &amp; Einstellungen</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import store from './store'
export default {
  name: 'app',
  data() {
    return {
      activeIndex: '/mood/form',
      currentView: ''
    };
  },
  created(){
    this.getIdentity()
  },
  updated(){
    const currentPath = this.$route.path
    this.activeIndex = currentPath
  },
  methods: {
    getIdentity: function(){
      return store.dispatch('user/init');
    }
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

img.logo{
  width:100%;
}

p.title{
  font-size: 100px;
  font-weight: bold;
  margin: 0px;
  text-align:left;
}

p.subtitle{
  color: darkgray;
  font-size: 45px;
  margin: 0px;
  text-align:left;
}

p.title a{
  color: #2c3e50;
  text-decoration: none;
}

p.subtitle a{
  text-decoration: none;
  color: darkgray;
}
</style>
