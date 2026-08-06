/**
 * Smart Attendance Management System - Authentication Client Engine
 * Handles client-side validation, password toggles, SweetAlert2 alerts, and AJAX API calls.
 */

document.addEventListener('DOMContentLoaded', () => {
  initPasswordToggles();
  initThemeToggle();
  initLoginForm();
});

// Toggle password visibility
function initPasswordToggles() {
  const toggleBtns = document.querySelectorAll('.toggle-password');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling || btn.parentElement.querySelector('input');
      if (input) {
        if (input.type === 'password') {
          input.type = 'text';
          btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;
        } else {
          input.type = 'password';
          btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
        }
      }
    });
  });
}

// Dark / Light Theme Toggle
function initThemeToggle() {
  const savedTheme = localStorage.getItem('app_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  const toggleBtn = document.getElementById('themeToggleBtn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('app_theme', nextTheme);
    });
  }
}

// Client-Side Validation Rules
function validateLoginForm(email, password) {
  if (!email || !email.trim()) {
    showToast('error', 'Email Required', 'Please enter your registered email address.');
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    showToast('error', 'Invalid Email Format', 'Please enter a valid email address (e.g. user@domain.com).');
    return false;
  }

  if (!password) {
    showToast('error', 'Password Required', 'Please enter your account password.');
    return false;
  }

  if (password.length < 8) {
    showToast('error', 'Password Length Error', 'Password must be at least 8 characters in length.');
    return false;
  }

  return true;
}

// AJAX Form Handler
function initLoginForm() {
  const loginForm = document.getElementById('authLoginForm');
  if (!loginForm) return;

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const roleInput = document.getElementById('userRole');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberInput = document.getElementById('rememberMe');
    const submitBtn = document.getElementById('submitBtn');

    const role = roleInput ? roleInput.value : 'student';
    const email = emailInput ? emailInput.value.trim() : '';
    const password = passwordInput ? passwordInput.value : '';
    const rememberMe = rememberInput ? rememberInput.checked : false;

    if (!validateLoginForm(email, password)) {
      return;
    }

    // Set Loading State
    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Authenticating...`;

    try {
      const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          role: role,
          email: email,
          password: password,
          remember_me: rememberMe
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store JWT token
        localStorage.setItem('jwt_access_token', data.access_token);
        if (data.refresh_token) {
          localStorage.setItem('jwt_refresh_token', data.refresh_token);
        }
        localStorage.setItem('user_session', JSON.stringify(data.user));

        if (typeof Swal !== 'undefined') {
          Swal.fire({
            icon: 'success',
            title: 'Authentication Successful',
            text: data.message || `Welcome back, ${data.user?.name || 'User'}!`,
            timer: 1500,
            showConfirmButton: false,
            background: 'var(--glass-bg)',
            color: 'var(--text-main)',
            customClass: {
              popup: 'glass-swal-popup'
            }
          }).then(() => {
            // Redirect based on role
            window.location.href = `/api/v1/auth/me`;
          });
        } else {
          alert('Login successful!');
          window.location.href = `/api/v1/auth/me`;
        }
      } else {
        showToast('error', 'Login Failed', data.message || 'Invalid email address or password.');
      }
    } catch (err) {
      console.error('Login error:', err);
      showToast('error', 'Network Error', 'Unable to reach the server. Please check your internet connection.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnContent;
    }
  });
}

// SweetAlert2 Toast Helper
function showToast(icon, title, text) {
  if (typeof Swal !== 'undefined') {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      confirmButtonColor: '#6366f1',
      background: 'rgba(15, 23, 42, 0.95)',
      color: '#f8fafc'
    });
  } else {
    alert(`${title}: ${text}`);
  }
}
