function toggleCollapse(header) {
  const content = header.nextElementSibling.nextElementSibling; // skip button then get content
  if (content.style.maxHeight && content.style.maxHeight !== '0px') {
    content.style.maxHeight = '0px';
  } else {
    content.style.maxHeight = content.scrollHeight + 'px';
  }
}
