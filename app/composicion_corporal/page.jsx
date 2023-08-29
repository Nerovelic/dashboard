"use client";
import React, { useState } from "react";

export default function Composicion() {
  const [genero, setGenero] = useState("");
  const [tricep, setTricep] = useState("");
  const [bicep, setBicep] = useState("");
  const [subescapular, setSubescapular] = useState("");
  const [suprailiaco, setSuprailiaco] = useState("");
  const [biestiloideo, setBiestiloideo] = useState("");
  const [femur, setFemur] = useState("");
  const [resultado, setResultado] = useState(null);
  const [resultado2, setResultado2] = useState(null);
  const [masaOsea, setMasaOsea] = useState(null);
  const [masaResidual, setMasaResidual] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      genero &&
      tricep &&
      bicep &&
      subescapular &&
      suprailiaco &&
      biestiloideo &&
      femur
    ) {
      const log10 =
        Math.log10(
          parseFloat(tricep) +
            parseFloat(bicep) +
            parseFloat(subescapular) +
            parseFloat(suprailiaco)
        ) || 0;

      let DC;

      if (genero === "hombre") {
        DC = 1.1765 - 0.0744 * log10;
      } else if (genero === "mujer") {
        DC = 1.1567 - 0.0717 * log10;
      }

      const porcentajeGrasaCorporal = 495 / DC - 450;
      const DencidadCorporal = DC;
      setResultado(porcentajeGrasaCorporal);
      setResultado2(DencidadCorporal);

      const masaOseaCalculation =
        Math.pow(DencidadCorporal ** 2 * femur * biestiloideo * 400, 0.712) *
        3.02;
      setMasaOsea(masaOseaCalculation);

      const peso = parseFloat(biestiloideo) + parseFloat(femur);
      const masaResidualH = 24 / peso;
      const masaResidualM = 21 / peso;
      setMasaResidual(genero === "hombre" ? masaResidualH : masaResidualM);
    } else {
      setResultado(null);
      setResultado2(null);
      setMasaOsea(null);
      setMasaResidual(null);
    }
  };

  const handlePositiveInputChange = (value, setValue) => {
    if (value >= 0) {
      setValue(value);
    }
  };

  return (
    <div className="bg-primary h-screen w-screen grid place-items-center pt-8">
      <div className="bg-[#ffffff8c] p-10 rounded-lg shadow-md text-center grid gap-5">
        <h1 className="text-center mt-2">Composición Corporal</h1>
        <form className="grid gap-5 mt-10" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-5">
            <label>
              Género:
              <select
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
                className="ml-2"
              >
                <option value="">Seleccionar</option>
                <option value="hombre">Hombre</option>
                <option value="mujer">Mujer</option>
              </select>
            </label>
            <label>
              Peso:
              <input type="text" className="ml-2" />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <label>
              Talla:
              <input type="text" className="ml-2" />
            </label>
            <label>
              Edad:
              <input type="text" className="ml-2" />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <label>
              Bíceps:
              <input
                type="number"
                className="ml-2"
                value={bicep}
                onChange={(e) =>
                  handlePositiveInputChange(
                    parseFloat(e.target.value),
                    setBicep
                  )
                }
              />
            </label>
            <label>
              Tríceps:
              <input
                type="number"
                className="ml-2"
                value={tricep}
                onChange={(e) =>
                  handlePositiveInputChange(
                    parseFloat(e.target.value),
                    setTricep
                  )
                }
              />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <label>
              Subescapular:
              <input
                type="number"
                className="ml-2"
                value={subescapular}
                onChange={(e) =>
                  handlePositiveInputChange(
                    parseFloat(e.target.value),
                    setSubescapular
                  )
                }
              />
            </label>
            <label>
              Cresta ileal:
              <input
                type="number"
                className="ml-2"
                value={suprailiaco}
                onChange={(e) =>
                  handlePositiveInputChange(
                    parseFloat(e.target.value),
                    setSuprailiaco
                  )
                }
              />
            </label>

            <label>
              Biestiloideo:
              <input
                type="number"
                className="ml-2"
                value={biestiloideo}
                onChange={(e) =>
                  handlePositiveInputChange(
                    parseFloat(e.target.value),
                    setBiestiloideo
                  )
                }
              />
            </label>
            <label>
              Femur:
              <input
                type="number"
                className="ml-2"
                value={femur}
                onChange={(e) =>
                  handlePositiveInputChange(
                    parseFloat(e.target.value),
                    setFemur
                  )
                }
              />
            </label>
          </div>
          <button
            type="submit"
            className="bg-tertiary text-black border-4 cursor-pointer mt-5 py-1 px-3"
          >
            Calcular
          </button>
        </form>

        {resultado !== null &&
          resultado2 !== null &&
          masaOsea !== null &&
          masaResidual !== null && (
            <div className="mt-5">
              <p>Porcentaje de Grasa Corporal: {resultado.toFixed(3)}%</p>
              <p>Densidad Corporal: {resultado2.toFixed(3)}</p>
              <p>Masa Ósea: {(masaOsea * 0.01).toFixed(3)} kg</p>
              <p>Masa Residual: {(masaResidual).toFixed(3)} kg</p>
            </div>
          )}
      </div>
    </div>
  );
}
