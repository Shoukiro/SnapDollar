// ===== Auto-Loader System =====  
async function loadContent() {  
  const loadOrder = [  
    { path: 'content/day1.html' },  // First content box  
    { path: 'polls/poll1.html' },   // First poll  
    { path: 'content/day2.html' },  // Second content box  
    { path: 'polls/poll2.html' }    // Second poll  
  ];  
  
  const main = document.getElementById('content');  
    
  // Clear container and hide during load  
  main.innerHTML = '';  
  main.style.opacity = 0;  
  
  // Load all content in sequence  
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
    
  // Initialize all interactive features  
  initOriginalFeatures();  
    
  // Smooth fade-in when ready  
  setTimeout(() => {  
    main.style.opacity = 1;  
  }, 50);  
}  
  
// ===== Original Functionality =====  
function initOriginalFeatures() {  
  // 1. Menu Toggle  
  document.getElementById("menu-toggle").addEventListener("click", function(e) {  
    e.stopPropagation();  
    const menu = document.getElementById("menu");  
    menu.style.display = menu.style.display === "block" ? "none" : "block";  
  });  
  
  // Close menu when clicking outside  
  document.addEventListener("click", function() {  
    document.getElementById("menu").style.display = "none";  
  });  
  
  // 2. Content Boxes Functionality  
  const boxes = document.querySelectorAll(".content-box");  
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];  
  const bookmarkBtnMap = new Map();  
  
  boxes.forEach((box) => {  
    const header = box.querySelector(".content-header");  
    const bookmarkBtn = box.querySelector(".bookmark-btn");  
    const topic = box.dataset.topic;  
  
    // Initialize bookmarks  
    bookmarkBtnMap.set(topic, box.outerHTML);  
    if (bookmarks.includes(topic)) {  
      bookmarkBtn.classList.add("bookmarked");  
    }  
    bookmarkBtn.innerHTML = bookmarks.includes(topic) ? "★" : "☆"; // <=== Modified line
  
    // Toggle expansion  
    header.addEventListener("click", () => {  
      box.classList.toggle("expanded");  
    });  
  
    // Bookmark toggle  
    bookmarkBtn.addEventListener("click", (e) => {  
      e.stopPropagation();  
      const index = bookmarks.indexOf(topic);  
      if (index > -1) {  
        bookmarks.splice(index, 1);  
        bookmarkBtn.classList.remove("bookmarked");  
        bookmarkBtn.innerHTML = "☆";  
      } else {  
        bookmarks.push(topic);  
        bookmarkBtn.classList.add("bookmarked");  
        bookmarkBtn.innerHTML = "★";  
      }  
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));  
    });  
  });  
  
  // 3. Search Functionality  
  document.getElementById("search-input").addEventListener("input", function() {  
    const value = this.value.toLowerCase();  
    boxes.forEach((box) => {  
      box.style.display = box.dataset.topic.toLowerCase().includes(value)   
        ? "block"   
        : "none";  
    });  
  });  
  
  // 4. View Bookmarks  
let showingBookmarks = false;
const viewBtn = document.getElementById("view-bookmarks");

viewBtn.addEventListener("click", async () => {
  const main = document.getElementById("content");

  if (showingBookmarks) {
    showingBookmarks = false;
    viewBtn.classList.remove("bookmarked");
    viewBtn.innerHTML = "☆";

    // Clear old content completely and reload fresh
    await loadContent(); // This resets everything
  } else {
    showingBookmarks = true;
    viewBtn.classList.add("bookmarked");
    viewBtn.innerHTML = "★";

    // Clear content and show only bookmarks
    main.innerHTML = "";
    bookmarks.forEach(topic => {
      main.innerHTML += bookmarkBtnMap.get(topic) || "";
    });

    // Reinitialize content box behavior ONLY (without duplicating listeners)
    const boxes = document.querySelectorAll(".content-box");
    boxes.forEach((box) => {
      const header = box.querySelector(".content-header");
      const bookmarkBtn = box.querySelector(".bookmark-btn");
      const topic = box.dataset.topic;

      // Toggle expansion
      header.addEventListener("click", () => {
        box.classList.toggle("expanded");
      });

      // Bookmark toggle
      bookmarkBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const index = bookmarks.indexOf(topic);
        if (index > -1) {
          bookmarks.splice(index, 1);
          bookmarkBtn.classList.remove("bookmarked");
          bookmarkBtn.innerHTML = "☆";
        } else {
          bookmarks.push(topic);
          bookmarkBtn.classList.add("bookmarked");
          bookmarkBtn.innerHTML = "★";
        }
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
      });
    });
  }
});  
}  
  
// ===== Start Application =====  
document.addEventListener("DOMContentLoaded", loadContent);
