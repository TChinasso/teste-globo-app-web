// Vuetify
import 'vuetify/styles'
import { createVuetify, type ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'


const myCustomLightTheme: ThemeDefinition = {
  dark: true,  // Enable dark mode
  colors: {
    background: '#121212', // Dark background
    surface: '#1e1e1e', // Surface color (cards, sheets, etc.)
    primary: '#FF7C00', // Custom primary color (e.g., light purple)
    secondary: '#ff9800', // Custom secondary color (e.g., teal)
    accent: '#ff4081', // Accent color
    error: '#cf6679',  // Error color
    info: '#2196f3',   // Info color
    success: '#4caf50', // Success color
    warning: '#ff9800', // Warning color
  },
}



export const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomLightTheme
    }
  }
})
