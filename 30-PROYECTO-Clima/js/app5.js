// Vamos a mostrar la información en el HTML

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
  console.log("Consultando API...");

  const API_key = "0e8b3f0b7b9e3a433119f371ec0cd51c";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${API_key}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.cod === "404") {
        mostrarError("Ciudad no encontrada");
        // Ponemos un else para llamar a la función que pinte la información,
        // o un return y la llamamos fuera.
        return;
      }
      // Lamamos a una función
      mostrarClima(data);
    });
}

// Función que pinte el HTML
function mostrarClima(clima) {
  console.log("pintando HTML...");

  // Hacemos destructuring
  const {
    main: { temp, temp_max, temp_min },
  } = clima;

  console.log(temp);

  // Convertimos a grados centigrados
  const temperatura = temp - 273.15;
  console.log(temperatura);

  // La imprimimos
  const actual = document.createElement("p");
  actual.innerHTML = `${temperatura} &#8451;`;
  actual.classList.add("font-bold", "text-6xl");

  const resultadoDiv = document.createElement("div");
  resultadoDiv.classList.add("text-center", "text-white");
  resultadoDiv.appendChild(actual);

  resultado.appendChild(resultadoDiv);
}

// Vemos que por un lado sale con muchos decimales, y por otro si seleccionamos
// varias ciudades se repite.. tenemos que hacer una función limpiarHTML
