// Vamos a imprimir el nombre de la ciudad

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
      console.log(data);
      // Vemos que el nombre de la ciudad viene de vuelta de la API, name
      // Podemos extraerlo en nuestro destructuring
      limpiarHTML();

      if (data.cod === "404") {
        mostrarError("Ciudad no encontrada");
        return;
      }

      mostrarClima(data);
    });
}

function mostrarClima(clima) {
  // Extraemos el campo name
  const {
    name,
    main: { temp, temp_max, temp_min },
  } = clima;

  const temperatura = kelvintoCentigrados(temp);
  const max = kelvintoCentigrados(temp_max);
  const min = kelvintoCentigrados(temp_min);

  // Nombre de la ciudad
  const nombreCiudad = document.createElement("p");
  nombreCiudad.textContent = `Clima en ${name}`;
  nombreCiudad.classList.add("font-bold", "text-2xl");

  const actual = document.createElement("p");
  actual.innerHTML = `${temperatura} &#8451;`;
  actual.classList.add("font-bold", "text-6xl");

  const tempMaxima = document.createElement("p");
  tempMaxima.innerHTML = `Max: ${max} &#8451;`;
  tempMaxima.classList.add("text-xl");

  const tempMinima = document.createElement("p");
  tempMinima.innerHTML = `Min: ${min} &#8451;`;
  tempMinima.classList.add("text-xl");

  const resultadoDiv = document.createElement("div");
  resultadoDiv.classList.add("text-center", "text-white");
  resultadoDiv.appendChild(nombreCiudad); // Añadimos el nombre de la ciudad
  resultadoDiv.appendChild(actual);
  resultadoDiv.appendChild(tempMaxima);
  resultadoDiv.appendChild(tempMinima);

  resultado.appendChild(resultadoDiv);
}

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

const kelvintoCentigrados = (grados) => parseInt(grados - 273.15);

// Estaría bien mostrar algo mientras se está haciendo la llamada a la API, cargando...
