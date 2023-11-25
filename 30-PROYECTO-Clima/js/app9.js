// Vamos a mostrar algo mientras se está haciendo la llamada a la API, cargando...
// Usarenmos: https://tobiasahlin.com/spinkit/

const container = document.querySelector(".container")
const formulario = document.querySelector("#formulario")
const resultado = document.querySelector("#resultado")

window.addEventListener("load", () => {
  formulario.addEventListener("submit", buscarClima)
  mostrarHistorial()
  insertarMapa()
})

function buscarClima(e) {
  e.preventDefault()

  const ciudad = document.querySelector("#ciudad").value
  const pais = document.querySelector("#pais").value

  if (ciudad === "" || pais === "") {
    mostrarError("Ambos campos son obligatorios...")
    return
  }

  consultarAPI_temperatura(ciudad, pais)
  guardarHistorial(ciudad, pais)
}

function mostrarError(mensaje) {
  const alertaExist = document.querySelector(".bg-red-100")

  if (!alertaExist) {
    const alerta = document.createElement("div")
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
    `
    container.appendChild(alerta)

    setTimeout(() => {
      alerta.remove()
    }, 2000)
  }

  mostrarHistorial()
}

function consultarAPI_temperatura(ciudad, pais) {
  const API_key = "0e8b3f0b7b9e3a433119f371ec0cd51c"
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${API_key}`

  mostrarSpinner() // Mostramos el spinner

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      limpiarHTML()

      if (data.cod === "404") {
        mostrarError("Ciudad no encontrada")
        return
      }

      mostrarClima(data)
      mostrarHistorial()
      widgetClima(data.id)
    })
}

function mostrarClima(clima) {
  const {
    name,
    main: { temp, temp_max, temp_min },
    id
  } = clima

  const temperatura = kelvintoCentigrados(temp)
  const max = kelvintoCentigrados(temp_max)
  const min = kelvintoCentigrados(temp_min)

  const nombreCiudad = document.createElement("p")
  // nombreCiudad.textContent = `Clima en ${name}`
  // nombreCiudad.classList.add("font-bold", "text-2xl")

  const actual = document.createElement("p")
  actual.innerHTML = `${temperatura} &#8451;`
  actual.classList.add("font-bold", "text-6xl")

  const tempMaxima = document.createElement("p")
  tempMaxima.innerHTML = `Max: ${max} &#8451;`
  tempMaxima.classList.add("text-xl")

  const tempMinima = document.createElement("p")
  tempMinima.innerHTML = `Min: ${min} &#8451;`
  tempMinima.classList.add("text-xl")

  const resultadoDiv = document.createElement("div")
  resultadoDiv.classList.add("text-center", "text-white")
  resultadoDiv.appendChild(nombreCiudad)
  resultadoDiv.appendChild(actual)
  resultadoDiv.appendChild(tempMaxima)
  resultadoDiv.appendChild(tempMinima)

  resultado.appendChild(resultadoDiv)

  actualizarColorFondo(temperatura)
  
  if (id) {
    widgetClima(id)
  }
}

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild)
  }
}

const kelvintoCentigrados = (grados) => parseInt(grados - 273.15)

// Definimos la función para mostrar un spinner
function mostrarSpinner() {
  limpiarHTML()

  const divSpinner = document.createElement("div")
  divSpinner.classList.add("sk-fading-circle")

  divSpinner.innerHTML = `
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
  `
  resultado.appendChild(divSpinner)
}

// Función que almacena el historial de búsqueda
function guardarHistorial(ciudad, pais) {
  const historial = JSON.parse(localStorage.getItem("historial")) || []
  const nuevaBusqueda = { ciudad, pais }

  // Evitar resultados duplicados en el historial
  if (!historial.some(item => item.ciudad === nuevaBusqueda.ciudad && item.pais === nuevaBusqueda.pais)) {
    historial.unshift(nuevaBusqueda);
    localStorage.setItem("historial", JSON.stringify(historial));
  }

  mostrarHistorial()
}

// Función que recupera y muestra el historial de búsquedas
function mostrarHistorial() {
  const historial = JSON.parse(localStorage.getItem("historial")) || []
  const historialContainer = document.createElement("div")
  historialContainer.id = "historial-container"
  historialContainer.innerHTML = ""

  // Comprueba si hay elementos en el historial
  if (historial.length === 0) {
    const mensaje = document.createElement("p")
    mensaje.textContent = "No hay historial de búsquedas"
    historialContainer.appendChild(mensaje)
  } else {
    // Itera sobre el historial y crea elementos para cada búsqueda
    historial.forEach((item) => {
      const enlace = document.createElement("a")
      enlace.href = "#"
      enlace.textContent = `${item.ciudad}, ${item.pais}`
      enlace.addEventListener("click", () => {
        // Lógica para realizar una nueva búsqueda basada en el historial
        const ciudadPais = item.ciudad + "," + item.pais
        document.querySelector("#ciudad").value = item.ciudad
        document.querySelector("#pais").value = item.pais
        consultarAPI_temperatura(item.ciudad, item.pais)
      });

      const historialItem = document.createElement("div")
      historialItem.classList.add("historial-item")
      historialItem.appendChild(enlace)

      historialContainer.appendChild(historialItem)
    })
  }
  const resultado = document.querySelector("#resultado")
  resultado.appendChild(historialContainer)
}

// Cambia el color del fondo de la web en función de la temperatura
function actualizarColorFondo(temperatura) {
  const html = document.querySelector("html")

  html.classList.remove("muy-frio", "frio", "templado", "calido", "muy-calido")

  if (temperatura <= 0) {
    html.classList.add("muy-frio")
  } else if (temperatura >= 1 && temperatura <= 9) {
    html.classList.add("frio")
  } else if (temperatura >= 10 && temperatura <= 19) {
    html.classList.add("templado")
  } else if (temperatura >= 20 && temperatura <= 26) {
    html.classList.add("calido")
  } else if (temperatura >= 27) {
    html.classList.add("muy-calido")
  }
}

let widgetContainer = null; // Variable global para almacenar el contenedor actual

function widgetClima(cityID) {
  // Crear un nuevo contenedor y script
  const newContainer = document.createElement("div")
  const newScript = document.createElement("script")
  
  newContainer.id = "openweathermap-widget-container"
  newScript.async = true
  newScript.charset = "utf-8"
  newScript.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js"

  // Eliminar el contenedor y script anteriores si existen
  if (widgetContainer) {
    document.body.removeChild(widgetContainer)
  }

  // Agregar el nuevo contenedor y script al cuerpo del documento
  document.body.appendChild(newContainer)
  newContainer.appendChild(newScript)

  // Configurar parámetros del widget
  window.myWidgetParam = window.myWidgetParam || []
  window.myWidgetParam.push({
    id: 15,
    cityid: cityID,
    appid: "0e8b3f0b7b9e3a433119f371ec0cd51c",
    units: "metric",
    containerid: "openweathermap-widget-container",
  })

  widgetContainer = newContainer
}

function insertarMapa() {
  const weatherMapDiv = document.getElementById("weatherMap")

  const iframe = document.createElement("iframe")
  iframe.src = "https://openweathermap.org/weathermap?basemap=map&cities=false&layer=temperature&lat=40&lon=-3&zoom=5"
  iframe.width = "660vw"
  iframe.height = "440vh"

  weatherMapDiv.innerHTML = ""
  weatherMapDiv.appendChild(iframe)
}