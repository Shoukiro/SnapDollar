function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
// ===== Auto-Loader System =====  
async function loadContent() {
  const contentPaths = [
    { path: 'content/day1.html' },
    { path: 'content/day2.html' },
    { path: 'content/day3.html' }
  ];

  const pollPaths = [
    { path: 'polls/poll1.html' },
    { path: 'polls/poll2.html' }
  ];

  // Shuffle both arrays
  shuffleArray(contentPaths);
  shuffleArray(pollPaths);

  // Alternate content → poll → content → poll → ...
  const loadOrder = [];
  const maxLen = Math.max(contentPaths.length, pollPaths.length);
  for (let i = 0; i < maxLen; i++) {
    if (i < contentPaths.length) loadOrder.push(contentPaths[i]);
    if (i < pollPaths.length) loadOrder.push(pollPaths[i]);
  }

  const main = document.getElementById('content');
  main.innerHTML = '';
  main.style.opacity = 0;

  for (const item of loadOrder) {
    try {
      const response = await fetch(item.path);
      if (!response.ok) continue;
      const html = await response.text();
      main.innerHTML += html;
    } catch (e) {
      console.error(`Error loading ${item.path}:`, e);
    }
  }

  initOriginalFeatures();

  setTimeout(() => {
    main.style.opacity = 1;
  }, 50);
}  

// ===== Bookmark Globals =====
let showingBookmarks = false;
let bookmarkBtnMap = new Map();
const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

// ===== Original Functionality =====  
function initOriginalFeatures() {  
  // Menu toggle
  document.getElementById("menu-toggle").addEventListener("click", function(e) {  
    e.stopPropagation();  
    const menu = document.getElementById("menu");  
    menu.style.display = menu.style.display === "block" ? "none" : "block";  
  });  
  document.addEventListener("click", function() {  
    document.getElementById("menu").style.display = "none";  
  });  

  // Content box behavior
  const boxes = document.querySelectorAll(".content-box");  
  bookmarkBtnMap.clear();  
  
  boxes.forEach((box) => {  
    const bookmarkBtn = box.querySelector(".bookmark-btn");  
    const topic = box.dataset.topic;  
  
    bookmarkBtnMap.set(topic, box.outerHTML);  
    bookmarkBtn.innerHTML = bookmarks.includes(topic) ? "★" : "☆";  
  
    box.addEventListener("click", (e) => {
      // Prevent toggle if clicking on the bookmark button
      if (e.target.classList.contains("bookmark-btn")) return;
      box.classList.toggle("expanded");
    });

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

  // Search
  document.getElementById("search-input").addEventListener("input", function() {  
    const value = this.value.toLowerCase();  
    boxes.forEach((box) => {  
      box.style.display = box.dataset.topic.toLowerCase().includes(value) ? "block" : "none";  
    });  
  });  
}  

// ===== Bookmark Toggle Button (Attach Only Once) =====
document.addEventListener("DOMContentLoaded", () => {
  loadContent();

  const viewBtn = document.getElementById("view-bookmarks");

  viewBtn.addEventListener("click", async () => {
    const main = document.getElementById("content");

    if (showingBookmarks) {
      showingBookmarks = false;
      viewBtn.classList.remove("bookmarked");
      viewBtn.innerHTML = "☆";
      await loadContent();  // Reset
    } else {
      showingBookmarks = true;
      viewBtn.classList.add("bookmarked");
      viewBtn.innerHTML = "★";

      main.innerHTML = "";
      bookmarks.forEach(topic => {
        main.innerHTML += bookmarkBtnMap.get(topic) || "";
      });

      // Reattach only essential content box listeners
      const boxes = document.querySelectorAll(".content-box");
      boxes.forEach((box) => {
        const bookmarkBtn = box.querySelector(".bookmark-btn");
        const topic = box.dataset.topic;

        box.addEventListener("click", (e) => {
          if (e.target.classList.contains("bookmark-btn")) return;
          box.classList.toggle("expanded");
        });

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
});
