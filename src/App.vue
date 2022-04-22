<template>
  <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
          <component :is="Component" />
      </transition> 
  </router-view>
</template>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 500ms ease-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>