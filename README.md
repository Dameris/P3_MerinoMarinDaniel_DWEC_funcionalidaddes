# P3_MerinoMarinDaniel_DWEC_funcionalidaddes

#### Funcionalidades añadidas
1. Historial de busqueda  
    Se añaden 2 funciones para realizar el historial de búsqueda:
    - `guardarHistorial(ciudad, pais)`  
        Se encarga de recibir el nombre de la ciudad (junto con su país), para guardarlo en `LocalStorage`.  
        Controla que no se almacenen ciudades repetidas en el historial.
    - `mostrarHistorial()`  
        Su función es crear un contenedor para mostrar el historial.  
        Las ciudades que se almacenan en el historial son clicables y te mustran esa ciudad sin tener que buscarla manualmente.

2. Cambio de color del fondo  
    Se añade la función `actualizarColorFondo(temperatura)` que se encarga de cambiar el color del fondo en función de la temperatura de la ciudad.  

3. Widget de OpenWeatherMap  
    Se incorporá la función `widgetClima(cityID)` que recide el ID de la ciudad buscada, y muestra los datos del clima mediante un widget de la API de OpenWeatherMap.  

4. Mapa global desplazable  
    Se muestra un mapa global desplazable, obtenido de OpenWeatherMap, en la función `insertarMapa()`.  
    En este mapa se puede ver la temperatura, la velocidad del viento, etc. de una forma más visual.
