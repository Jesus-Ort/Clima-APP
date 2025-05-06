<template>
  <div class="min-h-screen bg-gray-900 p-8 flex flex-col items-center">
    <div :class="`p-8 flex flex-col items-center bg-gradient-to-br text-white ${bgClass} rounded-xl`">
      <h1 class="text-3xl font-bold mb-6">Consulta del Clima</h1>

    <input
      v-model="city"
      @keyup.enter="searchClick"
      type="text"
      placeholder="Ingresa una ciudad..."
      class="p-2 placeholder:text-white border rounded shadow w-64 mb-6"
    />

    <p class="text-2xs mb-6 text-center ">Ejemplo: Madrid, ES</p>

    <button @click="searchClick" class=" border bg-blue-700 text-white px-4 py-2 rounded shadow transition-all hover:scale-110">
      Buscar
    </button>

    <div v-if="weather" class="capitalize mt-6 bg-white text-black p-4 rounded shadow text-center w-64">
      <h2 class="text-xl font-semibold mb-2">{{ weather.name }} {{ weather.sys.country }}</h2>
      <img :src="imagen.url" :alt="imagen.alt">
      <p>Temperatura: {{ weather.main.temp }}°C</p>
      <p>Longitud: {{ weather.coord.lon }}</p>
      <p>Latitud: {{ weather.coord.lat }}</p>
      <p>Humedad: {{ weather.main.humidity }}%</p>
      <p>Velocidad del viento: {{ weather.wind.speed }} m/s</p>
      <p>Dirección del viento: {{ weather.wind.deg }}°</p>
      <p>Descripción: {{ weather.weather[0].description }}</p>
      <img
    :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`"
    :alt="weather.weather[0].description"
    class="mx-auto mt-4 bg-gray-400 rounded"
  />
    </div>

    <div v-if="error1" class="text-red-600 mt-4">
      {{ error1 }}
    </div>
    <div v-if="error2" class="text-red-600 mt-4">
      {{ error2 }}
    </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const city = ref('')
const weather = ref(null)
const imagen = ref(null)
const error1 = ref('')
const error2 = ref('')

const fetchWeather = async () => {
  error1.value = ''
  try {
    const res = await fetch(`http://localhost:3000/api/weather/${city.value}`)
    if (!res.ok) throw new Error('Clima de la ciudad no encontrado')
    weather.value = await res.json()
  } catch (err) {
    error1.value = err.message
  }
}

const fetchCity = async () => {
  error2.value = ''
  try {
    const res = await fetch(`http://localhost:3000/api/city/${city.value}`)
    if (!res.ok) throw new Error('Imagen de la ciudad no encontrada')
    imagen.value = await res.json()

  } catch (err) {
    error2.value = err.message
  }
}

const searchClick = ()=>{
  console.log("Boton presionao", city.value)
  fetchCity()
  fetchWeather()
}
const bgClass = computed(() => {
  if (!weather.value) return 'bg-blue-800'
  const icon = weather.value.weather[0].icon

  if (icon.startsWith('01')) return 'bg-yellow-700'
  if (icon.startsWith('02') || icon.startsWith('03') || icon.startsWith('04')) return 'bg-gray-600'
  if (icon.startsWith('09') || icon.startsWith('10')) return 'bg-blue-600'
  if (icon.startsWith('11')) return 'bg-indigo-900'
  if (icon.startsWith('13')) return 'bg-blue-500'
  if (icon.startsWith('50')) return 'bg-gray-500'

  return 'bg-blue-800'
})


</script>