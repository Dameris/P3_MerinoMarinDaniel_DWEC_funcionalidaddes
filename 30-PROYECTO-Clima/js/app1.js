// API- http://api.openweathermap.org
// 0e8b3f0b7b9e3a433119f371ec0cd51c

// Seleccionamos los elementos que vamos a necesitar
const container = document.querySelector(".container");
const formulario = document.querySelector("#formulario");
const resultado = document.querySelector("#resultado");

// Ponemos el listener...
window.addEventListener("load", () => {
  formulario.addEventListener("submit", buscarClima);
});

// Declaramos la función que se dispara al hacer click en el botón
function buscarClima(e) {
  e.preventDefault();
  console.log("climaaaaaaaaaaaa");

  // Validar

  // Si pasa la validación, llamamos a la API
}
