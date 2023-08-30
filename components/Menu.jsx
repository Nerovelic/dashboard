import Link from "next/link";

const menuRoutes = [
  {
    ruta: "/",
    label: "Inicio",
  },
  {
    ruta: "/about",
    label: "About",
  },
  {
    ruta: "/composicion_corporal",
    label: "Composicion Corporal",
  },
];

function Menu() {
  return (
    <div className="w-[15%] p-5 bg-secondary h-screen">
      <h1 className="text-3xl text-center pb-5">Menu</h1>
      <ul className="text-center  space-y-2 text-xl">
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
