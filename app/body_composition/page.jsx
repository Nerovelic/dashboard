"use client";
import React, { useState, useEffect } from "react";
import Table from "../table/page";
import Graph from "../graph/page";

export default function Composition() {
  const [data, setData] = useState({
    genre: "",
    tricep: "",
    bicep: "",
    subscapularis: "",
    suprailiac: "",
    bistyloid: "",
    femur: "",
    size: "",
    weight: "",
    age: "",
    result: 0,
    result2: 0,
    boneMass: 0,
    residualMass: 0,
    fatMass: 0,
    muscleMass: 0,
    PercentResidual: 0,
    PercentageOsea: 0,
    MusclePercentage: 0,
  });

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // This `useEffect` loads data previously stored in local storage and sets it to the state of the React component.
  useEffect(() => {
    const storedValues = JSON.parse(
      localStorage.getItem("bodyCompositionValues")
    );
    if (storedValues) {
      setData((prevData) => ({
        ...prevData,
        ...storedValues,
      }));
      setIsDataLoaded(true); // Set isDataLoaded to true when data is loaded
    }
  }, []);
  // This `useEffect` updates the local storage whenever the specified state values change,
  // ensuring that the data is reflected in the local storage.
  useEffect(() => {
    localStorage.setItem("bodyCompositionValues", JSON.stringify(data));
  }, [data]);

  // This `calculateBoneMass` function calculates bone mass based on the values of `size`, `bistyloid`, and `femur`, using a specific formula.
  // Then, it assigns the result to `boneMass`. If any value is missing, it returns `0`.
  const calculateBoneMass = () => {
    if (data.size && data.bistyloid && data.femur) {
      heightSquared = Math.pow(parseFloat(data.size), 2);
      const boneMass =
        Math.pow(
          ((((heightSquared * parseFloat(data.bistyloid)) / 100) *
            parseFloat(data.femur)) /
            100) *
            400,
          0.712
        ) * 3.02;
      return boneMass;
    }
    return 0;
  };

  let heightSquared = 0;

  // This `useEffect` updates the local storage whenever the specified state values change,
  // ensuring that the data is reflected in the local storage.
  const calculateResidualMass = () => {
    if (data.genre && data.weight) {
      weightKilograms = parseFloat(data.weight);
      if (data.genre === "hombre") {
        return 0.24 * weightKilograms;
      } else if (data.genre === "mujer") {
        return 0.21 * weightKilograms;
      }
    }
    return 0;
  };

  let weightKilograms = 0;

  // The `handleSubmit` function calculates body composition data based on form data and sets it to the state of the React component.
  const handleSubmit = (e) => {
    e.preventDefault();
    // This code block checks if all variables (genre, size, weight, tricep, bicep, subscapularis, suprailiac, bistyloid and femur)
    // have defined values before further calculations.
    if (
      data.genre &&
      data.size &&
      data.weight &&
      data.tricep &&
      data.bicep &&
      data.subscapularis &&
      data.suprailiac &&
      data.bistyloid &&
      data.femur
    ) {
      // Calculate the logarithm in base 10 of the sum of values converted to skinfold numbers or set to 0 if it cannot be calculated.
      const log10 =
        Math.log10(
          parseFloat(data.tricep) +
            parseFloat(data.bicep) +
            parseFloat(data.subscapularis) +
            parseFloat(data.suprailiac)
        ) || 0;

      let DC;

      // Depending on the gender entered (male or female), it calculates a coefficient (DC) using a specific formula based on the previously
      // calculated value of log10.
      if (data.genre === "hombre") {
        DC = 1.1765 - 0.0744 * log10;
      } else if (data.genre === "mujer") {
        DC = 1.1567 - 0.0717 * log10;
      }
      // Calculates the body fat percentage using a previously calculated value (DC) in a specific formula.
      const percentageFatCorporal = 495 / DC - 450;
      // Calculate body fat mass by multiplying body fat percentage by weight and dividing the result by 100.
      const fatMass = (percentageFatCorporal * data.weight) / 100;
      // Calculate the percentage of residual mass by dividing the residual mass calculated by the `calculateResidualMass()`
      // function by the weight and then multiplying by 100.
      const PercentResidual = (calculateResidualMass() * 100) / data.weight;
      // Calculate the percentage of bone mass by dividing the bone mass calculated by the `calculateBoneMass()`
      // function by the weight and multiplying by 100.
      const PercentageOsea = (calculateBoneMass() * 100) / data.weight;
      // Calculate the percentage of muscle mass by subtracting the sum of the percentage of body fat,
      // the percentage of residual mass and the percentage of bone mass at 100%.
      const PercentageMuscular =
        100 - (percentageFatCorporal + PercentResidual + PercentageOsea);
      // Calculate muscle mass by multiplying the percentage of muscle mass by the weight and dividing the result by 100.
      const muscleMass = (PercentageMuscular * data.weight) / 100;
      setData((prevData) => ({
        ...prevData,
        result: percentageFatCorporal,
        result2: DC,
        boneMass: calculateBoneMass(),
        residualMass: calculateResidualMass(),
        PercentResidual: PercentResidual,
        PercentageOsea: PercentageOsea,
        MusclePercentage: PercentageMuscular,
        fatMass: fatMass,
        muscleMass: muscleMass,
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        result: 0,
        result2: 0,
        boneMass: 0,
        residualMass: 0,
        fatMass: 0,
        muscleMass: 0,
      }));
    }
  };

  // The `handlePositiveInputChange` function takes an event and a key as arguments. When a value greater than or equal to zero is entered in the event,
  // updates the existing data (prevData) with the new value in the specified key using the propagation operator (`...`).
  const handlePositiveInputChange = (event, key) => {
    let { value } = event.target;
    // Remove blanks at the beginning and at the end
    value = value.trim();
    // Regular expression to allow only integers or positive decimals,
    // where .X is interpreted as 0.X, and also allow empty fields.
    const regex = /^$|^[+]?(?:\d+\.?|\d*\.\d+)?$/;
    // Replace .X with 0.X if found at the beginning of the value.
    if (value.startsWith(".")) {
      value = "0" + value;
    }
    if (regex.test(value)) {
      setData((prevData) => ({
        ...prevData,
        [key]: value,
      }));
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
                value={data.genre}
                onChange={(e) => setData({ ...data, genre: e.target.value })}
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
                placeholder="kg"
                value={data.weight}
                onChange={(e) => handlePositiveInputChange(e, "weight")}
              />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <label>
              Talla:
              <input
                type="number"
                className="ml-2"
                placeholder="metros"
                value={data.size}
                onChange={(e) => handlePositiveInputChange(e, "size")}
              />
            </label>
            <label>
              Edad:
              <input
                type="number"
                className="ml-2"
                placeholder="años"
                value={data.age}
                onChange={(e) => handlePositiveInputChange(e, "age")}
              />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <label>
              Bíceps:
              <input
                type="number"
                className="ml-2"
                placeholder="mm"
                value={data.bicep}
                onChange={(e) => handlePositiveInputChange(e, "bicep")}
              />
            </label>
            <label>
              Tríceps:
              <input
                type="number"
                className="ml-2"
                placeholder="mm"
                value={data.tricep}
                onChange={(e) => handlePositiveInputChange(e, "tricep")}
              />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <label>
              Subescapular:
              <input
                type="number"
                className="ml-2"
                placeholder="mm"
                value={data.subscapularis}
                onChange={(e) => handlePositiveInputChange(e, "subscapularis")}
              />
            </label>
            <label>
              Suprailiaco:
              <input
                type="number"
                className="ml-2"
                placeholder="mm"
                value={data.suprailiac}
                onChange={(e) => handlePositiveInputChange(e, "suprailiac")}
              />
            </label>
            <label>
              Biestiloideo:
              <input
                type="number"
                className="ml-2"
                placeholder="cm"
                value={data.bistyloid}
                onChange={(e) => handlePositiveInputChange(e, "bistyloid")}
              />
            </label>
            <label>
              Femur:
              <input
                type="number"
                className="ml-2"
                placeholder="cm"
                value={data.femur}
                onChange={(e) => handlePositiveInputChange(e, "femur")}
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
              setData({
                genre: "",
                tricep: "",
                bicep: "",
                subscapularis: "",
                suprailiac: "",
                bistyloid: "",
                femur: "",
                size: "",
                weight: "",
                age: "",
                result: 0,
                result2: 0,
                boneMass: 0,
                residualMass: 0,
                fatMass: 0,
                muscleMass: 0,
                PercentResidual: 0,
                PercentageOsea: 0,
                MusclePercentage: 0,
              });
            }}
          >
            Limpiar Campos
          </button>
        </form>
        {isDataLoaded && ( // Only shows table and graph if data is loaded.
          <div>
            {data.result !== 0 &&
              data.result2 !== 0 &&
              data.boneMass !== 0 &&
              data.PercentageOsea !== 0 &&
              data.residualMass !== 0 &&
              data.PercentResidual !== 0 &&
              data.muscleMass !== 0 &&
              data.MusclePercentage !== 0 && (
                <Table
                  porcentajeGrasa={data.result}
                  fatMass={data.fatMass}
                  boneMass={data.boneMass}
                  PercentageOsea={data.PercentageOsea}
                  residualMass={data.residualMass}
                  PercentResidual={data.PercentResidual}
                  muscleMass={data.muscleMass}
                  MusclePercentage={data.MusclePercentage}
                />
              )}
            {data.result !== 0 &&
              data.result2 !== 0 &&
              data.boneMass !== 0 &&
              data.PercentageOsea !== 0 &&
              data.residualMass !== 0 &&
              data.PercentResidual !== 0 &&
              data.muscleMass !== 0 &&
              data.MusclePercentage !== 0 && (
                <Graph
                  result={data.result}
                  result2={data.result2}
                  PercentageOsea={data.PercentageOsea}
                  PercentResidual={data.PercentResidual}
                  MusclePercentage={data.MusclePercentage}
                />
              )}
          </div>
        )}
      </div>
    </div>
  );
}
