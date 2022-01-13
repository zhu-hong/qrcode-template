<script setup>
import { reactive } from 'vue'
import QrTemp from './components/QrTemp.vue'
import data from './data'

const qrData = reactive(data)

const colors = ['#000000', '#254569', '#2B2A6F', '#2D65B7', '#3B75A9', '#67717C', '#838276', '#2F674C', '#148B64', '#586531', '#66383A', '#B52B2B', '#E68448', '#DC8C00', '#F9BD00']
const size = [[30, 45], [40, 60], [60, 90], [80, 120], [100, 150], [150, 225]]

const loadLogo = (i ,e) => {
  const file = e.target.files[0]

  const fr = new FileReader()
  fr.readAsDataURL(file)

  fr.addEventListener('load', (e) => {
    qrData[i].logo = e.target.result
  })
}
</script>

<template>
  <div v-for="(qr, i) of qrData" :key="qr.id" class="flex flex-col items-center mb-4">
    <QrTemp :qrData="qr" :id="qr.id" class="shadow-2xl shadow-dark-400" />
    
    <div class="flex my-4">
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
    
    <div class="flex my-4">
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
    </div>

    <el-input v-model="qr.title" class="w-200px block"></el-input>
    <el-input v-model="qr.subTitle" class="w-200px block" v-if="qr.hasSubTitle"></el-input>
    <div v-for="(_, i) of qr.fields">
      <el-input v-model="qr.fields[i]" class="w-200px"></el-input>
      <el-button @click="qr.fields.splice(i, 1)">X</el-button>
    </div>
    <div>
      <el-button @click="qr.fields.pop()" :disabled="!qr.fields.length">-</el-button>
      <el-button @click="qr.fields.push('')" :disabled="qr.fields.length === qr.fieldsCount">+</el-button>
    </div>
    <input type="file" class="block" @change="loadLogo(i, $event)" v-if="qr.hasLogo">
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