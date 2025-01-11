document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form from refreshing the page

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Simulate form submission and display status
    setTimeout(() => {
        document.getElementById('status').textContent = `Thank you, ${name}! Your message has been sent.`;
        document.getElementById('contactForm').reset();
    }, 1000);
});
