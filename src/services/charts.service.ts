import axiosInstance from "@/plugins/axios";

export const chartsService = {
  async getCharts() {
    return axiosInstance.get('/charts')
  },
}
