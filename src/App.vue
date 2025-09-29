<template>
  <div>
   <router-view v-if="isShow"/>
  </div>

</template>
<script setup lang="ts">
   import {ref} from "vue"
   const isShow = ref(false)

   window.messageHandler.getSafeAreaInsets().then((res:any)=>{
      if(res.code==200){
          window.safeAreaBottom = res.result.safeAreaBottom
          window.safeAreaTop = res.result.safeAreaTop
          isShow.value = true
      }else{
         window.safeAreaBottom = 10
         window.safeAreaTop = 10
         isShow.value = true
      }
   })


</script>


