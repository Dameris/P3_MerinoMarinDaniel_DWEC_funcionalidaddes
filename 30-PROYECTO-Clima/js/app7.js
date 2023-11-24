// Vamos a mostrar mas información de la API, temperatura máxima y mínima

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

  // Usando el helper, guardamos los valores mínimo y mínimo en variables.
  const temperatura = kelvintoCentigrados(temp);
  const max = kelvintoCentigrados(temp_max);
  const min = kelvintoCentigrados(temp_min); 
  
  // Ahora, DOM scripting...

  const actual = document.createElement("p");
  actual.innerHTML = `${temperatura} &#8451;`;
  actual.classList.add("font-bold", "text-6xl");

  // Temperatura máxima...
  const tempMaxima = document.createElement("p");
  tempMaxima.innerHTML = `Max: ${max} &#8451;`;
  tempMaxima.classList.add("text-xl");

  // Temperatura mínima...
  const tempMinima = document.createElement("p");
  tempMinima.innerHTML = `Min: ${min} &#8451;`;
  tempMinima.classList.add("text-xl");

  const resultadoDiv = document.createElement("div");
  resultadoDiv.classList.add("text-center", "text-white");
  resultadoDiv.appendChild(actual);
  resultadoDiv.appendChild(tempMaxima); // Añadimos la temperatura máxima
  resultadoDiv.appendChild(tempMinima); // Añadimos la temperatura mínima

  resultado.appendChild(resultadoDiv);
}

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

const kelvintoCentigrados = (grados) => parseInt(grados - 273.15);

// Estaría bien imprimir el nombre de la ciudad...
