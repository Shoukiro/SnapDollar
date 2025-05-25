// script.js
document.addEventListener("DOMContentLoaded", function () {
  const boxes = document.querySelectorAll(".content-box");
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  const bookmarkBtnMap = new Map();

  // Menu toggle functionality
  document.getElementById("menu-toggle").addEventListener("click", function(e) {
    e.stopPropagation();
    const menu = document.getElementById("menu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  });

  // Close menu when clicking outside
  document.addEventListener("click", function() {
    document.getElementById("menu").style.display = "none";
  });

  // Existing content box functionality
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

  document.getElementById("view-bookmarks").addEventListener("click", () => {
    const main = document.querySelector("main");
    main.innerHTML = "";
    bookmarks.forEach(topic => {
      main.innerHTML += bookmarkBtnMap.get(topic) || "";
    });
  });

  document.getElementById("search-input").addEventListener("input", function () {
    const value = this.value.toLowerCase();
    boxes.forEach((box) => {
      const topic = box.dataset.topic.toLowerCase();
      if (topic.includes(value)) {
        box.style.display = "block";
      } else {
        box.style.display = "none";
      }
    });
  });
});
