import Link from "next/link";

const menuRoutes = [
  {
    ruta: "/",
    label: "Inicio"
  },
  {
    ruta: "/about",
    label: "About"
  }
];

function Menu() {
  return (
    <div className="w-[15%] p-5 bg-[#F0C890] h-screen">
      <h1 className="text-2xl">Menu</h1>
      <ul>
        {menuRoutes.map((route, index) => (
          <li key={index}>
            <Link href={route.ruta} legacyBehavior>
              <a>{route.label}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
