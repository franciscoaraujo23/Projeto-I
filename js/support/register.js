import { authService } from '../../services/authService.js';

    document.querySelector('.auth-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const userData = {
        nome: document.getElementById('first-name').value + ' ' + document.getElementById('last-name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        // Campos padrão para gamificação
        pontos: 0,
        nivel: 1,
        caminhosPercorridos: []
        };

        // Validações
        if (document.getElementById('password').value !== document.getElementById('confirm-password').value) {
        alert('As senhas não coincidem!');
        return;
        }

        if (!document.querySelector('[name="terms"]').checked) {
        alert('Deve aceitar os termos!');
        return;
        }

        const result = await authService.register(userData);
        
        if (result.success) {
        alert('Registo bem-sucedido! Faça login.');
        window.location.href = 'login.html';
        } else {
        alert('Erro no registo!');
        }
    });

    const result = await authService.register({
        nome: 'Nome Completo',
        email: 'novo@email.com',
        password: 'senhaSegura123'
    });

    if (result.success) {
        alert(result.message);
        window.location.href = './index.html'; // Redireciona para a página principal
    } else {
        alert(result.message); // Mostra erro específico
    }