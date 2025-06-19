import { authService } from '../../services/authService.js';
import { MESSAGES } from '../../utils/constants.js';

document.querySelector('.auth-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!email || !password) {
    alert(MESSAGES.AUTH_ERROR);
    return;
  }

  const result = await authService.login(email, password);

  if (result.success) {
    window.location.href = './index.html';
  } else {
    alert('Credenciais inválidas!');
  }
});

