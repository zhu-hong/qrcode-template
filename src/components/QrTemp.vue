<script setup>
import { getCurrentInstance, nextTick, watch } from 'vue'
import Qr from 'qrcode.vue'
import { encodeSvg, renderText } from '../utils'

const props = defineProps({
  qrData: Object,
})

const ins = getCurrentInstance()

// nextTick(() => {
//   const qrSvg = document.getElementById(`${props.qrData.id}svg`)
//   const qr = ins.refs.qrWrap
//   qrSvg.setAttribute('width', qr.querySelector('[data-type=qr]').getAttribute('width'))
//   qrSvg.setAttribute('height', qr.querySelector('[data-type=qr]').getAttribute('height'))
//   qr.querySelector('[data-type=qr]').parentNode.replaceChild(qrSvg, qr.querySelector('[data-type=qr]'))
//   qrSvg.removeAttribute('class')
// })

watch(
  () => props.qrData,
  async () => {
    await nextTick()
    
    const qr = ins.refs.qrWrap

    const qrSvg = document.getElementById(`${props.qrData.id}svg`)
    qr.querySelector('[data-type=qr]').setAttribute('xlink:href', 'data:image/svg+xml;utf8,' + encodeSvg(qrSvg.outerHTML))
    
    // const uri = new XMLSerializer().serializeToString(document.getElementById(`${props.qrData.id}svg`))
    // qr.querySelector('[data-type=qr]').setAttribute('xlink:href', 'data:image/svg+xml;base64,' + btoa(uri))

    const wrapperWidth = qr.getBoundingClientRect().width

    if(props.qrData.isColor) {
      qr.querySelectorAll('[data-type=bg]').forEach((rect) => {
        rect.setAttribute('fill', props.qrData.bgColor)
      })
    }

    if(props.qrData.hasLogo) {
      qr.querySelector('[data-type=logo]').setAttribute('xlink:href', props.qrData.logo)
    }

    if(props.qrData.hasTitle) {
      renderText(qr.querySelector('[data-type=title]'), props.qrData.title, wrapperWidth)
    }

    if(props.qrData.hasSubTitle) {
      renderText(qr.querySelector('[data-type=subTitle]'), props.qrData.subTitle, wrapperWidth)
    }

    qr.querySelectorAll('[data-type=field]').forEach((tspan) => {
      tspan.textContent = ''
    })
    qr.querySelectorAll(`[data-count='${props.qrData.fields.length}']`).forEach((tspan, i) => {
      renderText(tspan, props.qrData.fields[i], wrapperWidth)
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
    :style="{ width: qrData.width * 3 + 'px', height: qrData.height * 3 + 'px' }"
    v-bind="$attrs"
  ></div>
  <Qr :value="qrData.id" class="hidden" :id="qrData.id + 'svg'" render-as="svg" />
</template>