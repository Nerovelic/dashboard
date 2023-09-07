// This code exports a React component function called `Table` with properties such as `percentFat`, `fatMass`, `boneMass`, etc.
// These props are used to display data in a table.
export default function Table({
  percentageFatCorporal,
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
              <td className="py-2 px-4">
                {typeof percentageFatCorporal === "number"
                  ? percentageFatCorporal.toFixed(3) + "%"
                  : "N/A"}
              </td>
              <td className="py-2 px-4">
                {typeof fatMass === "number"
                  ? fatMass.toFixed(3) + "kg"
                  : "N/A"}
              </td>
            </tr>
            <tr className="text-center">
              <td className="py-2 px-4 font-semibold">Masa Osea</td>
              <td className="py-2 px-4">
                {typeof PercentageOsea === "number"
                  ? PercentageOsea.toFixed(3) + "%"
                  : "N/A"}
              </td>
              <td className="py-2 px-4">
                {typeof boneMass === "number"
                  ? boneMass.toFixed(3) + "kg"
                  : "N/A"}
              </td>
            </tr>
            <tr className="text-center">
              <td className="py-2 px-4 font-semibold">Masa Residual</td>
              <td className="py-2 px-4">
                {typeof PercentResidual === "number"
                  ? PercentResidual.toFixed(3) + "%"
                  : "N/A"}
              </td>
              <td className="py-2 px-4">
                {typeof residualMass === "number"
                  ? residualMass.toFixed(3) + "kg"
                  : "N/A"}
              </td>
            </tr>
            <tr className="text-center">
              <td className="py-2 px-4 font-semibold">Masa Muscular</td>
              <td className="py-2 px-4">
                {typeof MusclePercentage === "number"
                  ? MusclePercentage.toFixed(3) + "%"
                  : "N/A"}
              </td>
              <td className="py-2 px-4">
                {typeof muscleMass === "number"
                  ? muscleMass.toFixed(3) + "kg"
                  : "N/A"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
