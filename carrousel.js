var carousel = document.querySelector('.carousel');
var cellCount = 9; // Número total de células no carrossel
var selectedIndex = 0;
var isDragging = false;
var startX = 0;
var currentX = 0;
var lockClick = false; // Bloqueio para gerenciar cliques rápidos

// Função para rotacionar o carrossel
function rotateCarousel() {
  var angle = selectedIndex / cellCount * -360;
  carousel.style.transform = 'translateZ(-288px) rotateY(' + angle + 'deg)';
}

// Botões de navegação
var prevButton = document.querySelector('.previous-button');
prevButton.addEventListener('click', function () {
  if (!lockClick) {
    selectedIndex--;
    rotateCarousel();
    lockInteraction();
  }
});

var nextButton = document.querySelector('.next-button');
nextButton.addEventListener('click', function () {
  if (!lockClick) {
    selectedIndex++;
    rotateCarousel();
    lockInteraction();
  }
});

// Função para evitar cliques rápidos consecutivos
function lockInteraction() {
  lockClick = true;
  setTimeout(() => {
    lockClick = false;
  }, 500); // Desbloqueia após 500ms
}

// Funções para arrastar com o mouse
carousel.addEventListener('mousedown', function (event) {
  isDragging = true;
  startX = event.clientX; // Posição inicial do clique
  carousel.style.cursor = "grabbing"; // Muda o cursor para indicar arraste
  event.preventDefault(); // Previne a seleção de texto e comportamento padrão
});

document.addEventListener('mousemove', function (event) {
  if (isDragging) {
    currentX = event.clientX; // Posição atual do mouse
    var deltaX = currentX - startX; // Diferencial de movimento
    var rotation = deltaX / 5; // Ajuste para a rotação suave
    carousel.style.transform = `translateZ(-288px) rotateY(${rotation + selectedIndex * -360 / cellCount}deg)`;
  }
});

document.addEventListener('mouseup', function () {
  if (isDragging) {
    isDragging = false;
    var deltaX = currentX - startX;
    if (Math.abs(deltaX) > 30) {
      // Atualiza o índice de acordo com a direção do movimento
      if (deltaX < 0) {
        selectedIndex++;
      } else {
        selectedIndex--;
      }
    }
    rotateCarousel(); // Rotaciona o carrossel com base no novo índice
    carousel.style.cursor = "grab"; // Volta o cursor para o padrão
  }
});

// Reseta o estado de arraste se o mouse sair da janela (caso específico para evitar bugs)
document.addEventListener('mouseleave', function () {
  if (isDragging) {
    isDragging = false;
    rotateCarousel(); // Garante que o carrossel volte ao estado correto
    carousel.style.cursor = "grab"; // Reseta o cursor
  }
});

// Previne comportamento indesejado de arrastar
carousel.addEventListener('dragstart', function (event) {
  event.preventDefault();
});

// Previne seleção de texto ao clicar e arrastar no carrossel
carousel.addEventListener('selectstart', function (event) {
  event.preventDefault();
});
