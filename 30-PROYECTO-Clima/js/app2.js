// Vamos a validar el formulario antes de mandar la petición a la API

const container = document.querySelector(".container");
const formulario = document.querySelector("#formulario");
const resultado = document.querySelector("#resultado");

window.addEventListener("load", () => {
  formulario.addEventListener("submit", buscarClima);
});

function buscarClima(e) {
  e.preventDefault();

  // Validar

  // Accedemos a los dos campos que tenemos que validar
  const ciudad = document.querySelector("#ciudad").value;
  const pais = document.querySelector("#pais").value;
  // console.log(ciudad)
  // console.log(pais)

  if (ciudad === "" || pais === "") {
    // si hay error...
    mostrarError("Ambos campos son obligatorios...");
  }
  // Si pasa la validación, llamamos a la API
}

function mostrarError(mensaje) {
  console.log(mensaje);

  // Vamos a crear un div para el error

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

  // Ya nos muestra el error, pero vemos que si le damos varias veces se nos repite,
  // podemos comprobar si ya hay una alerta para no mostrar mas...
}
