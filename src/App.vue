<script setup>
import { reactive, ref } from 'vue'
import QrTemp from './components/QrTemp.vue'
import data from './data'

const qrData = reactive(data)
const curQr = ref(0)

const colors = ['#000000', '#254569', '#2B2A6F', '#2D65B7', '#3B75A9', '#67717C', '#838276', '#2F674C', '#148B64', '#586531', '#66383A', '#B52B2B', '#E68448', '#DC8C00', '#F9BD00']
const size = [[30, 45], [40, 60], [60, 90], [80, 120], [100, 150], [150, 225]]

const maskVisible = ref(false)

const showMask = (type, text, index) => {
  const mask = document.getElementById('mask')

  if(['title', 'subTitle'].includes(type)) {
    const needMask = document.querySelector(`[data-type=${type}-placeholder`)
    const len = Number(needMask.getAttribute('data-len'))
    if(len) {
      needMask.textContent = '一'.repeat(len)
    }
    const width = document.querySelector('svg').getBoundingClientRect().width * Number(needMask.getAttribute('data-max')) / 100
    mask.style.width = width + 'px'

    const { top, left, height } = needMask.parentNode.getBoundingClientRect()
    mask.style.top = top + 'px'
    mask.style.left = left + 'px'
    mask.style.height = height + 'px'
  } else {
    const needMasks = document.querySelectorAll(`[data-type=${type}-placeholder${qrData[curQr.value].fields.length}`)
    needMasks.forEach((needMask, i) => {
      if(i === index) {
        const len = Number(needMask.getAttribute('data-len'))
        if(len) {
          needMask.textContent = '一'.repeat(len)
        }

        const width = document.querySelector('svg').getBoundingClientRect().width * Number(needMask.getAttribute('data-max')) / 100
        mask.style.width = width + 'px'

        const { top, left, height } = needMask.parentNode.getBoundingClientRect()
        mask.style.top = top + 'px'
        mask.style.left = left + 'px'
        mask.style.height = height + 'px'
      }
    })
  }

  document.getElementById('tip').textContent = text
  maskVisible.value = true
}

const hiddenMask = () => {
  maskVisible.value = false
}
</script>

<template>
  <template v-for="(qr, i) of qrData" :key="qr.id">
    <div class="flex justify-center items-center mb-4" v-if="i === curQr">
    
      <QrTemp :qrData="qr" :id="qr.id" class="shadow-xl shadow-gray-400 mr-4"/>

      <div class="flex flex-col w-300px">
        <span class="pt-4">ID:{{ qr.id }}</span>

        <div class="flex my-4" v-if="qr.isColor">
          <span class="w-30px h-30px rounded cursor-pointer mr-4" :style="{ backgroundColor: qr.bgColor }"></span>
          <el-dropdown v-if="qr.isColor" trigger="click">
            <button class="px-6 py-2 border-1 border-gray-500 rounded active:(bg-red-100 transition)">选择颜色</button>
            <template #dropdown>
              <el-dropdown-menu class="flex flex-wrap w-170px justify-around">
                <span v-for="color of colors" :style="{ backgroundColor: color }" :class="['w-30px h-30px rounded cursor-pointer mb-1', { 'border-3 border-black': qr.bgColor === color }]" @click="qr.bgColor=color"></span>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      
        <div class="flex items-center mt-2 mb-4" v-if="qr.hasTitle">
          <span class="w-120px h-40px rounded cursor-pointer mr-4 border-2 grid place-items-center">{{ qr.width + '×' + qr.height }}</span>
          <!-- 竖版 -->
          <el-dropdown v-if="!qr.isLandscape" trigger="click">
            <button class="w-120px h-40px border-1 border-gray-500 rounded active:(bg-red-100 transition)">选择尺寸</button>
            <template #dropdown>
              <el-dropdown-menu class="flex flex-wrap w-225px justify-around">
                <span v-for="s of size" :class="['w-100px p-4 mb-2 rounded border-2 cursor-pointer', { 'active-size': qr.width === s[0] }]" @click="qr.width=s[0]; qr.height=s[1]">{{ s[0] + '×' + s[1] }}</span>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <!-- 横版 -->
          <el-dropdown v-else trigger="click">
            <button class="w-120px h-40px border-1 border-gray-500 rounded active:(bg-red-100 transition)">选择尺寸</button>
            <template #dropdown>
              <el-dropdown-menu class="flex flex-wrap w-225px justify-around">
                <span v-for="s of size" :class="['w-100px p-4 mb-2 rounded border-2 cursor-pointer', { 'active-size': qr.width === s[1] }]" @click="qr.width=s[1]; qr.height=s[0]">{{ s[1] + '×' + s[0] }}</span>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span class="grid place-items-center ml-4 rounded-full w-40px h-40px bg-blue-600 text-black text-xl font-semibold">{{ ++i }}</span>
        </div>

        <el-input v-model="qr.title" class="w-200px block" v-if="qr.hasTitle" @focus="showMask('title', '标签标题', 0)" @blur="hiddenMask"></el-input>

        <el-input v-model="qr.subTitle" class="w-200px block" v-if="qr.hasSubTitle" @focus="showMask('subTitle', '标签副标题', 0)" @blur="hiddenMask"></el-input>

        <div v-for="(_, i) of qr.fields">
          <el-input v-model="qr.fields[i]" class="w-200px" @focus="showMask('field', `标签字段${i+1}`, i)" @blur="hiddenMask"></el-input>
          <el-button @click="qr.fields.splice(i, 1)">X</el-button>
        </div>

        <div>
          <el-button @click="qr.fields.pop()" :disabled="!qr.fields.length">-</el-button>
          <el-button @click="qr.fields.push('')" :disabled="qr.fields.length === qr.fieldsCount">+</el-button>
        </div>
      </div>
    </div>
  </template>

  <div class="w-full flex justify-center mt-4 fixed bottom-40">
    <el-button type="primary" class="!mr-8" @click="curQr--" :disabled="curQr === 0">-</el-button>
    <el-button type="primary" @click="curQr++" :disabled="curQr === qrData.length - 1">+</el-button>
  </div>

  <div id="mask" v-show="maskVisible" class="fixed border-4 border-yellow-300">
    <div id="tip" class="p-1 absolute top-0 right-0 transform -translate-y-12/11 translate-x-4px bg-yellow-300 text-black font-semibold">12</div>
  </div>
</template>

<style>
.el-button {
  margin: 0 !important;
}

.active-size {
  border-color: #0B58D2;
  position: relative;
  overflow: hidden;
}

.active-size::after {
  content: 'L';
  position: absolute;
  bottom: 0;
  right: 0;
  color: white;
  font-size: 1rem;
  transform: rotateY(180deg) rotate(-45deg) translateX(3px) translateY(5px);
}

.active-size::before {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 30px;
  height: 60px;
  background-color: #0B58D2;
  transform-origin: left bottom;
  transform: rotate(45deg);
}
</style>