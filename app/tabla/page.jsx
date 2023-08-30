export default function Tabla({
  porcentajeGrasa,
  masaGrasa,
  masaOsea,
  PorcentajeOsea,
  masaResidual,
  PorcentajeResidual,
  masaMuscular,
  PorcentajeMuscular,
}) {
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
              <td className="py-2 px-4">{masaGrasa.toFixed(3)} kg</td>
            </tr>
            <tr className="text-center">
              <td className="py-2 px-4 font-semibold">Masa Osea</td>
              <td className="py-2 px-4">{PorcentajeOsea.toFixed(3)}%</td>
              <td className="py-2 px-4">{masaOsea.toFixed(3)} kg</td>
            </tr>
            <tr className="text-center">
              <td className="py-2 px-4 font-semibold">Masa Residual</td>
              <td className="py-2 px-4">{PorcentajeResidual.toFixed(2)}%</td>
              <td className="py-2 px-4">{masaResidual.toFixed(3)} kg</td>
            </tr>
            <tr className="text-center">
              <td className="py-2 px-4 font-semibold">Masa Muscular</td>
              <td className="py-2 px-4">{PorcentajeMuscular.toFixed(3)}%</td>
              <td className="py-2 px-4">{masaMuscular.toFixed(3)} kg</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
