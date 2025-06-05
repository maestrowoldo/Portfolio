/* Scroll suave para âncoras
----------------------------------------------------------------------------*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


/* Efeito de cabeçalho fixo ao rolar a página
----------------------------------------------------------------------------*/
window.addEventListener('scroll', function() {
    const header = document.querySelector('header.fixed-header');
    if (window.scrollY > 50) { // Altere o valor conforme necessário
        header.classList.add('scrolled');  
    } else {
        header.classList.remove('scrolled');
    }
});


/* Validação de formulário e envio de dados via fetch API
-----------------------------------------------------------------------------*/
document.getElementById('leadForm').addEventListener('submit', async function(e) {
  e.preventDefault(); //// Evita recarregar a página

  // Coleta os dados do formulário
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const celular = document.getElementById('celular').value;
  const mensagem = document.getElementById('mensagem').value;


  const res = await fetch('/api/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email, celular, mensagem })
  });

    // Exibe retorno para o usuário
  const data = await res.json();
  document.getElementById('Confirmacao').textContent = data.mensagem;
  this.reset();
});

