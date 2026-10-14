// login.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    const rememberCheckbox = document.querySelector('.login-options input[type="checkbox"]');
    const googleBtn = document.querySelector('.google-button');
    const forgotLink = document.querySelector('.forget-link');

    // Load remembered email (if any)
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
        emailInput.value = savedEmail;
        rememberCheckbox.checked = true;
    }

    // ===== Form Submit =====
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Basic validation
        if (!email || !password) {
            showMessage('Please fill in both email and password.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        if (password.length < 6) {
            showMessage('Password must be at least 6 characters.', 'error');
            return;
        }

        // Simulate login (replace with real API later)
        loginUser(email, password);
    });

    // ===== Google Login (Mock) =====
    googleBtn.addEventListener('click', () => {
        showMessage('Google login is not connected yet (demo only).', 'info');
        // In real project you would redirect to Google OAuth here
    });

    // ===== Forgot Password =====
    forgotLink.addEventListener('click', (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();

        if (!email) {
            showMessage('Please enter your email first.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email.', 'error');
            return;
        }

        showMessage(`Password reset link sent to ${email} (demo)`, 'success');
    });

    // ===== Helper Functions =====
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function loginUser(email, password) {
        // Demo credentials (you can change these)
        const demoEmail = 'demo@taskflow.com';
        const demoPassword = '123456';

        // Simulate network delay
        showMessage('Logging in...', 'info');

        setTimeout(() => {
            if (email === demoEmail && password === demoPassword) {
                // Remember Me
                if (rememberCheckbox.checked) {
                    localStorage.setItem('rememberedEmail', email);
                } else {
                    localStorage.removeItem('rememberedEmail');
                }

                // Save logged-in user
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', email);

                showMessage('Login successful! Redirecting...', 'success');

                // Redirect after short delay
                setTimeout(() => {
                    window.location.href = 'HOME.html'; // Change to your home page
                }, 1200);
            } else {
                showMessage('Invalid email or password.', 'error');
            }
        }, 800);
    }

    function showMessage(text, type = 'info') {
        // Remove existing message
        const oldMsg = document.querySelector('.auth-message');
        if (oldMsg) oldMsg.remove();

        const msg = document.createElement('div');
        msg.className = `auth-message ${type}`;
        msg.textContent = text;

        // Insert above the form
        form.parentNode.insertBefore(msg, form);

        // Auto remove after 4 seconds (except success)
        if (type !== 'success') {
            setTimeout(() => msg.remove(), 4000);
        }
    }
});