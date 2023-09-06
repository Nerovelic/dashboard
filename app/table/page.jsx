// This code exports a React component function called `Table` with properties such as `percentFat`, `fatMass`, `boneMass`, etc.
// These props are used to display data in a table.
export default function Table({
  porcentajeGrasa,
  fatMass,
  boneMass,
  PercentageOsea,
  residualMass,
  PercentResidual,
  muscleMass,
  MusclePercentage,
}) {
  // This code returns a table with body composition data, including percentages and kilograms for fat mass, bone mass, residual mass and muscle mass.
  return (
    <div>
      <h1 className="text-center text-white text-3xl mb-4">Tabla</h1>
      <div className="border border-gray-300 rounded-md overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200 text-center text-gray-700">
              <th className="py-2 px-4">Componente</th>
              <th className="py-2 px-4">%</th>
              <th className="py-2 px-4">kg</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="py-2 px-4 font-semibold">Masa Grasa</td>
              <td className="py-2 px-4">{porcentajeGrasa.toFixed(3)}%</td>
              <td className="py-2 px-4">{fatMass.toFixed(3)} kg</td>
            </tr>
            <tr className="text-center">
              <td className="py-2 px-4 font-semibold">Masa Osea</td>
              <td className="py-2 px-4">{PercentageOsea.toFixed(3)}%</td>
              <td className="py-2 px-4">{boneMass.toFixed(3)} kg</td>
            </tr>
            <tr className="text-center">
              <td className="py-2 px-4 font-semibold">Masa Residual</td>
              <td className="py-2 px-4">{PercentResidual.toFixed(2)}%</td>
              <td className="py-2 px-4">{residualMass.toFixed(3)} kg</td>
            </tr>
            <tr className="text-center">
              <td className="py-2 px-4 font-semibold">Masa Muscular</td>
              <td className="py-2 px-4">{MusclePercentage.toFixed(3)}%</td>
              <td className="py-2 px-4">{muscleMass.toFixed(3)} kg</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
