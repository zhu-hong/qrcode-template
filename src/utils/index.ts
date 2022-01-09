export const renderText = (node: HTMLElement, text: string) => {
  const maxLen = node.getAttribute('data-len')
  const len = text.slice(0, Number(maxLen)).length
  
  const isCenter = node.getAttribute('data-center')
  if(isCenter) {
    const basic = node.getAttribute('data-basic')
    const span = node.getAttribute('data-span')

    const x = Number(basic) - Number(span) * len

    node.setAttribute('x', String(x))
  }
  
  node.textContent = text.slice(0, len)
}