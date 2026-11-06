(() => {
const form = document.querySelector('#contact-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');
const feedbackStatus = document.querySelector('#feedback-status');
const fields = [nameInput, emailInput, messageInput];
let submitted = false;

function getError(input) {
    const value = input.value.trim();
    if (!value) return 'This field is required.';
    if (input.id === 'name' && value.length < 2) return 'Name must have at least 2 characters.';
    if (input.id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address.';
    if (input.id === 'message' && value.length < 10) return 'Message must have at least 10 characters.';
    return '';
}

function validateField(input) {
    const error = getError(input);
    document.querySelector('#' + input.id + '-error').textContent = error;
    input.classList.toggle('is-invalid', Boolean(error));
    input.classList.toggle('is-valid', !error);
    input.setAttribute('aria-invalid', String(Boolean(error)));
    return error === '';
}

form.addEventListener('input', event => {
    feedbackStatus.textContent = '';
    feedbackStatus.classList.remove('text-success');
    if (fields.includes(event.target) && (submitted || event.target.classList.contains('is-invalid'))) {
        validateField(event.target);
    }
});

form.addEventListener('submit', event => {
    event.preventDefault();
    submitted = true;
    let allValid = true;
    for (const input of fields) {
        if (!validateField(input)) allValid = false;
    }
    if (!allValid) {
        feedbackStatus.textContent = 'Please correct the highlighted fields.';
        feedbackStatus.classList.remove('text-success');
        fields.find(input => input.classList.contains('is-invalid')).focus();
        return;
    }
    feedbackStatus.classList.add('text-success');
    feedbackStatus.textContent = 'Your message is valid! This demo does not send email.';
});
})();
