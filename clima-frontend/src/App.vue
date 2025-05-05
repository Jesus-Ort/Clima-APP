<template>
  <div class="min-h-screen bg-blue-100 p-8 flex flex-col items-center">
    <div :class="`p-8 flex flex-col items-center bg-gradient-to-br ${bgClass}`">
      <h1 class="text-3xl font-bold mb-6">Consulta del Clima</h1>

    <input
      v-model="city"
      @keyup.enter="fetchWeather"
      type="text"
      placeholder="Ingresa una ciudad..."
      class="p-2 rounded shadow w-64 mb-6"
    />

    <p class="text-xl mb-6 text-center ">Ejemplo: Madrid, ES</p>

    <button @click="fetchWeather" class="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">
      Buscar
    </button>

    <div v-if="weather" class="mt-6 bg-white p-4 rounded shadow text-center w-64">
      <h2 class="text-xl font-semibold mb-2">{{ weather.name }} {{ weather.sys.country }}</h2>
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

    <div v-if="error" class="text-red-600 mt-4">
      {{ error }}
    </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const city = ref('')
const weather = ref(null)
const error = ref('')

const fetchWeather = async () => {
  error.value = ''
  try {
    const res = await fetch(`http://localhost:3000/api/weather/${city.value}`)
    if (!res.ok) throw new Error('Ciudad no encontrada')
    weather.value = await res.json()
  } catch (err) {
    error.value = err.message
  }
}

const bgClass = computed(() => {
  if (!weather.value) return 'from-blue-200 to-blue-500'
  const icon = weather.value.weather[0].icon

  if (icon.startsWith('01')) return 'from-yellow-200 to-yellow-500'
  if (icon.startsWith('02') || icon.startsWith('03') || icon.startsWith('04')) return 'from-gray-300 to-gray-500'
  if (icon.startsWith('09') || icon.startsWith('10')) return 'from-blue-400 to-blue-600'
  if (icon.startsWith('11')) return 'from-indigo-800 to-indigo-900'
  if (icon.startsWith('13')) return 'from-white to-blue-100'
  if (icon.startsWith('50')) return 'from-gray-200 to-gray-400'

  return 'from-blue-200 to-blue-500'
})


</script>