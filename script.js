const form = document.getElementById('form');
const emailInput = document.getElementById('email');
const submitButton = document.getElementById('submit');
const dismiss = document.getElementById('dismiss');

let userEmail = '';

const validateEmail = (email) => {
    if (!email || email.trim() === '') {
        return 'Valid email required';
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return 'Valid email required';
    }
    return '';
};

const showError = (message) => {
    const emailErrorMessageElement = document.getElementById('emailError');
    if (message) {
        if (emailErrorMessageElement) {
            emailErrorMessageElement.textContent = message;
            emailErrorMessageElement.classList.remove('hidden');
            emailErrorMessageElement.classList.add('error-message');
        }
        if (emailInput) {
            emailInput.classList.add('error-input');
        }
    } else {
        if (emailErrorMessageElement) {
            emailErrorMessageElement.textContent = '';
            emailErrorMessageElement.classList.add('hidden');
            emailErrorMessageElement.classList.remove('error-message');
        }
        if (emailInput) {
            emailInput.classList.remove('error-input');
        }
    }
};

const formContainer = document.getElementById('formContainer');
const successContainer = document.getElementById('successContainer');

const handleSubmit = (e) => {
    e.preventDefault();

    const formdata = Object.fromEntries(new FormData(e.target));

    const emailErrorMessage = validateEmail(formdata.email);

    if (emailErrorMessage) {
        showError(emailErrorMessage);
        return;
    }
    userEmail = formdata.email;
    const emailDisplay = document.getElementById('emailDisplay');
    if (emailDisplay) {
        emailDisplay.textContent = userEmail;
    }

    showError('');

    if (formContainer && successContainer) {
        formContainer.classList.add('hidden');
        successContainer.classList.remove('hidden');
        successContainer.classList.add('flex');
    }
};

const handleDismiss = () => {
    if (successContainer && formContainer) {
        successContainer.classList.add('hidden');
        successContainer.classList.remove('flex');
        formContainer.classList.remove('hidden');
    }
    if (form) {
        form.reset();
    }
    showError('');
};

const initializeForm = () => {
    if (form) {
        form.addEventListener('submit', handleSubmit);
    } else {
        console.error('❌ form not found!');
    }

    if (dismiss) {
        dismiss.addEventListener('click', handleDismiss);
    } else {
        console.error('❌ dismiss button not found!');
    }
};

initializeForm();
