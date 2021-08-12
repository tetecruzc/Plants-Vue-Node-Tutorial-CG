<template>
    <div>
        <Header />  
        <transition name="fade">
            <slot></slot>
        </transition>
        <!-- <Footer/> -->
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Header from './Header.vue';
import Footer from './Footer.vue';

@Component({
    components:{
        Footer,
        Header
    }
})
export default class Layout extends Vue{


}
</script>

<style>

</style>