// Vamos a redondear los decimales, y a hacer una función limpiarHTML

const container = document.querySelector(".container");
const formulario = document.querySelector("#formulario");
const resultado = document.querySelector("#resultado");

window.addEventListener("load", () => {
  formulario.addEventListener("submit", buscarClima);
});

function buscarClima(e) {
  e.preventDefault();

  const ciudad = document.querySelector("#ciudad").value;
  const pais = document.querySelector("#pais").value;

  if (ciudad === "" || pais === "") {
    mostrarError("Ambos campos son obligatorios...");
    return;
  }

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

function consultarAPI(ciudad, pais) {
  const API_key = "0e8b3f0b7b9e3a433119f371ec0cd51c";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${API_key}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // Llamamos a la función limpiarHTML
      limpiarHTML();

      if (data.cod === "404") {
        mostrarError("Ciudad no encontrada");
        return;
      }

      mostrarClima(data);
    });
}

function mostrarClima(clima) {
  const {
    main: { temp, temp_max, temp_min },
  } = clima;

  // Lo pasamos a entero..., como tenemos temp_max y min, mejor hacemos una función
  // const temperatura = temp - 273.15
  const temperatura = kelvintoCentigrados(temp);

  const actual = document.createElement("p");
  actual.innerHTML = `${temperatura} &#8451;`;
  actual.classList.add("font-bold", "text-6xl");

  const resultadoDiv = document.createElement("div");
  resultadoDiv.classList.add("text-center", "text-white");
  resultadoDiv.appendChild(actual);

  resultado.appendChild(resultadoDiv);
}

// Función para limpiar el HTML
function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
  // La podemos llamar antes de que la API nos de la respuesta...
}

// Funcion que pasa a grados centígrados y parsea a entero...

// function kelvintoCentigrados(grados) {
//   return parseInt(grados - 273.15)
// }

// Casi mejor una función de flecha...
const kelvintoCentigrados = (grados) => parseInt(grados - 273.15);
// Personalmente me parece una buena idea hacer estas funciones pequeñas
// que solo hacen algo muy concreto, les llamo "helpers"

// Ahora ya nos faltaría mostrar mas información de la API.
