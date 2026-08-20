# Weather Intelligence

A modern, responsive weather dashboard application that provides intelligent forecasts and actionable operational planning insights. Built with React, Vite, and Tailwind CSS.

## Features

- **City Search**: Fast and accurate city search using the Open-Meteo Geocoding API.
- **Current Weather**: Real-time display of temperature, wind speed, and weather conditions with intuitive iconography.
- **7-Day Forecast**: A sleek, high-density grid showing temperature highs and lows for the upcoming week.
- **Temperature Trends**: Interactive area charts visualizing the weekly temperature trends (built with Recharts).
- **Intelligence Insights**: A smart client-side recommendation engine that analyzes current conditions to offer practical planning advice (e.g., UV alerts, outdoor work suitability).
- **High-Density Design**: A professional, dashboard-style layout optimized for both desktop and mobile viewing.

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Charts**: Recharts
- **APIs**: [Open-Meteo](https://open-meteo.com/) (No API keys required)

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd weather-intelligence
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the local URL provided by Vite (usually `http://localhost:3000` or `http://localhost:5173`).

### Building for Production

To create a production-ready build:

```bash
npm run build
```

The compiled assets will be generated in the `dist` directory.

## License

This project is licensed under the MIT License.
