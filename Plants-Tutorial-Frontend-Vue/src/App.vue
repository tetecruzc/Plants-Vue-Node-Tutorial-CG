<template>
    <Layout>
        <router-view/>
    </Layout>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Layout from './components/layout/Layout.vue'

@Component({
    components:{
        Layout
    }
})
export default class App extends Vue{

    mounted(){
    }
}
</script>

<style lang="scss">
@import '@/styles/main.scss';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
