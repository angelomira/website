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

  const formData = { 'email': `${email}`, 'message': `${message}` };

  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:3000/submit-form');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(formData));

  // Handle the response from the server
  xhr.onload = function() {
    if (xhr.status === 200) {
      console.log('Form data saved successfully');
    } else {
      console.error('Internal Server Error');
    }
  };
});