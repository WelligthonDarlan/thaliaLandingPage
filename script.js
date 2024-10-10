var carousel = document.querySelector('.carousel');
  var cellCount = 9; // Total de células no carrossel
  var selectedIndex = 0;
  var isDragging = false;
  var startX = 0;
  var currentX = 0;

  // Função para rotacionar o carrossel
  function rotateCarousel() {
    var angle = selectedIndex / cellCount * -360; // Ajustar o ângulo para corresponder ao total de células
    carousel.style.transform = 'translateZ(-288px) rotateY(' + angle + 'deg)';
  }

  // Botões de navegação
  var prevButton = document.querySelector('.previous-button');
  prevButton.addEventListener('click', function () {
    selectedIndex--;
    rotateCarousel();
  });

  var nextButton = document.querySelector('.next-button');
  nextButton.addEventListener('click', function () {
    selectedIndex++;
    rotateCarousel();
  });

  // Funções para arrastar com o mouse
  carousel.addEventListener('mousedown', function (event) {
    isDragging = true;
    startX = event.clientX; // Posição inicial do clique
  });

  carousel.addEventListener('mousemove', function (event) {
    if (isDragging) {
      currentX = event.clientX; // Posição atual do mouse
      var deltaX = currentX - startX; // Diferencial de movimento
      var rotation = deltaX / 5; // Ajuste para a rotação suave
      carousel.style.transform = `translateZ(-288px) rotateY(${rotation + selectedIndex * -360 / cellCount}deg)`;
    }
  });

  carousel.addEventListener('mouseup', function (event) {
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
    }
  });

  // Evento para finalizar o arraste se o mouse sair da área do carrossel
  document.addEventListener('mouseup', function () {
    isDragging = false;
  });