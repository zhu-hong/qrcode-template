export const renderText = (node: HTMLElement, text: string, wrapperWidth: number) => {
  node.textContent = text

  const max = Number(node.getAttribute('data-max'))
  let selfWidth = node.getBoundingClientRect().width

  if ((selfWidth / wrapperWidth) * 100 > max) {
    let length = text.length

    while ((selfWidth / wrapperWidth) * 100 > max) {
      node.textContent = text.slice(0, --length)
      selfWidth = node.getBoundingClientRect().width
    }
    
    node.textContent += '...'
  }
}