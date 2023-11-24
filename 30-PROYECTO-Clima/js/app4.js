// Vemos ahora como comunicarnos con la API....

// API- http://api.openweathermap.org
// 0e8b3f0b7b9e3a433119f371ec0cd51c

const container = document.querySelector(".container");
const formulario = document.querySelector("#formulario");
const resultado = document.querySelector("#resultado");

window.addEventListener("load", () => {
  formulario.addEventListener("submit", buscarClima);
});

function buscarClima(e) {
  e.preventDefault();

  // Validar

  const ciudad = document.querySelector("#ciudad").value;
  const pais = document.querySelector("#pais").value;

  if (ciudad === "" || pais === "") {
    mostrarError("Ambos campos son obligatorios...");
    return;
  }

  // Si pasa la validación, llamamos a la API
  // Vamos a hacernos una función..
  consultarAPI(ciudad, pais);
}

function mostrarError(mensaje) {
  const alertaExist = document.querySelector(".bg-red-100");

  if (!alertaExist) {
    const alerta = document.createElement("div");
    alerta.classList.add(
      "bg-red-100",
      "border-red-400",
      "text-red-700",
      "px-4",
      "py-3",
      "rounded",
      "max-w-md",
      "mx-auto",
      "mt-5",
      "text-center",
    );
    alerta.innerHTML = `
    <strong class='font-bold'>Error</strong>
    <span class='block'>${mensaje}</span>
    `;
    container.appendChild(alerta);

    setTimeout(() => {
      alerta.remove();
    }, 2000);
  }
}

// Declaramos la función
function consultarAPI(ciudad, pais) {
  console.log("Consultando API...");

  // Guardamos el id en una variable
  const API_key = "0e8b3f0b7b9e3a433119f371ec0cd51c";

  // Miramos como nos pide la API que hagamos la llamada - Current Weather Data
  // https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid={API key}

  // Construimos la url dinámica
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${API_key}`;

  // Hacemos la llamada
  fetch(url)
    .then((res) => res.json())
    .then((data) => console.log(data));
  // En main vemos la temperatura, está en grados kelvin (luego los convertimos)

  // Si ponemos una ciudad que no existe, nos da error, pero no cae el catch, porque
  // catch es para cuando la promise no se cumple. En ese caso si se cumple,
  // pero simplemente la consulta da error, tenemos por tanto que controlar eso.

  // fetch(url)
  //   .then((res) => res.json())
  //   .then((data) => {
  //     if (data.cod === '404') {
  //       mostrarError('Ciudad no encontrada')
  //     }
  //     console.log(data)
  //   })
}

// Ahora tenemos que mostrar la información en el HTML
