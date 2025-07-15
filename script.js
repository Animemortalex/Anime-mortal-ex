// Load anime data from Firebase Firestore
let animeData = [];

db.collection("anime").onSnapshot(snapshot => {
  animeData = snapshot.docs.map(doc => doc.data());
  // You can refresh UI here if needed when data updates
});

// Welcome screen → Homepage
function goToHome() {
  document.querySelector('.welcome-screen').style.display = 'none';
  document.getElementById('main-page').style.display = 'block';
}

// Toggle 3-dot dropdown menu
function toggleMenu() {
  let dropdown = document.getElementById('dropdown');
  dropdown.style.display = (dropdown.style.display === 'block') ? 'none' : 'block';
}

// Search anime by name
function searchAnime() {
  const val = document.getElementById('searchBox').value.toLowerCase();
  const results = document.getElementById('results');

  if (val === '') {
    results.innerHTML = '';
    return;
  }

  const matched = animeData.filter(anime => anime.name.toLowerCase().includes(val));

  if (matched.length === 0) {
    results.innerHTML = `<p>Oops! "${val}" anime not found.</p>`;
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
}

// 3-dot menu item click handler
document.querySelectorAll('#dropdown li').forEach(item => {
  item.addEventListener('click', () => {
    const text = item.textContent.trim().toLowerCase();

    if (text === 'series') {
      showSeries();
    } else if (text === 'language') {
      showLanguages();
    } else if (text === 'popular anime') {
      showPopularAnime();
    } else if (text === 'anime movie') {
      showAnimeMovies();
    } else if (text === 'sign up') {
      showSignUpForm();
    } else if (text === 'sign in') {
      showSignInForm();
    }

    toggleMenu(); // close menu after click
  });
});

// Show series anime
function showSeries() {
  const results = document.getElementById('results');
  const series = animeData.filter(anime => anime.type === 'series');

  if(series.length === 0) {
    results.innerHTML = '<p>No series found.</p>';
    return;
  }

  results.innerHTML = series.map(anime => `
    <div class="card">
      <img src="${anime.thumb}" alt="${anime.name}" />
      <h3>${anime.name}</h3>
      <a href="${anime.video}" target="_blank"><button>Watch Now</button></a>
      <a href="${anime.video}" download><button>Download</button></a>
    </div>
  `).join('');
}

// Show language options
function showLanguages() {
  const results = document.getElementById('results');
  const languages = ['japanese', 'english', 'hindi'];

  results.innerHTML = `
    <h3>Select Language</h3>
    ${languages.map(lang => `<button onclick="filterByLanguage('${lang}')">${lang.charAt(0).toUpperCase() + lang.slice(1)}</button>`).join(' ')}
  `;
}

// Filter anime by language
function filterByLanguage(language) {
  const results = document.getElementById('results');
  const filtered = animeData.filter(anime => anime.language === language);

  if(filtered.length === 0) {
    results.innerHTML = '<p>No anime found for this language.</p>';
    return;
  }

  results.innerHTML = filtered.map(anime => `
    <div class="card">
      <img src="${anime.thumb}" alt="${anime.name}" />
      <h3>${anime.name}</h3>
      <a href="${anime.video}" target="_blank"><button>Watch Now</button></a>
      <a href="${anime.video}" download><button>Download</button></a>
    </div>
  `).join('');
}

// Show popular anime (sorted by rating)
function showPopularAnime() {
  const results = document.getElementById('results');
  const popular = animeData.slice().sort((a,b) => b.rating - a.rating).slice(0, 12);

  if(popular.length === 0) {
    results.innerHTML = '<p>No popular anime found.</p>';
    return;
  }

  results.innerHTML = popular.map(anime => `
    <div class="card">
      <img src="${anime.thumb}" alt="${anime.name}" />
      <h3>${anime.name}</h3>
      <a href="${anime.video}" target="_blank"><button>Watch Now</button></a>
      <a href="${anime.video}" download><button>Download</button></a>
    </div>
  `).join('');
}

// Show only anime movies
function showAnimeMovies() {
  const results = document.getElementById('results');
  const movies = animeData.filter(anime => anime.type === 'movie');

  if(movies.length === 0) {
    results.innerHTML = '<p>No anime movies found.</p>';
    return;
  }

  results.innerHTML = movies.map(anime => `
    <div class="card">
      <img src="${anime.thumb}" alt="${anime.name}" />
      <h3>${anime.name}</h3>
      <a href="${anime.video}" target="_blank"><button>Watch Now</button></a>
      <a href="${anime.video}" download><button>Download</button></a>
    </div>
  `).join('');
}

// Show Sign Up form
function showSignUpForm() {
  const results = document.getElementById('results');
  results.innerHTML = `
    <h3>Sign Up</h3>
    <form id="signupForm">
      <input type="text" id="signupName" placeholder="Name" required />
      <input type="email" id="signupEmail" placeholder="Email" required />
      <input type="password" id="signupPassword" placeholder="Password" required />
      <button type="submit">Sign Up</button>
    </form>
  `;

  document.getElementById('signupForm').addEventListener('submit', e => {
    e.preventDefault();
    alert('Sign Up function not implemented yet.');
  });
}

// Show Sign In form
function showSignInForm() {
  const results = document.getElementById('results');
  results.innerHTML = `
    <h3>Sign In</h3>
    <form id="signinForm">
      <input type="email" id="signinEmail" placeholder="Email" required />
      <input type="password" id="signinPassword" placeholder="Password" required />
      <button type="submit">Sign In</button>
    </form>
  `;

  document.getElementById('signinForm').addEventListener('submit', e => {
    e.preventDefault();
    alert('Sign In function not implemented yet.');
  });
}