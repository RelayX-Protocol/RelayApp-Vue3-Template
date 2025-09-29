<template>
  <div class="page-content" style="padding-bottom:60px;">
    <div v-if="isOpen" :class="['over', isOpen ? 'active' : '']" @click="() => (isOpen = false)"></div>
    <APIHeader @toggleMenu="toggleMenu" />
    <div class="page-main">
      <APIMenu :menuList="menuList" :changeNav="changeNav" :isOpen="isOpen" @toggleMenu="toggleMenu" />
      <div class="form-box">
        
        <div className="d-title" :style="{ marginTop: '0px' }" v-if="parameter.list.length>0">payload</div>

        <div v-for="(item, index) in parameter.list" :key="index" class="form-col">
          <div class="d-label">
            <span v-if="item.required">*</span>{{ item.label }}
          </div>
          <div v-if="item.element === 'select'" class="select-box">
            <a-select
              v-model:value="inputs[index]"
              :options="item.options || []"
              class="common-select"
              style="width: 100%"
            />
          </div>
          <div v-else class="input-box">
            <textarea
              class="display-flex"
              v-model="inputs[index]"
              :rows="item.label === 'content' || item.label === 'serviceKey' || item.label === 'image' || item.label === 'video' ? 4 : 1"
            />
          </div>
        </div>


        <div v-if="parameter.signList && parameter.signList.length>0">
          <div class="d-title">sign</div>
    
          <div 
            class="form-col" 
            v-for="(item, index) in parameter.signList" 
            :key="index"
          >
            <div class="d-label">
              <span v-if="item.required">*</span>{{ item.label }}
            </div>

            <div class="input-box">
              <textarea
                class="display-flex"
                :value="item.label === 'content' ? signContent : item.label === 'signature' ? signSignature : ''"
                @input="(e) => handleInputSign(e, item)"
                :rows="item.label === 'content' || item.label === 'signature' ? 3 : 1"
              ></textarea>
            </div>
          </div>
        </div>

        <div class="btn-box">
          <button class="btn-default" @click="handleSubmit">Confirm</button>
        </div>

        <div v-if="result.length > 0" class="resultBox">
          <div class="d-label api-label1">Return</div>
          <div class="d-result">
            <pre v-html="result" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Select as ASelect } from 'ant-design-vue'
import APIHeader from '../components/APIHeader.vue'
import APIMenu from '../components/APIMenu.vue'

import menuList from "../constant/menu.ts"

const _signContent = import.meta.env.VITE_API_CONTENT
const _signature = import.meta.env.VITE_API_SIGNATURE
const parameter = ref(menuList[0])
const result = ref('')
const isOpen = ref(false)
const inputs = ref<string[]>([...parameter.value.list.map((item) => item.value)])

const signContent = ref(_signContent)
const signSignature = ref(_signature)

const handleInputSign = (e:Event,item:any) =>{
  const target = e.target as HTMLInputElement | HTMLTextAreaElement | null;

  if (!target) return; // security check
  if(item.label==="signature"){
    signSignature.value = target.value
  }else if(item.label==="content"){
    signContent.value = target.value
  }
  
}

/**
 * Handles switching the left-side API menu
 */
function changeNav(item: any) {
  parameter.value = item
  inputs.value = item.list.map((i: any) => i.value)
  isOpen.value = false
  result.value = ''
}

/**
 * Toggle the menu open/closed state
 */
function toggleMenu() {
  isOpen.value = !isOpen.value
}



/**
 * Handle form submission — build the param object and call `sendMessageToParent`
 */
async function handleSubmit() {
  const param: { [key: string]: string | number | object | boolean } = {}
  for (let i = 0; i < parameter.value.list.length; i++) {
    const temp = parameter.value.list[i]
    if (inputs.value[i] !== '') {
      if (parameter.value.name === 'connectCocoPay') {
        // Special handling for connectCocoPay — split input by comma
        param[temp.label] = inputs.value[i].split(",")
        // Special handling for sendServiceMessage — parse JSON if content
      } else if (parameter.value.name === 'sendServiceMessage') {
        if (temp.label === 'content') {
          try {
            param[temp.label] = JSON.parse(inputs.value[i])
          } catch {
            param[temp.label] = inputs.value[i]
          }
        } else {
          param[temp.label] = inputs.value[i]
        }
      } else if(parameter.value.name==="openURL"){
              if(temp.label==="useSystemOpen"){
                   if(inputs.value[i]!==""){
                     if(inputs.value[i] === "true" || inputs.value[i] === "false") {
                        param[temp.label] = inputs.value[i] === "true"
                     }else{
                        param[temp.label]  = inputs.value[i]
                     }
                  }
                 
              }else{
                 param[temp.label] = inputs.value[i]
              }
          }else if(parameter.value.name==="getAccount"){
            param[temp.label] = inputs.value[i].toString()
          }
      
      else {
        // General handling
        param[temp.label] = temp.type === 'Int' ? Number(inputs.value[i]) : inputs.value[i]
      }
    }
  }
  
  // Send the message using the window.
  const method = parameter.value.name
  const sign ={
      content:signContent.value,
      signature:signSignature.value
  }
    if(method==="getLanguage" || method==="getSafeAreaInsets" || method==="scanQRCode" || method==="getExtendedData"){

       const _result = await window.messageHandler[method]()
       result.value = formatJson(_result)
   
    }else if(method==="checkServiceStatus"){
      const _result = await window.messageHandler[method](sign)
       result.value = formatJson(_result)
    }else if(method==="registerService" || method==="sendServiceMessage"){
       const _result = await window.messageHandler[method](param,sign)
       result.value = formatJson(_result)
    }else{
       const _result = await window.messageHandler[method](param)
       result.value = formatJson(_result)
    }

}

/**
 * Format response JSON into a nicely indented string with <br> for display
 */
function formatJson(obj: any) {
  return JSON.stringify(obj, null, 2).replace(/"([^"\n]+)":/g, '$1:').replace(/\n/g, '<br/>')
}
</script>

<style scoped>
/*Customize styles as needed*/
</style>
