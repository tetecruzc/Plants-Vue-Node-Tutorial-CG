<template>
    <svg :class="styles">
        <use v-if="externalIcon" :xlink:href="require(`@/assets/svg/${externalIcon}`) + '#' + name"></use>
        <use v-else :xlink:href="require('@/assets/svg/symbols.svg') + '#' + name"></use>
    </svg>
</template>

<script lang="ts">
import {Component,Prop} from 'vue-property-decorator';
import Vue from 'vue';
@Component({})
export default class SvgIcon extends Vue {
    @Prop() styles?: String; 
    @Prop() name!: String;
    @Prop() externalIcon?: String;
}
</script>

<style scoped>
    
</style>