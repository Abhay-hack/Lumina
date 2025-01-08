// public/validation.js

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
  const error_message = document.getElementById('error-message');

  // Determine if it's a signup or login form based on the action attribute
  const formAction = form.getAttribute('action');

  form.addEventListener('submit', (e) => {
    let errors = [];

    if (formAction === '/signup') {
      const firstname_input = document.getElementById('firstname-input');
      const email_input = document.getElementById('email-input');
      const password_input = document.getElementById('password-input');
      const repeat_password_input = document.getElementById('repeat-password-input');

      errors = getSignupFormErrors(
        firstname_input.value.trim(),
        email_input.value.trim(),
        password_input.value,
        repeat_password_input.value
      );

      // Highlight incorrect fields
      highlightErrors(['firstname-input', 'email-input', 'password-input', 'repeat-password-input'], errors);
    } else if (formAction === '/login') {
      const email_input = document.getElementById('email-input');
      const password_input = document.getElementById('password-input');

      errors = getLoginFormErrors(
        email_input.value.trim(),
        password_input.value
      );

      // Highlight incorrect fields
      highlightErrors(['email-input', 'password-input'], errors);
    }

    if (errors.length > 0) {
      e.preventDefault(); // Prevent form submission
      error_message.innerText = errors.join('. ');
    }
  });

  function getSignupFormErrors(firstname, email, password, repeatPassword) {
    let errors = [];

    if (!firstname) {
      errors.push('Firstname is required');
    }else if (!validateName(firstname)) {
      errors.push('Firstname must contain only letters, spaces, or hyphens');
    }

    if (!email) {
      errors.push('Email is required');
    } else if (!validateEmail(email)) {
      errors.push('Invalid email format');
    }

    if (!password) {
      errors.push('Password is required');
    } else if (password.length < 8) {
      errors.push('Password must have at least 8 characters');
    }

    if (!repeatPassword) {
      errors.push('Repeat Password is required');
    } else if (password !== repeatPassword) {
      errors.push('Passwords do not match');
    }

    return errors;
  }

  function getLoginFormErrors(email, password) {
    let errors = [];

    if (!email) {
      errors.push('Email is required');
    } else if (!validateEmail(email)) {
      errors.push('Invalid email format');
    }

    if (!password) {
      errors.push('Password is required');
    }

    return errors;
  }

  function validateEmail(email) {
    // Simple email regex for validation
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  }
  function validateName(name) {
    // Name should contain only letters, spaces, or hyphens
    const nameRe = /^[A-Za-z\s-]+$/;
    return nameRe.test(name);
  }

  function highlightErrors(inputIds, errors) {
    // Clear previous error highlights
    inputIds.forEach(id => {
      const input = document.getElementById(id);
      if (input) {
        input.parentElement.classList.remove('incorrect');
      }
    });

    // Highlight current errors
    errors.forEach(error => {
      if (error.toLowerCase().includes('firstname')) {
        document.getElementById('firstname-input').parentElement.classList.add('incorrect');
      }
      if (error.toLowerCase().includes('email')) {
        document.getElementById('email-input').parentElement.classList.add('incorrect');
      }
      if (error.toLowerCase().includes('password') && !error.toLowerCase().includes('match')) {
        document.getElementById('password-input').parentElement.classList.add('incorrect');
      }
      if (error.toLowerCase().includes('repeat password') || error.toLowerCase().includes('match')) {
        document.getElementById('repeat-password-input').parentElement.classList.add('incorrect');
      }
    });
  }

  // Optional: Remove error highlights on input
  const allInputs = document.querySelectorAll('input');

  allInputs.forEach(input => {
    input.addEventListener('input', () => {
      if (input.parentElement.classList.contains('incorrect')) {
        input.parentElement.classList.remove('incorrect');
        error_message.innerText = '';
      }
    });
  });
});
