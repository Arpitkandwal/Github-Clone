let currentPage = 1;
let perPage = 10;

function toggleMode() {
  const body = document.body;
  body.classList.toggle("dark-mode");

  const toggleBtn = document.getElementById("toggle-btn");
  const isDarkMode = body.classList.contains("dark-mode");
  toggleBtn.textContent = isDarkMode ? "☀️" : "🌙";
}

async function fetchRepositories(searchTerm) {
  let apiUrl = `https://api.github.com/users/Arpitkandwal/repos?per_page=${perPage}&page=${currentPage}`;

  showLoader();

  try {
    const response = await fetch(apiUrl);
    const repositories = await response.json();

    const filteredRepositories = searchTerm
      ? repositories.filter((repo) =>
          repo.name.toLowerCase().includes(searchTerm)
        )
      : repositories;

    displayRepositories(filteredRepositories);
  } catch (error) {
  } finally {
    hideLoader();
  }
}

function searchRepositories() {
  const searchTerm = document
    .getElementById("search-input")
    .value.trim()
    .toLowerCase();
  fetchRepositories(searchTerm);

  console.log(searchTerm);
}

function displayRepositories(repositories) {
  console.log("Displaying repositories:", repositories);
  const container = document.getElementById("repositories-container");
  container.innerHTML = "";

  if (repositories.length === 0) {
    const noResultsMessage = document.createElement("div");
    noResultsMessage.classList.add("no-results");
    noResultsMessage.textContent = "No repositories found.";
    container.appendChild(noResultsMessage);
    return;
  }

  repositories.forEach((repo) => {
    const card = document.createElement("div");
    card.classList.add("repository-card");

    card.innerHTML = `
      <h3>${repo.name}</h3>
      <p>${repo.description || "Practice work"}</p>
      <div>Javascript</div>
      <div>HTML</div>
      <div>CSS</div>
    `;

    container.appendChild(card);
  });
}

function showLoader() {
  const loader = document.createElement("div");
  loader.classList.add("loader");
  document.getElementById("repositories-container").appendChild(loader);
}

function hideLoader() {
  const loader = document.querySelector(".loader");
  if (loader) {
    loader.remove();
  }
}

function previousPage() {
  if (currentPage !== 1) {
    currentPage -= 1;
    fetchRepositories();
  }
}

function nextPage() {
  currentPage += 1;
  fetchRepositories();
}

function goToPage(pageNumber) {
  currentPage = pageNumber;
  fetchRepositories();
}

fetchRepositories();


// Details of the user
const Details = async () => {
  const apiUrl = "https://api.github.com/users/Arpitkandwal";

  try {
    const response = await fetch(apiUrl);
    const details = await response.json();

    const name = details.name;
    const img = details.avatar_url;
    const bio = details.bio;

    document.getElementById("name").textContent = name;
    document.getElementById("img").src = img;
    document.getElementById("bio").textContent = bio;
  } catch (error) {
    console.log(error);
  }
};

Details();
