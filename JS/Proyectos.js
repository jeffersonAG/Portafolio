const slides = document.querySelectorAll('.carousel .slide');

// Ejemplo de acción al hacer clic en un proyecto
slides.forEach(slide => {
  slide.addEventListener('click', () => {
    alert(`Has hecho clic en: ${slide.innerText}`);
  });
});
