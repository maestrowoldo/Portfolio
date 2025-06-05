document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
window.addEventListener('scroll', function() {
    const header = document.querySelector('header.fixed-header');
    if (window.scrollY > 50) { // Altere o valor conforme necessário
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
