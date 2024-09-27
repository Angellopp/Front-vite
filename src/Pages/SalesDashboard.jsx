import { Chart } from "react-google-charts";

const data = [
  ["Fecha", "Ingreso Neto", "Gastos", "Costo Aproximado"],
  ["2024-07-12 14:46:12", 1000, 400, 200],
  ["2024-07-13 14:46:12", 1170, 460, 250],
  ["2024-07-14 14:46:12", 660, 1120, 300],
  ["2024-07-15 14:46:12", 1030, 540, 350],
  // Más datos repetidos
];

const barChartOptions = {
  chart: {
    title: "Resumen Punto de Venta",
    subtitle: "Ingresos, Gastos y Costo Aproximado",
  },
  hAxis: {
    title: "Valor",
  },
  vAxis: {
    title: "Fecha",
    slantedText: true, // Habilitar el texto inclinado
    slantedTextAngle: 45, // Ángulo de inclinación
    textStyle: {
      fontSize: 12, // Ajusta el tamaño de las etiquetas
    },
  },
  bars: "horizontal", // Barras horizontales
};

const data2 = [
  ["Fecha", "Valor"],
  ["2024-01-01", 100],
  ["2024-02-01", 200],
  ["2024-03-01", 150],
  ["2024-04-01", 300],
];

const columnChartOptions = {
  chart: {
    title: "Ejemplo de gráfico de columnas",
  },
  hAxis: {
    title: "Fechas",
    slantedText: true,
    slantedTextAngle: 90, // Rota las etiquetas del eje X a 90°
    textStyle: {
      fontSize: 12,
    },
  },
  vAxis: {
    title: "Valores",
  },
};

export default function SalesDashboard() {
  return (
    <div className="m-20">
      <div className="mt-20">
        <h1 className="font-black text-5xl text-center mb-10 dark:text-white">
          Dashboard del Punto de Venta
        </h1>
      </div>
      <Chart
        chartType="Bar"
        width="100%"
        height="400px"
        data={data}
        options={barChartOptions}
      />
      <Chart
        chartType="ColumnChart"
        width="100%"
        height="400px"
        data={data2}
        options={columnChartOptions}
      />
    </div>
  );
}
