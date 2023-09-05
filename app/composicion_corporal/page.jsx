"use client";
import React, { useState, useEffect } from "react";
import Table from "../table/page";
import Graph from "../graph/page";

export default function Composicion() {
  const [genero, setGenero] = useState("");
  const [tricep, setTricep] = useState("");
  const [bicep, setBicep] = useState("");
  const [subescapular, setSubescapular] = useState("");
  const [suprailiaco, setSuprailiaco] = useState("");
  const [biestiloideo, setBiestiloideo] = useState("");
  const [femur, setFemur] = useState("");
  const [talla, setTalla] = useState("");
  const [peso, setPeso] = useState("");
  const [edad, setEdad] = useState("");
  const [resultado, setResultado] = useState(null);
  const [resultado2, setResultado2] = useState(null);
  const [masaOsea, setMasaOsea] = useState(null);
  const [masaResidual, setMasaResidual] = useState(null);
  const [masaGrasa, setMasaGrasa] = useState(null);
  const [masaMuscular, setMasaMuscular] = useState(null);
  const [PorcentajeResidual, setMasaResidualPor] = useState(null);
  const [PorcentajeOsea, setMasaOseaPor] = useState(null);
  const [PorcentajeMuscular, setMuscularPor] = useState(null);

  useEffect(() => {
    const storedValues = JSON.parse(
      localStorage.getItem("bodyCompositionValues")
    );
    if (storedValues) {
      setGenero(storedValues.genero || "");
      setTricep(storedValues.tricep || "");
      setBicep(storedValues.bicep || "");
      setSubescapular(storedValues.subescapular || "");
      setSuprailiaco(storedValues.suprailiaco || "");
      setBiestiloideo(storedValues.biestiloideo || "");
      setFemur(storedValues.femur || "");
      setTalla(storedValues.talla || "");
      setPeso(storedValues.peso || "");
      setEdad(storedValues.edad || "");
    }
  }, []);

  useEffect(() => {
    const bodyCompositionValues = {
      genero,
      tricep,
      bicep,
      subescapular,
      suprailiaco,
      biestiloideo,
      femur,
      talla,
      peso,
      edad,
    };
    localStorage.setItem(
      "bodyCompositionValues",
      JSON.stringify(bodyCompositionValues)
    );
  }, [
    genero,
    tricep,
    bicep,
    subescapular,
    suprailiaco,
    biestiloideo,
    femur,
    talla,
    peso,
    edad,
  ]);

  const calculateMasaOsea = () => {
    if (talla && biestiloideo && femur) {
      alturaAlCuadrado = Math.pow(parseFloat(talla), 2);
      const masaOsea =
        Math.pow(
          ((((alturaAlCuadrado * parseFloat(biestiloideo)) / 100) *
            parseFloat(femur)) /
            100) *
            400,
          0.712
        ) * 3.02;
      return masaOsea;
    }
    return null;
  };

  let alturaAlCuadrado = 0;

  const calculateResidualMass = () => {
    if (genero && peso) {
      pesoKilogramos = parseFloat(peso);
      if (genero === "hombre") {
        return 0.24 * pesoKilogramos;
      } else if (genero === "mujer") {
        return 0.21 * pesoKilogramos;
      }
    }
    return null;
  };

  let pesoKilogramos = 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      genero &&
      talla &&
      peso &&
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
      const masaGrasa = (porcentajeGrasaCorporal * peso) / 100;
      const PorcentajeResidual = (calculateResidualMass() * 100) / peso;
      const PorcentajeOsea = (calculateMasaOsea() * 100) / peso;
      const PorcentajeMuscular =
        100 - (porcentajeGrasaCorporal + PorcentajeResidual + PorcentajeOsea);
      const masaMuscular = (PorcentajeMuscular * peso) / 100;
      setMasaGrasa(masaGrasa);
      setResultado(porcentajeGrasaCorporal);
      setResultado2(DC);
      setMasaOsea(calculateMasaOsea());
      setMasaResidual(calculateResidualMass());
      setMasaResidualPor(PorcentajeResidual);
      setMasaOseaPor(PorcentajeOsea);
      setMuscularPor(PorcentajeMuscular);
      setMasaMuscular(masaMuscular);
    } else {
      setResultado(null);
      setResultado2(null);
      setMasaOsea(null);
      setMasaResidual(null);
      setMasaMuscular(null);
    }
  };

  const handlePositiveInputChange = (value, setValue) => {
    if (value >= 0) {
      setValue(value);
    }
  };

  return (
    <div className="bg-primary w-screen grid place-items-center">
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
              <input
                type="number"
                className="ml-2"
                value={peso}
                onChange={(e) =>
                  handlePositiveInputChange(parseFloat(e.target.value), setPeso)
                }
              />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <label>
              Talla:
              <input
                type="number"
                className="ml-2"
                value={talla}
                onChange={(e) =>
                  handlePositiveInputChange(
                    parseFloat(e.target.value),
                    setTalla
                  )
                }
              />
            </label>
            <label>
              Edad:
              <input
                type="number"
                className="ml-2"
                value={edad}
                onChange={(e) =>
                  handlePositiveInputChange(parseFloat(e.target.value), setEdad)
                }
              />
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
              Suprailiaco:
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
          <button
            type="button"
            className="bg-tertiary text-black border-4 cursor-pointer mt-5 py-1 px-3"
            onClick={() => {
              localStorage.removeItem("bodyCompositionValues");
              setGenero("");
              setTricep("");
              setBicep("");
              setSubescapular("");
              setSuprailiaco("");
              setBiestiloideo("");
              setFemur("");
              setTalla("");
              setPeso("");
              setResultado(null);
              setResultado2(null);
              setMasaOsea(null);
              setMasaResidual(null);
              setEdad("");
            }}
          >
            Limpiar Campos
          </button>
        </form>

        {resultado !== null &&
          resultado2 !== null &&
          masaOsea !== null &&
          PorcentajeOsea !== null &&
          masaResidual !== null &&
          PorcentajeResidual !== null &&
          masaMuscular !== null &&
          PorcentajeMuscular !== null && (
            <Table
              porcentajeGrasa={resultado}
              masaGrasa={masaGrasa}
              masaOsea={masaOsea}
              PorcentajeOsea={PorcentajeOsea}
              masaResidual={masaResidual}
              PorcentajeResidual={PorcentajeResidual}
              masaMuscular={masaMuscular}
              PorcentajeMuscular={PorcentajeMuscular}
            />
          )}
        {resultado !== null &&
          resultado2 !== null &&
          masaOsea !== null &&
          PorcentajeOsea !== null &&
          masaResidual !== null &&
          PorcentajeResidual !== null &&
          masaMuscular !== null &&
          PorcentajeMuscular !== null && (
            <Graph
              resultado={resultado}
              resultado2={resultado2}
              PorcentajeOsea={PorcentajeOsea}
              PorcentajeResidual={PorcentajeResidual}
              PorcentajeMuscular={PorcentajeMuscular}
            />
          )}
      </div>
    </div>
  );
}
