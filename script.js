const contentData = [
  {
    title: "Start a Business in 8 Simple Steps",
    body: `
    <ul>
      <li><strong>1. Find a Problem to Solve</strong><br>Look around—what do people need or struggle with?<br>Your solution = your business.</li>
      <li><strong>2. Validate Your Idea</strong><br>Talk to potential customers.<br>Ask: Would you pay for this?</li>
      <li><strong>3. Make a Simple Plan</strong><br>What are you selling?<br>Who are you selling to?<br>How will you make money?</li>
      <li><strong>4. Choose a Business Name & Identity</strong><br>Pick a name that’s easy to remember.<br>Get a logo, colors, and presence.</li>
      <li><strong>5. Register Your Business</strong><br>Choose your structure and get required licenses.</li>
      <li><strong>6. Set Up Finances</strong><br>Separate account, track expenses, maybe use accounting software.</li>
      <li><strong>7. Start Selling</strong><br>Use social, ads, and offer real value.</li>
      <li><strong>8. Keep Improving</strong><br>Collect feedback. Tweak and grow.</li>
    </ul>
    <div><strong>Tip:</strong> Don’t wait to be perfect. Start small. Learn fast. Grow smart.</div>
    `
  }
];

const contentContainer = document.getElementById("content-container");
const bookmarksContainer = document.getElementById("bookmarks-container");
const searchBar = document.getElementById("search-bar");
const viewBookmarksBtn = document.getElementById("view-bookmarks-btn");
const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

let bookmarks = [];

function createContentBox(item) {
  const box = document.createElement("div");
  box.className = "content-box";
  box.innerHTML = `<h3>${item.title}</h3><div class="content" style="display: none;">${item.body}</div><button class="bookmark-btn">Add to Bookmark</button>`;
  
  const content = box.querySelector(".content");
  const btn = box.querySelector(".bookmark-btn");

  box.addEventListener("click", function (e) {
    if (e.target !== btn) {
      box.classList.toggle("open");
      content.style.display = box.classList.contains("open") ? "block" : "none";
    }
  });

  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    btn.classList.toggle("active");
    if (btn.classList.contains("active")) {
      btn.textContent = "Bookmarked";
      bookmarks.push(box.outerHTML);
    } else {
      btn.textContent = "Add to Bookmark";
      bookmarks = bookmarks.filter(b => !b.includes(item.title));
    }
  });

  return box;
}

function renderContent() {
  contentData.forEach(item => {
    const box = createContentBox(item);
    contentContainer.appendChild(box);
  });
}

viewBookmarksBtn.addEventListener("click", () => {
  bookmarksContainer.innerHTML = bookmarks.join("");
  bookmarksContainer.classList.toggle("hidden");
});

menuBtn.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});

renderContent();
