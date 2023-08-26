"use client";
const handleSubmit = (e) => {};

export default function Composicion() {
  return (
    <div className=" bg-[#6E4E21] h-screen w-screen">
      <h1 className=" text-center">Composicion Corporal</h1>
      <form className="flex flex-col">
        <label htmlFor="" className="mt-5">
          Genero:
          <input type="text" />
        </label>
        <label htmlFor="" className="mt-5">
          Peso:
          <input type="text" />
        </label>
        <label htmlFor="" className="mt-5">
          Talla:
          <input type="text" />
        </label>
        <label htmlFor="" className="mt-5">
          Edad:
          <input type="text" />
        </label>
        <label htmlFor="" className="mt-5">
          Bicipital:
          <input type="text" />
        </label>
        <label htmlFor="" className="mt-5">
          Tricipital:
          <input type="text" />
        </label>
        <label htmlFor="" className="mt-5">
          Subescapular:
          <input type="text" />
        </label>
        <label htmlFor="" className="mt-5">
          Cresta lleaca:
          <input type="text" />
        </label>
        <input type="submit" value="Calcular" className=" border-4 cursor-pointer mt-5" />
      </form>
    </div>
  );
}
