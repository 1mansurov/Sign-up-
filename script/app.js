const $list = document.querySelector(".articles");
const $signLink = document.getElementById(".blog-id");
const $loginLink = document.getElementById(".kontent");

function fetchBlogs() {
  fetch("https://blog-post-production-b61c.up.railway.app/api/v1/blogs")
    .then((res) => res.json())
    .then((data) => renderBlogs(data.data));
}

function renderBlogs(data) {
  data.forEach((blog) => {
    const $item = document.createElement("li");
    $item.classList.add("list__item");
    $item.innerHTML = `
      <a href="../pages/index2.html?blog-id=${blog._id}" target="_blank">
                <img class="articles__img" src=${blog.image} alt="img"/> 
            </a>
            <div class="list__item-content">
                <h3 title="${blog.title}" class="item__title">${blog.title}</h3>
                <p title="${blog.description}" class="item__text">${blog.description}</p>
                <div class="item__profile">
                    <div class="item__author author">
                        <h4 class="author__name">${blog.author}</h4>
                        <span class="author__sub">Author</span>
                    </div>
                </div>
            </div>
    `;

    function viewRecipe(id) {
      window.location.href = `index2.html?id=${id}`;
    }

    $list.appendChild($item);
  });
}

fetchBlogs();
