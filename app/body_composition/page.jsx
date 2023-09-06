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

  // This `useEffect` loads data previously stored in local storage and sets it to the state of the React component.
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

  // This `useEffect` updates the local storage whenever the specified state values change,
  // ensuring that the data is reflected in the local storage.
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

  // Esta función `calculateBoneMass` calcula la masa ósea basada en los valores de `size`, `bistyloid`, y `femur`, usando una fórmula específica.
  // Luego, asigna el resultado a `boneMass`. Si falta algún valor, devuelve `null`.
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

  // This `useEffect` updates the local storage whenever the specified state values change,
  // ensuring that the data is reflected in the local storage.
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

  // The `handleSubmit` function calculates body composition data based on form data and sets it to the state of the React component.
  const handleSubmit = (e) => {
    e.preventDefault();
    // This code block checks if all variables (genre, size, weight, tricep, bicep, subscapularis, suprailiac, bistyloid and femur)
    // have defined values before further calculations.
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
      // Calculate the logarithm in base 10 of the sum of values converted to skinfold numbers or set to 0 if it cannot be calculated.
      const log10 =
        Math.log10(
          parseFloat(tricep) +
            parseFloat(bicep) +
            parseFloat(subscapularis) +
            parseFloat(suprailiac)
        ) || 0;

      let DC;

      // Depending on the gender entered (male or female), it calculates a coefficient (DC) using a specific formula based on the previously
      // calculated value of log10.
      if (genre === "hombre") {
        DC = 1.1765 - 0.0744 * log10;
      } else if (genre === "mujer") {
        DC = 1.1567 - 0.0717 * log10;
      }
      // Calculates the body fat percentage using a previously calculated value (DC) in a specific formula.
      const percentageFatCorporal = 495 / DC - 450;
      // Calculate body fat mass by multiplying body fat percentage by weight and dividing the result by 100.
      const fatMass = (percentageFatCorporal * weight) / 100;
      // Calculate the percentage of residual mass by dividing the residual mass calculated by the `calculateResidualMass()`
      // function by the weight and then multiplying by 100.
      const PercentResidual = (calculateResidualMass() * 100) / weight;
      // Calculate the percentage of bone mass by dividing the bone mass calculated by the `calculateBoneMass()`
      // function by the weight and multiplying by 100.
      const PercentageOsea = (calculateBoneMass() * 100) / weight;
      // Calculate the percentage of muscle mass by subtracting the sum of the percentage of body fat,
      // the percentage of residual mass and the percentage of bone mass at 100%.
      const PercentageMuscular =
        100 - (percentageFatCorporal + PercentResidual + PercentageOsea);
      // Calculate muscle mass by multiplying the percentage of muscle mass by the weight and dividing the result by 100.
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

  //The `handlePositiveInputChange` function checks if a value is greater than or equal to zero and, if so,
  // sets it to a variable using the `setValue` function.
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
        // This code fragment conditionally renders a table component Table if
        all variables in the conditions are different from null.
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
        // This code fragment conditionally renders a graph component graph if
        all variables in the conditions are different from null.
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
