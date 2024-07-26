// Selecting necessary DOM elements
const authorUsername = document.querySelector(".user__name");
const authorEmail = document.querySelector(".user__email");
const form = document.querySelector(".formula");
const tagBtn = document.querySelector(".btn");

// Initializing the postData object
const postData = {
  title: "",
  description: "",
  image: "",
  tags: [],
  author: "",
};

// Event listener for adding tags
tagBtn.addEventListener("click", function (event) {
  event.preventDefault();
  const tag = document.getElementById("tags").value;
  if (tag && !postData.tags.includes(tag)) {
    postData.tags.push(tag);
  }
});

// Getting token and user data from localStorage
const token = localStorage.getItem("access_token");
const data = JSON.parse(localStorage.getItem("user"));


// Setting author details in the DOM
if (data) {
  authorUsername.textContent = data.name;
  authorEmail.textContent = data.email;
}


// Logging user data for debugging
console.log(data);

// Event listener for form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const title = event.target[0].value;
  const description = event.target[1].value;
  const image = event.target[2].value;

  // Updating postData object with form values
  postData.title = title;
  postData.description = description;
  postData.image = image;
  postData.author = data.name; // Setting the author

  // Sending the POST request
  fetch("https://blogpost-server-production-d92d.up.railway.app/api/v1/blogs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(postData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then((responseData) => {
      console.log("Success:", responseData);
      if (responseData.status === "success") {
        // Additional logic for successful response
        console.log(responseData);
      } else {
        console.error("Error in response data:", responseData);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});


