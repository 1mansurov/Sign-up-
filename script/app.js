const $list = document.querySelector(".articles");
const $signLink = document.getElementById(".blog-id");
const $loginLink = document.getElementById(".kontent");

function fetchBlogs() {
	fetch("https://blogpost-server-production-d92d.up.railway.app/api/v1/blogs")
		.then((res) => res.json())
		.then((data) => renderBlogs(data.data));
}

function renderBlogs(data) {
	console.log(data);
	data.forEach((blog) => {
		const $item = document.createElement("li");
		$item.classList.add("list__item", "item");
		$item.innerHTML = `
      <a href="../pages/single.html?blog-id=${blog._id}" target = "_blank">
      <img class="img" src=${blog.image}
      alt="img"
      width="266"
      height="172"/> </a>
      <div class="articles">
        <h3 title = "${blog.title}"  class="item__title">${truncateArticle(
			blog.title,
			(maxLength = 30)
		)}</h3>
        <p title = "${blog.description}" class="item__text">${truncateArticle(
			blog.description
		)}</p>
        <div class="item__prof">
          <img
            src="https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-nature-mountain-scenery-with-flowers-free-photo.jpg?w=600&quality=80"
            alt=""
            width="40"
            height="40"
          />
          <div class="item__author author">
            <h4 class="author__name">${blog.author}</h4>
            <span class="author__sub">Author</span>
          </div>
        </div>
      </div>
    `;

		function viewRecipe(id) {
			window.location.href = `single.html?id=${id}`;
		}

		$list.appendChild($item);
	});
}

fetchBlogs();

$loginLink.href = location.origin + "/pages/login.html";
$loginLink.target = "_blank";
function truncateArticle(article, maxLength = 60) {
	if (article.length > maxLength) {
		return article.slice(0, maxLength - 3) + "...";
	}
	return article;
}

$signLink.href = location.origin + "/pages/index.html";
$signLink.target = "_blank";