import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { chartsService } from '@/services/charts.service'

export const useChartStore = defineStore('chart', () => {
  const charts = ref<any>({})
  async function getCharts() {
    try {
      const { data } = await chartsService.getCharts()
      charts.value = data
      Promise.resolve()
    } catch (error: any) {
      Promise.reject(error)
    }
  }

  return { getCharts, charts }
})
