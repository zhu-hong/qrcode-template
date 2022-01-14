<script setup>
import { getCurrentInstance, nextTick, watch } from 'vue'
import Qr from 'qrcode.vue'
import { renderText } from '../utils'

const props = defineProps({
  qrData: Object,
})

const ins = getCurrentInstance()

nextTick(() => {
  const qrSvg = document.getElementById(`${props.qrData.id}svg`)
  const qr = ins.refs.qrWrap
  qrSvg.setAttribute('width', qr.querySelector('[data-type=qr]').getAttribute('width'))
  qrSvg.setAttribute('height', qr.querySelector('[data-type=qr]').getAttribute('height'))
  // qrSvg.children[1].setAttribute('transform', qr.querySelector('[data-type=qr]').getAttribute('transform'))
  qrSvg.removeAttribute('class')
  qr.querySelector('[data-type=qr]').parentNode.replaceChild(qrSvg, qr.querySelector('[data-type=qr]'))
  // document.getElementById(`${props.qrData.id}svg`).remove()
})

watch(
  () => props.qrData,
  () => {
    nextTick(() => {
      const qr = ins.refs.qrWrap

      if(props.qrData.hasTitle) {
        renderText(qr.querySelector('[data-type=title]'), props.qrData.title)
      }

      if(props.qrData.hasSubTitle) {
        renderText(qr.querySelector('[data-type=subTitle]'), props.qrData.subTitle)
      }

      if(props.qrData.hasLogo) {
        qr.querySelector('[data-type=logo]').setAttribute('xlink:href', props.qrData.logo)
      }

      if(props.qrData.isColor) {
        qr.querySelectorAll('[data-type=bg]').forEach((rect) => {
          rect.setAttribute('fill', props.qrData.bgColor)
        })
      }

      qr.querySelectorAll('[data-type=field]').forEach((tspan) => {
        tspan.textContent = ''
      })
      qr.querySelectorAll(`[data-count='${props.qrData.fields.length}']`).forEach((tspan, i) => {
        renderText(tspan, props.qrData.fields[i])
      })
    })
  },
  {
    immediate: true,
    deep: true,
  },
)
</script>

<template>
  <div
    ref="qrWrap"
    v-html="qrData.raw"
    :style="{ width: qrData.width + 'mm', height: qrData.height + 'mm' }"
    v-bind="$attrs"
  ></div>
  <Qr :value="qrData.id" class="hidden" :id="qrData.id + 'svg'" render-as="svg" />
</template>