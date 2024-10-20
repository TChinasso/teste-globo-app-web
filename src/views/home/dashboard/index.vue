<template>
  <div class="about pt-8">
    <div
      v-if="loadingCharts"
      class="h-full w-full flex flex-col items-center mt-24"
    >
      <v-progress-circular
        color="primary"
        indeterminate
        size="120"
        width="8"
      ></v-progress-circular>
      <h2 class="mt-8 text-2xl font-bold">Carregando dashboard...</h2>
    </div>
    <div v-else class="flex gap-5 flex-col sm:flex-row">
      <LineChart
        class="bg-white sm:w-1/3"
        :chart-data="chartData"
        :options="options"
      />
      <LineChart
        class="bg-white grow sm:w-1/3"
        :chart-data="chartDataMemory"
        :options="options"
      />
      <div class="bg-white grow sm:w-1/3 flex flex-col">
        <div
          :class="`bg-${charts?.machineStatus?.status}`"
          class="grow mt-6 mx-6 rounded-md flex items-center justify-center"
        >
          <span class="text-9xl">OK</span>
        </div>
        <h2 class="mx-auto text-xl my-2">Status da maquina</h2>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { ChartData, ChartOptions } from 'chart.js'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)
import { LineChart } from 'vue-chart-3'
import { useChartStore } from '@/stores/charts'
import { onBeforeMount, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import dayjs from 'dayjs'

const chartStore = useChartStore()
const { charts } = storeToRefs(chartStore)
const cpuInfoData = ref<any>([])
const cpuInfoValues = ref<any>([])
const memoryInfoValues = ref<any>([])
const loadingCharts = ref(false)
onBeforeMount(async () => {
  loadingCharts.value = true
  try {
    await chartStore.getCharts()
    charts.value.cpuInfo.cpuUtilizationSeries.forEach((serie: any) => {
      cpuInfoData.value.push(dayjs(serie.timestamp).format('HH:mm:ss'))
      cpuInfoValues.value.push(serie.cpuUtilization)
    })
    charts.value.memoryInfo.memoryUtilizationSeries.forEach((serie: any) => {
      memoryInfoValues.value.push(serie.memoryUtilization)
    })
  } catch (error) {
    console.error(error)
  }
  loadingCharts.value = false
})

const chartData = ref<ChartData<'line', number[], string>>({
  labels: cpuInfoData.value,
  datasets: [
    {
      label: 'CPU usage %',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      pointBackgroundColor: 'rgba(75, 192, 192, 1)',
      pointBorderColor: '#fff',
      data: cpuInfoValues.value,
      fill: 'start',
    },
  ],
})
const chartDataMemory = ref<ChartData<'line', number[], string>>({
  labels: cpuInfoData.value,
  datasets: [
    {
      label: 'Memory usage %',
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgba(153, 102, 255, 1)',
      pointBackgroundColor: 'rgba(153, 102, 255, 1)',
      pointBorderColor: '#fff',
      data: memoryInfoValues.value,
      fill: 'start',
    },
  ],
})
const options = ref<ChartOptions<'line'>>({
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Timestamp',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Usage %',
      },
      suggestedMin: 0,
      suggestedMax: 100,
    },
  },
})
</script>
<style></style>
