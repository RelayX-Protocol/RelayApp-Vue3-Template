<template>
  <!-- Sidebar menu container. Adds 'active' class when open -->
  <div :class="['menu-sidebar', isOpen ? 'active' : '']">
    <!-- Header section with logos and safe area top padding -->
    <div class="api-header display-flex flex-zbetween mobile-menu-header" :style="style">
      <div class="image-box">
        <img class="logo logo1" :src="logo" />
        <img class="logoTitle" :src="logoTitle" />
      </div>
    </div>

    <!-- Render list of menu items -->
    <ul>
      <li
        v-for="(item, index) in menuList"
        :key="index"
        :class="['pointer', curIndex === index ? 'active' : '']"
        @click="pageJump(index, item)"
      >
        {{ item.name }}
      </li>
    </ul>

    <!-- Bottom close button with safe area bottom padding -->
    <div class="menu-close" :style="menuBottomStyle">
      <div class="display-flex flex-cCenter flex-zCenter pointer" @click="toggleMenu">
        <img :src="cancelIcon" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import logo from '../assets/logo.png'
import logoTitle from '../assets/logo_title.png'
import cancelIcon from '../assets/cancel.png'

// Declare custom event emitter
import { defineEmits } from 'vue'
const emit = defineEmits(['toggleMenu'])

// Define structure for a single menu item
interface MenuItem {
  name: string
  list: { label: string; value: string; type: string; element?: string }[]
}

// Define component props with types
const props = defineProps<{
  menuList: MenuItem[]                    // List of menu items
  changeNav: (item: MenuItem) => void     // Function to change the selected navigation
  isOpen: boolean                         // Whether the menu is open
  toggleMenu?: (param?: boolean) => void  // Optional: parent toggle menu function
}>()

// Track the currently selected menu index
const curIndex = ref(0)

/**
 * Handles clicking a menu item:
 * - Update selected index
 * - Call parent's changeNav function
 */
function pageJump(index: number, item: MenuItem) {
  curIndex.value = index
  props.changeNav(item)
}

/**
 * Emits a toggleMenu event to the parent component
 */
const toggleMenu = ()=>{
   emit('toggleMenu')
}

/**
 * Computed style for header with top safe area padding
 */

const style = computed(() => ({
  background: '#ffffff',
  width: '100%',
  paddingTop: (window.safeAreaTop || 0) + 20 + 'px',
}))

/**
 * Computed style for bottom section with bottom safe area padding
 */
const menuBottomStyle = computed(() => ({
  paddingBottom: (window.safeAreaBottom || 0) + 18 + 'px',
}))
</script>

<style scoped>

</style>
