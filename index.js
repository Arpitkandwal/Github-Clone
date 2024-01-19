let currentPage = 1;
let perPage = 10;



function toggleMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    
    const toggleBtn = document.getElementById('toggle-btn');
    const isDarkMode = body.classList.contains('dark-mode');
    toggleBtn.textContent = isDarkMode ? '☀️' : '🌙';
  }

  

async function fetchRepositories() {
  const apiUrl = `https://api.github.com/users/Arpitkandwal/repos?&per_page=${perPage}&page=${currentPage}`;

  showLoader();

  try {
    const response = await fetch(apiUrl);
    const repositories = await response.json();
    // console.log(repositories)

    displayRepositories(repositories);
  } catch (error) {
    const oops = document.createElement('div');
    oops.classList.add('oops');

    oops.innerHTML = "Error Fetching Repositories, Please reload the Page again or comeback Later.";

    document.body.appendChild(oops);
    console.error('Error fetching repositories:', error);
  } finally {
    hideLoader();
  }
}

// Will work on it later
// function searchRepositories() {
//   const searchTerm = document.getElementById('search-input').value.trim().toLowerCase();
//   fetchRepositories(searchTerm);
//   }


function displayRepositories(repositories) {
  const container = document.getElementById('repositories-container');
  container.innerHTML = '';
   
   repositories.map(repo => {
    const card = document.createElement('div');
    card.classList.add('repository-card');

    card.innerHTML = `
      <h3>${repo.name}</h3>
      <p>${repo.description || 'Practice work'}</p>
      <div>Javascript</div>
      <div>HTML</div>
      <div>CSS</div>
    `;

    // Save the element reference to the repo object
    // repo.element = card;
    // repo.name

    container.appendChild(card);
  });
}

function showLoader() {
  const loader = document.createElement('div');
  loader.classList.add('loader');
  document.getElementById('repositories-container').appendChild(loader);
}

function hideLoader() {
  const loader = document.querySelector('.loader');
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



const Details = async() => {
    const apiUrl = "https://api.github.com/users/Arpitkandwal";

    try {
      const response = await fetch(apiUrl);
      const details = await response.json();  
      console.log(details); 

      const name = details.name;
      const img = details.avatar_url;
      const bio = details.bio;

      document.getElementById('name').textContent = name;
        document.getElementById('img').src = img;
        document.getElementById('bio').textContent = bio;

      }
      catch(error) {
        console.log(error)
      }
  }

  Details();