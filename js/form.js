const form = document.getElementById('contactForm');
form.addEventListener('submit', (event) => {
  event.preventDefault();

  if(event.submitter.id == 'back')
    return;

  const emailInput = document.getElementById('email');
  const email = emailInput.value;
  if (email === '') {
    alert('Please enter your email.');
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  const messageInput = document.getElementById('message');
  const message = messageInput.value;
  if (message === '') {
    alert('Please enter your message.');
    return;
  }
  
  const formData = { 'email': email, 'message': message };

  fetch('http://localhost:3000/submit-form', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => {
    if (response.ok) {
      console.log('Form data saved successfully');
      // You can add additional logic here, such as showing a success message
    } else {
      console.error('Internal Server Error');
      // You can add additional error handling here, such as showing an error message
    }
  })
  .catch(error => {
    console.error('Network error:', error);
    // You can add additional error handling here, such as showing a network error message
  });
});
