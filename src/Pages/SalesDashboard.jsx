import { Chart } from "react-google-charts";
import { Dropdown } from "flowbite-react";
import { useState, useEffect } from "react";

const data = [
  ["Fecha", "Ingreso Neto", "Gastos", "Costo Aproximado", "Margen Bruto"],
  ["2024-07-12 14:46:12", 1000, 400, 200, 600],
  ["2024-07-13 14:46:12", 1170, 460, 250, 200],
  ["2024-07-14 14:46:12", 660, 1120, 300, 400],
  ["2024-07-15 14:46:12", 1030, 540, 350, 150],
  // Más datos repetidos
];

export default function SalesDashboard() {
  const [barChartData, setBarChartData] = useState(data);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedMonth, setSelectedMonth] = useState({
    value: 0,
    label: "Todos",
  });
  const [barChartOptions, setBarChartOptions] = useState({
    title: "Resumen Punto de Venta " + selectedMonth.label + " de " + selectedYear,
    hAxis: {
      title: "Meses",
    },
    vAxis: {
      title: "Monto (S/.)",
      slantedText: true, // Habilitar el texto inclinado
      slantedTextAngle: 45, // Ángulo de inclinación
      textStyle: {
        fontSize: 12, // Ajusta el tamaño de las etiquetas
      },
    },
    seriesType: "bars",
    series: { 3: { type: "area", pointShape: "circle", pointsVisible: true    } },
  });

  useEffect(() => {
    setBarChartOptions( (preBarChartOptions) => ({
      ...preBarChartOptions,
      title: "Resumen Punto de Venta " + (selectedMonth.value ? selectedMonth.label : "" ) + " de " + selectedYear,
      hAxis: {
        title: selectedMonth.value ? selectedMonth.label : "Meses",
      },
    }));
  }, [selectedMonth, selectedYear]);

  return (
    <div className="m-20">
      <div className="mt-20">
        <h1 className="font-black text-5xl text-center mb-5 dark:text-white">
          Dashboard del Punto de Venta
        </h1>
      </div>
      <div className="my-2 flex" >
        <div className="mr-3">
          <Dropdown label={`Año: ${selectedYear}`}>
            <Dropdown.Item onClick={() => setSelectedYear(2024)}>2024</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedYear(2023)}>2023</Dropdown.Item>
          </Dropdown>
        </div>
        <div className="mr-3">
          <Dropdown label={`Mes: ${selectedMonth.label}`} >
            <Dropdown.Item onClick={() => setSelectedMonth({value: 0, label: "Todos"})}>Todos</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedMonth({value: 1, label: "Enero"})}>Enero</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedMonth({value: 2, label: "Febrero"})}>Febrero</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedMonth({value: 3, label: "Marzo"})}>Marzo</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedMonth({value: 4, label: "Abril"})}>Abril</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedMonth({value: 5, label: "Mayo"})}>Mayo</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedMonth({value: 6, label: "Junio"})}>Junio</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedMonth({value: 7, label: "Julio"})}>Julio</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedMonth({value: 8, label: "Agosto"})}>Agosto</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedMonth({value: 9, label: "Septiembre"})}>Septiembre</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedMonth({value: 10, label: "Octubre"})}>Octubre</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedMonth({value: 11, label: "Noviembre"})}>Noviembre</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedMonth({value: 12, label: "Diciembre"})}>Diciembre</Dropdown.Item>
          </Dropdown>
        </div>
      </div>
      <Chart
        chartType="ComboChart"
        width="100%"
        height="400px"
        data={barChartData}
        options={barChartOptions}
      />
    </div>
  );
}
