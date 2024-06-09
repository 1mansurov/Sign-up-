const loginForm = document.querySelector('form');
const signBtn = document.querySelector('button');
const $email = document.querySelector('#email_id');
const $password = document.querySelector('#password_id');

const loginUser = (e) => {
    e.preventDefault();

    const user = {
        email: $email.value,
        password: $password.value
    };

    signBtn.setAttribute("disabled", true);
    signBtn.textContent = "Log In...";

    fetch("https://blogpost-server-production-d92d.up.railway.app/api/v1/user/login", {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .then(data => {
            localStorage.setItem("access_token", data.data.token)
            if (data.status == "success") {
                signBtn.textContent = "Success";
                console.log(data);
                window.location.href = "../pages/dashbord.html";
            } else {
                signBtn.textContent = "Log In";
                alert("Nimadir xato !!!");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            signBtn.textContent = "Log In";
            alert("Nimadir xato !!!");
        });
};

loginForm.addEventListener('submit', loginUser);


