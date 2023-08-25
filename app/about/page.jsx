import Image from "next/image";
import Perfil from "../assets/perfil.jpg";

import { Abhaya_Libre } from "next/font/google";

const abhaya = Abhaya_Libre({ subsets: ["latin"], weight:'600'});


export default function About() {
  return (
    <div className="bg-[#6E4E21] min-h-screen flex items-center justify-center h-screen w-screen">
      <div className="bg-[#ffffff8c] p-8 rounded-lg shadow-md text-center">
        <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden">
          <Image
            src={Perfil}
            width={500}
            height={500}
            alt="Mi foto de perfil"
          />
        </div>
        <div className={abhaya.className}>
          <h1 className="text-3xl font-semibold mb-2">
            ¡Hola, soy Zack Vadhir!
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Ingeniero en Sistemas Computacionales
          </p>
          <p className="text-lg mb-4">
            Y este es mi perfil tengo 23 años y de nacionalidad mexicana, nací
            en Ensenada.
          </p>
          <p className="text-lg mb-4">
            Estoy apasionado por resolver problemas a través de la programación
            y la tecnología.
          </p>
          <p className="text-lg">
            Actualmente, estoy en mi noveno semestre de la carrera de Ingeniería
            en Sistemas Computacionales.
          </p>
          <div className="mt-6">
            <span className="text-black">Correo: </span>
            <a
              href="mailto:zack.vadhir2@hotmail.com"
              className="text-sky-600 hover:underline transition duration-300"
            >
              zack.vadhir2@hotmail.com
            </a>
          </div>
          <div className="mt-5">
            <span className="text-black">Teléfono: </span>
            <a
              href="tel:646-182-8269"
              className="text-sky-600 hover:underline transition duration-300"
            >
              646-182-8269
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
