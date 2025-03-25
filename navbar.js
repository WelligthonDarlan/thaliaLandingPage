// Defina a altura de ajuste para compensar a navbar
const offsetHeight = 80;

// Seleciona todos os links que possuem o atributo `data-target`
const navLinks = document.querySelectorAll('nav a[data-target]');

navLinks.forEach(link => {
  link.addEventListener('click', function (event) {
    event.preventDefault(); // Impede o comportamento padrão do link

    // Obtém o valor do atributo `data-target`
    const targetID = this.getAttribute('data-target');

    // Seleciona a seção correspondente
    const targetSection = document.getElementById(targetID);

    // Calcula a posição ajustada para a rolagem
    if (targetSection) {
      const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - offsetHeight;

      // Ajusta a rolagem suavemente com o espaçamento superior
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// const menuToggle = document.getElementById("menu-toggle");
// const menuHamburguer = document.getElementById("menu-hamburguer");


// menuToggle.addEventListener("click", () => {
//   menuHamburguer.classList.add("show");
// });

// menuHamburguer.querySelectorAll("a").forEach(link => {
//   link.addEventListener("click", () => {
//     menuHamburguer.classList.remove("show");
   
//   });
// });


