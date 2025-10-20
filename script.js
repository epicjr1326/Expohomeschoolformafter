const form = document.getElementById('surveyForm');
const slides = document.querySelectorAll('.form-slide');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

document.getElementById('next1').onclick = () => showSlide(1);
document.getElementById('next2').onclick = () => showSlide(2);
document.getElementById('next3').onclick = () => showSlide(3);
document.getElementById('prev1').onclick = () => showSlide(0);
document.getElementById('prev2').onclick = () => showSlide(1);
document.getElementById('prev3').onclick = () => showSlide(2);

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    nombre: document.getElementById('nombre').value,
    edad: document.getElementById('edad').value,
    telefono: document.getElementById('telefono').value,
    email: document.getElementById('email').value,
    puesto_mas_fila: document.getElementById('puesto_mas_fila').value,
    puesto_favorito: document.getElementById('puesto_favorito').value,
    limpieza: document.getElementById('limpieza').value,
    competitivo: document.getElementById('competitivo').value,
    diversion: document.getElementById('diversion').value,
    volver: document.getElementById('volver').value
  };
  
  try {
    const response = await fetch("https://n8n-service-docker-image.onrender.com/webhook/survey-after", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      document.getElementById('form-message').textContent = `🎉 Gracias ${data.nombre}! Tu respuesta fue enviada exitosamente.`;
      form.reset();
      showSlide(0);
    } else {
      document.getElementById('form-message').textContent = "❌ Hubo un problema al enviar tu respuesta.";
    }
  } catch (err) {
    document.getElementById('form-message').textContent = "⚠️ Error de conexión con el servidor.";
  }
});