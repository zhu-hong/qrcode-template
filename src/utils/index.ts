export const renderText = (node: HTMLElement, text: string) => {
  // let maxLen = Number(node.getAttribute('data-len'))
  // let maxLenFreeze = Number(node.getAttribute('data-len'))
  // let len = text.slice(0, 50).length

  // let trueLen = 0
  // for(let i = 0; i < len; i++) {
  //   if(maxLen >= 1) {
  //     if(text.slice(0, len).charCodeAt(i) > 255 || (text.slice(0, len).charCodeAt(i) >= 65 && text.slice(0, len).charCodeAt(i) <= 90 && text.slice(0, len).charCodeAt(i) !== 73)) {
  //       maxLen-=1
  //     } else {
  //       maxLen-=0.5
  //     }
  //     trueLen+=1
  //   }
  // }

  // let mergeLen = 0
  // for(let i = 0; i < trueLen; i++) {
  //   if(text.slice(0, trueLen).charCodeAt(i) > 255 || (text.slice(0, len).charCodeAt(i) >= 65 && text.slice(0, len).charCodeAt(i) <= 90 && text.slice(0, len).charCodeAt(i) !== 73)) {
  //     mergeLen+=1
  //   } else {
  //     mergeLen+=0.5
  //   }
  // }
  
  // const isCenter = node.getAttribute('data-center')
  // if(isCenter) {
  //   const basic = Number(node.getAttribute('data-basic'))
  //   const span = Number(node.getAttribute('data-span'))
    
  //   // 中文字符数
  //   let CHNCount = 0
  //   for(let i = 0; i < trueLen; i++) {
  //     if(text.slice(0, trueLen).charCodeAt(i) > 255 || (text.slice(0, len).charCodeAt(i) >= 65 && text.slice(0, len).charCodeAt(i) <= 90 && text.slice(0, len).charCodeAt(i) !== 73)) {
  //       CHNCount++
  //     }
  //   }

  //   const x = basic - span * CHNCount - span / 2 * (trueLen - CHNCount)

  //   node.setAttribute('x', String(x))
  // }
  
  // if(mergeLen >= maxLenFreeze - 0.5 || len === 50) {
  //   node.textContent = text.slice(0, trueLen) + '...'
  //   return
  // }
  node.textContent = text
}