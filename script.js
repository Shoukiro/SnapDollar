// Auto-load content and polls
async function loadAllContent() {
  const contentOrder = [
    { type: 'content', file: 'day1.html' },
    { type: 'poll', file: 'poll1.html' },
    { type: 'content', file: 'day2.html' },
    { type: 'poll', file: 'poll2.html' }
  ];

  const main = document.getElementById('content');
  
  for (const item of contentOrder) {
    try {
      const response = await fetch(`/${item.type}s/${item.file}`);
      const html = await response.text();
      main.innerHTML += html;
    } catch (error) {
      console.log(`Skipping ${item.file}:`, error);
    }
  }
  
  initOriginalFunctionality();
}

// Your original functionality (EXACTLY as before)
function initOriginalFunctionality() {
  const boxes = document.querySelectorAll(".content-box");
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  const bookmarkBtnMap = new Map();

  // Menu toggle
  document.getElementById("menu-toggle").addEventListener("click", function(e) {
    e.stopPropagation();
    const menu = document.getElementById("menu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  });

  // Close menu when clicking outside
  document.addEventListener("click", function() {
    document.getElementById("menu").style.display = "none";
  });

  // Content boxes
  boxes.forEach((box) => {
    const header = box.querySelector(".content-header");
    const bookmarkBtn = box.querySelector(".bookmark-btn");
    const topic = box.dataset.topic;

    bookmarkBtnMap.set(topic, box.outerHTML);

    if (bookmarks.includes(topic)) {
      bookmarkBtn.classList.add("bookmarked");
    }

    header.addEventListener("click", () => {
      box.classList.toggle("expanded");
    });

    bookmarkBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      bookmarks.includes(topic)
        ? (bookmarks.splice(bookmarks.indexOf(topic), 1), 
          bookmarkBtn.classList.remove("bookmarked"))
        : (bookmarks.push(topic), 
          bookmarkBtn.classList.add("bookmarked"));
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    });
  });

  // View bookmarks
  document.getElementById("view-bookmarks").addEventListener("click", () => {
    const main = document.querySelector("main");
    main.innerHTML = "";
    bookmarks.forEach(topic => {
      main.innerHTML += bookmarkBtnMap.get(topic) || "";
    });
  });

  // Search
  document.getElementById("search-input").addEventListener("input", function() {
    const value = this.value.toLowerCase();
    boxes.forEach((box) => {
      box.style.display = box.dataset.topic.toLowerCase().includes(value) 
        ? "block" 
        : "none";
    });
  });
}

// Start everything
document.addEventListener("DOMContentLoaded", loadAllContent);
