// Enhanced Auto-loader for root-level folders
async function loadContent() {
  const loadOrder = [
    { path: 'content/day1.html' },  // First content box
    { path: 'polls/poll1.html' },   // First poll
    { path: 'content/day2.html' },  // Second content box
    { path: 'polls/poll2.html' }    // Second poll
  ];

  const main = document.getElementById('content');
  
  // Clear existing content (safety measure)
  main.innerHTML = '';

  for (const item of loadOrder) {
    try {
      const response = await fetch(item.path);
      if (!response.ok) {
        console.warn(`Failed to load: ${item.path}`);
        continue;
      }
      const html = await response.text();
      main.innerHTML += html;
    } catch (e) {
      console.error(`Error loading ${item.path}:`, e);
    }
  }
  
  // Initialize your original features
  initOriginalFeatures();
}

// Your original functions (MUST include these)
function initOriginalFeatures() {
  // 1. Menu toggle functionality
  document.getElementById("menu-toggle").addEventListener("click", function(e) {
    e.stopPropagation();
    const menu = document.getElementById("menu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  });

  // 2. Content boxes functionality
  const boxes = document.querySelectorAll(".content-box");
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  
  boxes.forEach((box) => {
    const header = box.querySelector(".content-header");
    const bookmarkBtn = box.querySelector(".bookmark-btn");
    const topic = box.dataset.topic;

    // Bookmark logic
    if (bookmarks.includes(topic)) {
      bookmarkBtn.classList.add("bookmarked");
    }

    header.addEventListener("click", () => {
      box.classList.toggle("expanded");
    });

    bookmarkBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (bookmarks.includes(topic)) {
        bookmarks.splice(bookmarks.indexOf(topic), 1);
        bookmarkBtn.classList.remove("bookmarked");
      } else {
        bookmarks.push(topic);
        bookmarkBtn.classList.add("bookmarked");
      }
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    });
  });

  // 3. Search functionality
  document.getElementById("search-input").addEventListener("input", function() {
    const value = this.value.toLowerCase();
    boxes.forEach((box) => {
      box.style.display = box.dataset.topic.toLowerCase().includes(value) 
        ? "block" 
        : "none";
    });
  });

  // 4. View bookmarks
  document.getElementById("view-bookmarks").addEventListener("click", () => {
    // [Your existing bookmark view logic]
  });
}

// Start the loader
document.addEventListener("DOMContentLoaded", loadContent);
