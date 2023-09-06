import Link from "next/link";
// This code defines an array called `menuRoutes` that contains objects with paths and labels to create a menu on the web page.
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
    ruta: "/body_composition",
    label: "Composicion Corporal",
  },
];
// This `Menu` function returns a navigation menu on the web page.
function Menu() {
  return (
    <div className="w-[15%] p-5 bg-secondary min-h-screen">
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
