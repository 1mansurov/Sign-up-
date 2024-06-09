document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.querySelector('#signUP');
    const submitBtn = document.querySelector('button');

    const registerUser = (e) => {
        e.preventDefault();

        const User = {
            name: signupForm.querySelector('#name').value,
            email: signupForm.querySelector('#email').value,
            password: signupForm.querySelector('.password').value
        };

        submitBtn.setAttribute('disabled', true);
        submitBtn.textContent = 'Registering...';

        fetch('https://blogpost-server-production-d92d.up.railway.app/api/v1/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(User)
        })
        .then(res => res.json())
        .then(data => {
            submitBtn.removeAttribute('disabled');
            console.log(data);
            if (data.status === 'success') {
                signupForm.reset(); // Formani tozalash
                alert('You have successfully registered!');
                location.replace('../pages/index3.html');
            } else {
                submitBtn.textContent = 'Sign Up';
                alert('An error occurred. Please try again later.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            submitBtn.removeAttribute('disabled');
            submitBtn.textContent = 'Sign Up';
        });
    };

    signupForm.addEventListener('submit', registerUser);
});
