// === SITE CONFIGURATION ===
const sitename = "Nexus";       // Site name displayed in title and header
const subtext = "v1.2";         // Subtitle or version info
const serverUrl1 = "https://gms.parcoil.com"; // Game asset server

// === PAGE TITLE UPDATE ===
document.title = `${document.title} | ${sitename}`;

// === HEADER TEXT UPDATE ===
const titleEl = document.getElementById("title");
const subtitleEl = document.getElementById("subtitle");

if (titleEl) titleEl.textContent = sitename;
if (subtitleEl) subtitleEl.textContent = subtext;

// === GAME DISPLAY LOGIC ===
let gamesData = [];

function displayFilteredGames(filteredGames) {
  const gamesContainer = document.getElementById("gamesContainer");
  if (!gamesContainer) return;

  gamesContainer.innerHTML = "";

  filteredGames.forEach((game) => {
    const gameDiv = document.createElement("div");
    gameDiv.classList.add("game");

    const gameImage = document.createElement("img");
    gameImage.src = `${serverUrl1}/${game.url}/${game.image}`;
    gameImage.alt = game.name;
    gameImage.onclick = () => {
      window.location.href = `play.html?gameurl=${game.url}/`;
    };

    const gameName = document.createElement("p");
    gameName.textContent = game.name;

    gameDiv.appendChild(gameImage);
    gameDiv.appendChild(gameName);
    gamesContainer.appendChild(gameDiv);
  });
}

// === SEARCH HANDLER ===
function handleSearchInput() {
  const searchInput = document.getElementById("searchInput");
  if (!searchInput) return;

  const searchValue = searchInput.value.toLowerCase();
  const filteredGames = gamesData.filter((game) =>
    game.name.toLowerCase().includes(searchValue)
  );
  displayFilteredGames(filteredGames);
}

// === FETCH GAME DATA ===
fetch("./config/games.json")
  .then((response) => response.json())
  .then((data) => {
    gamesData = data;
    displayFilteredGames(data);
  })
  .catch((error) => console.error("Error fetching games:", error));

// === SEARCH EVENT LISTENER ===
const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("input", handleSearchInput);
}
