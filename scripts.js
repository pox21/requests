
const resultsContainer = document.querySelector(".js-results");
const postsList = document.querySelector(".posts__list");

const searchInput = document.querySelector(".js-input");
const form = document.querySelector('form');

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const searchValue = searchInput.value.trim().toLowerCase();
  resultsContainer.innerHTML = '';
  if (searchValue.length < 3) {
    return;
  }
  const data = await fetch(`https://api.github.com/users/${searchValue}`)
  const result = await data.json();
  resultsContainer.insertAdjacentHTML('afterbegin',`
      <div class="response-container">
          <img src="${result.avatar_url}">
          <p> Имя: <span>${result.name}</span><p>
          <p> О себе: <span>${result.bio}</span><p>
          <p> Кол-во репозиториев: <span>${result.public_repos}</span><p>
      </div>`);
});

const getPosts = async () => {
  const data = await axios({
    method: 'get',
    url: 'https://jsonplaceholder.typicode.com/posts',
  });

  return data.data;
}

const renderPosts = async () => {
  const posts = await getPosts();
  let allPosts = '';
  posts.forEach(post => {
    allPosts += `
      <li class="posts__item post">
        <h3 class="post__title">${post.title}</h3>
        <p class="post__text">${post.title}</p>
      </li>
    `;
  });

  postsList.insertAdjacentHTML('afterbegin', allPosts);
}

renderPosts();
