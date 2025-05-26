// Auto-loader (add this to your existing script.js)
async function loadContent() {
  const loadOrder = [
    { type: 'content', file: 'day1.html' },
    { type: 'poll', file: 'poll1.html' },
    { type: 'content', file: 'day2.html' },
    { type: 'poll', file: 'poll2.html' }
  ];

  const main = document.getElementById('content');
  
  for (const item of loadOrder) {
    try {
      const response = await fetch(`/${item.type}s/${item.file}`);
      if (!response.ok) continue;
      const html = await response.text();
      main.innerHTML += html;
    } catch (e) {
      console.log(`Skipping ${item.file}:`, e.message);
    }
  }
  
  // Initialize your original functionality
  initOriginalFeatures();
}

// Your original functions (copy EXACTLY from your current script.js)
function initOriginalFeatures() {
  // [Paste all your existing event listeners and logic]
}

// Start loader after DOM loads
document.addEventListener('DOMContentLoaded', loadContent);
