// import axios from 'https://unpkg.com/axios/dist/axios.min.js';


const resultsContainer = document.querySelector(".js-results");
const postsList = document.querySelector(".posts__list");
const userList = document.querySelector(".users__list");

const searchInput = document.querySelector(".js-input");
const form = document.querySelector('form');

const getUserGithub = async (username) => {
  const data = await fetch(`https://api.github.com/users/${username}`)
  return await data.json();
};

const getPosts = async () => {
  const data = await axios({
    method: 'get',
    url: 'https://jsonplaceholder.typicode.com/posts',
  });

  return data.data;
};

const getUsers = async () => {
  const data = await axios({
    method: 'get',
    url: 'https://jsonplaceholder.typicode.com/users',
  });

  return data.data;
};

const renderUser = async (user) => {
  const result = await getUserGithub(user);
  resultsContainer.insertAdjacentHTML('afterbegin',`
      <div class="response-container">
          <img src="${result.avatar_url}">
          <p> Имя: <span>${result.name}</span><p>
          <p> О себе: <span>${result.bio}</span><p>
          <p> Кол-во репозиториев: <span>${result.public_repos}</span><p>
      </div>`
  );
}

const renderPosts = async () => {
  const posts = await getPosts();
  let allPosts = '';
  posts.forEach(post => {
    allPosts += `
      <li class="posts__item post">
        <h3 class="post__title">${post.name}</h3>
        <p class="post__text">${post.title}</p>
      </li>
    `;
  });

  postsList.insertAdjacentHTML('afterbegin', allPosts);
};

const renderUsers = async () => {
  const users = await getUsers();
  let allUsers = '';
  users.forEach(user => {
    allUsers += `
    <li class="users__item user">
      <ul class="user__contacts list-reset">
        <li class="user__contact phone">
          <a href="">${user.phone}</a>
        </li>
        <li class="user__contact website">
          <a href="${user.website}">${user.website}</a>
        </li>
        <li class="user__contact email">
          <a href="mailto:${user.website}">${user.email}</a>
        </li>
        <li class="user__contact location">
          <address class="user__address">
            <span>
              <span>Street :</span>
              <span>${user.address.street}</span>
            </span>
            <span>
              <span>Suite :</span>
              <span>${user.address.suite}/span>
            </span>
            <span>
              <span>City :</span>
              <span>${user.address.city}</span>
            </span>
            <span>
              <span>Zipcode :</span>
              <span>${user.address.zipcode}</span>
            </span>
          </address>
        </li>
      </ul>
      <div class="user__info">
        <a class="user__link" href="?id=${user.id}">Show Profile</a>
        <img src="https://ui-avatars.com/api/?name=${user.name}&background=random" alt="" class="user__avatar">
        <h3 class="user__name">${user.name}</h3>
        <p class="user__username">${user.username}</p>
      </div>
    </li>
    `;
  });

  userList.insertAdjacentHTML('afterbegin', allUsers);
};

renderPosts();
renderUsers();


form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const searchValue = searchInput.value.trim().toLowerCase();
  resultsContainer.innerHTML = '';
  if (searchValue.length < 3) {
    return;
  }
  renderUser(searchValue);
});