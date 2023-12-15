import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Chart from 'chart.js/auto';

function App() {
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    // Ruta del archivo CSV en la carpeta 'public'
    const csvFilePath = process.env.PUBLIC_URL + '/ingresos.csv';

    // Leer el archivo CSV utilizando PapaParse
    Papa.parse(csvFilePath, {
      download: true,
      header: true,
      complete: (result) => {
        setCsvData(result.data);

        // Llamar a la función para crear la gráfica después de cargar los datos
        createChart(result.data);
      },
      error: (error) => {
        console.error('Error al leer el archivo CSV:', error);
      },
    });
  }, []);

  const createChart = (data) => {
    // Obtener fechas y montos para la gráfica
    const dates = data.map((row) => row.Fecha);
    const amounts = data.map((row) => row.Monto);

    // Configurar el contexto del lienzo
    const ctx = document.getElementById('myChart').getContext('2d');

    // Crear la gráfica de barras
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: dates,
        datasets: [{
          label: 'Ingresos',
          data: amounts,
          backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color de fondo de las barras
          borderColor: 'rgba(75, 192, 192, 1)', // Color del borde de las barras
          borderWidth: 1,
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  return (
    <div>
      <h1>Contenido del CSV</h1>
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Concepto</th>
            <th>Monto</th>
          </tr>
        </thead>
        <tbody>
          {csvData.map((row, index) => (
            <tr key={index}>
              <td>{row.Fecha}</td>
              <td>{row.Concepto}</td>
              <td>{row.Monto}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Agregar un lienzo para la gráfica */}
      <canvas id="myChart" width="400" height="200"></canvas>
    </div>
  );
}

export default App;
