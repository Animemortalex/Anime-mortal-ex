let animeData = [
  {
    name: "One Piece",
    thumb: "https://wallpaperaccess.com/full/1923029.jpg",
    video: "https://yourcloudlink.com/onepiece"
  },
  {
    name: "Naruto",
    thumb: "https://wallpaperaccess.com/full/1235580.jpg",
    video: "https://yourcloudlink.com/naruto"
  }
];

function goToHome() {
  document.querySelector(".welcome-screen").style.display = "none";
  document.getElementById("main-page").style.display = "block";
}

function toggleMenu() {
  document.getElementById("dropdown").classList.toggle("hidden");
}

function searchAnime() {
  const val = document.getElementById("searchBox").value.toLowerCase();
  const results = document.getElementById("results");

  if (val === '') {
    results.innerHTML = '';
    return;
  }

  const matched = animeData.filter(anime => anime.name.toLowerCase().includes(val));

  if (matched.length === 0) {
    results.innerHTML = `<p class="not-found">Oops! "${val}" not found.</p>`;
  } else {
    results.innerHTML = matched.map(anime => `
      <div class="card">
        <img src="${anime.thumb}" alt="${anime.name}" />
        <h3>${anime.name}</h3>
        <a href="${anime.video}" target="_blank"><button>Watch Now</button></a>
        <a href="${anime.video}" download><button>Download</button></a>
      </div>
    `).join('');
  }

  // মেনু বন্ধ করে দাও যেন কিছু চাপলে লিস্ট হাইড হয়
  document.getElementById("dropdown").classList.add("hidden");
}

function showSignUpForm() {
  const results = document.getElementById("results");
  results.innerHTML = `
    <div class="form-card">
      <span class="close-btn" onclick="closeForm()">×</span>
      <h2>Create Account</h2>
      <form>
        <input type="text" placeholder="Username" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  `;
  document.getElementById("dropdown").classList.add("hidden");
}

function showSignInForm() {
  const results = document.getElementById("results");
  results.innerHTML = `
    <div class="form-card">
      <span class="close-btn" onclick="closeForm()">×</span>
      <h2>Welcome Back</h2>
      <form>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Sign In</button>
      </form>
    </div>
  `;
  document.getElementById("dropdown").classList.add("hidden");
}

function closeForm() {
  document.getElementById("results").innerHTML = '';
}

// 🔑 Esc চাপলে ফর্ম বন্ধ
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    document.getElementById("results").innerHTML = '';
  }
});

// 🖱️ ফর্মের বাইরের কোথাও ক্লিক করলে ফর্ম গায়েব
document.addEventListener("click", function(e) {
  const form = document.querySelector(".form-card");
  const results = document.getElementById("results");
  if (form && !form.contains(e.target) && !e.target.closest("#dropdown")) {
    results.innerHTML = "";
  }
});

// ⌨️ Enter চাপলে সার্চ হবে
document.getElementById("searchBox").addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    searchAnime();
  }
});
