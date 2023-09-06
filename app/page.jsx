import { IBM_Plex_Sans } from "next/font/google";

const iibm = IBM_Plex_Sans({ subsets: ["latin"], weight: "600" });
// This `Home` function represents the home page of the web application.
function Home() {
  return (
    <div className="bg-[#6E4E21] h-screen w-screen">
      <h1 className={`text-center text-2xl text-white ${iibm.className}`}>
        Home
      </h1>
    </div>
  );
}

export default Home;
