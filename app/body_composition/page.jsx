"use client";
import React, { useState, useEffect } from "react";
import Table from "../table/page";
import Graph from "../graph/page";

export default function Composition() {
  const [genre, setGenre] = useState("");
  const [tricep, setTricep] = useState("");
  const [bicep, setBicep] = useState("");
  const [subscapularis, setSubscapularis] = useState("");
  const [suprailiac, setSuprailiac] = useState("");
  const [bistyloid, setBistyloid] = useState("");
  const [femur, setFemur] = useState("");
  const [size, setSize] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [result, setResult] = useState(null);
  const [result2, setResult2] = useState(null);
  const [boneMass, setBoneMass] = useState(null);
  const [residualMass, setResidualMass] = useState(null);
  const [fatMass, setFatMass] = useState(null);
  const [muscleMass, setMuscleMass] = useState(null);
  const [PercentResidual, setResidualMassPer] = useState(null);
  const [PercentageOsea, setBoneMassPer] = useState(null);
  const [MusclePercentage, setMuscularPer] = useState(null);

  useEffect(() => {
    const storedValues = JSON.parse(
      localStorage.getItem("bodyCompositionValues")
    );
    if (storedValues) {
      setGenre(storedValues.genre || "");
      setTricep(storedValues.tricep || "");
      setBicep(storedValues.bicep || "");
      setSubscapularis(storedValues.subscapularis || "");
      setSuprailiac(storedValues.suprailiac || "");
      setBistyloid(storedValues.bistyloid || "");
      setFemur(storedValues.femur || "");
      setSize(storedValues.size || "");
      setWeight(storedValues.weight || "");
      setAge(storedValues.age || "");
    }
  }, []);

  useEffect(() => {
    const bodyCompositionValues = {
      genre,
      tricep,
      bicep,
      subscapularis,
      suprailiac,
      bistyloid,
      femur,
      size,
      weight,
      age,
    };
    localStorage.setItem(
      "bodyCompositionValues",
      JSON.stringify(bodyCompositionValues)
    );
  }, [
    genre,
    tricep,
    bicep,
    subscapularis,
    suprailiac,
    bistyloid,
    femur,
    size,
    weight,
    age,
  ]);

  const calculateBoneMass = () => {
    if (size && bistyloid && femur) {
      heightSquared = Math.pow(parseFloat(size), 2);
      const boneMass =
        Math.pow(
          ((((heightSquared * parseFloat(bistyloid)) / 100) *
            parseFloat(femur)) /
            100) *
            400,
          0.712
        ) * 3.02;
      return boneMass;
    }
    return null;
  };

  let heightSquared = 0;

  const calculateResidualMass = () => {
    if (genre && weight) {
      weightKilograms = parseFloat(weight);
      if (genre === "hombre") {
        return 0.24 * weightKilograms;
      } else if (genre === "mujer") {
        return 0.21 * weightKilograms;
      }
    }
    return null;
  };

  let weightKilograms = 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      genre &&
      size &&
      weight &&
      tricep &&
      bicep &&
      subscapularis &&
      suprailiac &&
      bistyloid &&
      femur
    ) {
      const log10 =
        Math.log10(
          parseFloat(tricep) +
            parseFloat(bicep) +
            parseFloat(subscapularis) +
            parseFloat(suprailiac)
        ) || 0;

      let DC;

      if (genre === "hombre") {
        DC = 1.1765 - 0.0744 * log10;
      } else if (genre === "mujer") {
        DC = 1.1567 - 0.0717 * log10;
      }

      const percentageFatCorporal = 495 / DC - 450;
      const fatMass = (percentageFatCorporal * weight) / 100;
      const PercentResidual = (calculateResidualMass() * 100) / weight;
      const PercentageOsea = (calculateBoneMass() * 100) / weight;
      const PercentageMuscular =
        100 - (percentageFatCorporal + PercentResidual + PercentageOsea);
      const muscleMass = (PercentageMuscular * weight) / 100;
      setFatMass(fatMass);
      setResult(percentageFatCorporal);
      setResult2(DC);
      setBoneMass(calculateBoneMass());
      setResidualMass(calculateResidualMass());
      setResidualMassPer(PercentResidual);
      setBoneMassPer(PercentageOsea);
      setMuscularPer(PercentageMuscular);
      setMuscleMass(muscleMass);
    } else {
      setResult(null);
      setResult2(null);
      setBoneMass(null);
      setResidualMass(null);
      setMuscleMass(null);
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
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
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
                value={weight}
                onChange={(e) =>
                  handlePositiveInputChange(
                    parseFloat(e.target.value),
                    setWeight
                  )
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
                value={size}
                onChange={(e) =>
                  handlePositiveInputChange(parseFloat(e.target.value), setSize)
                }
              />
            </label>
            <label>
              Edad:
              <input
                type="number"
                className="ml-2"
                value={age}
                onChange={(e) =>
                  handlePositiveInputChange(parseFloat(e.target.value), setAge)
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
                value={subscapularis}
                onChange={(e) =>
                  handlePositiveInputChange(
                    parseFloat(e.target.value),
                    setSubscapularis
                  )
                }
              />
            </label>
            <label>
              Suprailiaco:
              <input
                type="number"
                className="ml-2"
                value={suprailiac}
                onChange={(e) =>
                  handlePositiveInputChange(
                    parseFloat(e.target.value),
                    setSuprailiac
                  )
                }
              />
            </label>

            <label>
              Biestiloideo:
              <input
                type="number"
                className="ml-2"
                value={bistyloid}
                onChange={(e) =>
                  handlePositiveInputChange(
                    parseFloat(e.target.value),
                    setBistyloid
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
              setGenre("");
              setTricep("");
              setBicep("");
              setSubscapularis("");
              setSuprailiac("");
              setBistyloid("");
              setFemur("");
              setSize("");
              setWeight("");
              setResult(null);
              setResult2(null);
              setBoneMass(null);
              setResidualMass(null);
              setAge("");
            }}
          >
            Limpiar Campos
          </button>
        </form>

        {result !== null &&
          result2 !== null &&
          boneMass !== null &&
          PercentageOsea !== null &&
          residualMass !== null &&
          PercentResidual !== null &&
          muscleMass !== null &&
          MusclePercentage !== null && (
            <Table
              porcentajeGrasa={result}
              fatMass={fatMass}
              boneMass={boneMass}
              PercentageOsea={PercentageOsea}
              residualMass={residualMass}
              PercentResidual={PercentResidual}
              muscleMass={muscleMass}
              MusclePercentage={MusclePercentage}
            />
          )}
        {result !== null &&
          result2 !== null &&
          boneMass !== null &&
          PercentageOsea !== null &&
          residualMass !== null &&
          PercentResidual !== null &&
          muscleMass !== null &&
          MusclePercentage !== null && (
            <Graph
              result={result}
              result2={result2}
              PercentageOsea={PercentageOsea}
              PercentResidual={PercentResidual}
              MusclePercentage={MusclePercentage}
            />
          )}
      </div>
    </div>
  );
}
