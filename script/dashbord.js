document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".formula");
    const tagBtn = document.querySelector(".btn");

    const postData = {
        title: "",
        description: "",
        image: "",
        tags: [],
        author: "",
    };

    tagBtn.addEventListener("click", function (event) {
        event.preventDefault();
        const tag = document.getElementById("tags").value;
        if (tag && !postData.tags.includes(tag)) {
            postData.tags.push(tag);
        }
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const title = event.target[0].value;
        const description = event.target[1].value;
        const image = event.target[2].value;

        postData.title = title;
        postData.description = description;
        postData.image = image;

        const token = localStorage.getItem("access_token");
        if (!token) {
            console.error("Access token not found in localStorage!");
            return;
        }

        fetch("https://blogpost-server-production-d92d.up.railway.app/api/v1/blogs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(postData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                if (data.status === "success") {
                    const signBtn = document.querySelector(".signBtn"); 
                    console.log(data);
                    const user = token.split(".");
                    const userInfo = JSON.parse(atob(user[1]));
                    const $nameEl = document.querySelector(".user__name");
                    $nameEl.textContent = userInfo.email;
                    const $role = document.querySelector(".name");
                    $role.textContent = userInfo.role;
                } else {
                    console.error("Error in response data:", data);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    });
});





// document.addEventListener("DOMContentLoaded", function () {
//     const form = document.querySelector(".formula");
//     const tagBtn = document.querySelector(".btn");

//     const postData = {
//         title: "",
//         description: "",
//         image: "",
//         tags: [],
//         author: "",
//     };

//     tagBtn.addEventListener("click", function (event) {
//         event.preventDefault();
//         const tag = document.getElementById("tags").value;
//         if (tag && !postData.tags.includes(tag)) {
//             postData.tags.push(tag);
//         }
//     });

//     form.addEventListener("submit", function (event) {
//         event.preventDefault();
//         const title = event.target[0].value;
//         const description = event.target[1].value;
//         const image = event.target[2].value;

//         fetch(
//             "https://blogpost-server-production-d92d.up.railway.app/api/v1/blogs",
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `bearer ${localStorage.getItem("access_token")}`,
//                 },
//                 body: JSON.stringify(postData),
//             }
//         )
//             .then((response) => response.json())
//             .then((data) => {
//                 console.log("Success:", data)
//                 if (data.status == "success") {
//                     signBtn.textContent = "Success";
//                     console.log(data);
//                     let user = token.split(".");
//                     let userInfo = JSON.parse(atob(user[1]));
//                     const $nameEl = document.querySelector(".user__name");
//                     $nameEl.textContent = userInfo.email;
//                     const $role = document.querySelector(".name");
//                     $role.textContent = userInfo.role
                
                
                
//                 } else {
//                     console.error("Access token not found in localStorage!");
                
//                 }
//             })
//             .catch((error) => {
//                 console.error("Error:", error);
//             });
//     });
// });


// if (data.status == "success") {
//     signBtn.textContent = "Success";
//     console.log(data);
//     window.location.href = "../pages/index.html";
//     let user = token.split(".");
//     let userInfo = JSON.parse(atob(user[1]));

//     const $nameEl = document.querySelector(".user__name");
//     $nameEl.textContent = userInfo.email;
//     const $role = document.querySelector(".name");
//     $role.textContent = userInfo.role



// } else {
//     console.log("Access token not found in localStorage!");

// }



// const $nameEl = document.querySelector(".user__name");
// $nameEl.textContent = userInfo.email;

// const $role = document.querySelector(".name");
// $role.textContent = userInfo.role;


