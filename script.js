// Auto-load content and polls
async function loadAllContent() {
  const contentOrder = [
    { type: 'content', file: 'day1.html' },
    { type: 'poll', file: 'poll1.html' },
    { type: 'content', file: 'day2.html' },
    { type: 'poll', file: 'poll2.html' }
    // Add new items here as needed
  ];

  const main = document.getElementById('content');
  
  for (const item of contentOrder) {
    const response = await fetch(`/${item.type}s/${item.file}`);
    const html = await response.text();
    main.innerHTML += html;
  }
  
  // Initialize your existing functionality
  initContentBoxes();
}

function initContentBoxes() {
  const boxes = document.querySelectorAll(".content-box");
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  const bookmarkBtnMap = new Map();

  boxes.forEach((box, index) => {
    const header = box.querySelector(".content-header");
    const bookmarkBtn = box.querySelector(".bookmark-btn");
    const topic = box.dataset.topic;
    const body = box.querySelector(".content-body");

    bookmarkBtnMap.set(topic, box.outerHTML);

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

  // [Keep all your other existing event listeners]
}

document.addEventListener("DOMContentLoaded", loadAllContent);
