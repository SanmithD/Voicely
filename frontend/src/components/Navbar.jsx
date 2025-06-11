import { Menu, MoonIcon, Search, SunMedium, UserCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UseThemeStore } from "../store/UseThemeStore";

function Navbar() {
  const { changeTheme } = UseThemeStore();
  const [theme, setTheme] = useState(true)
  const [extendNavbar, setExtendedNavbar] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTheme = () =>{
    setTheme(!theme);
    changeTheme(theme ? "light" : "dark");
  }

  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-base-200 text-base-content">
      <Link to="/">
        <img src="/voicely.png" alt="logo" className="h-[50px] w-[50px]" />
      </Link>

      <div className="flex gap-3 justify-center items-center " >
        <div>
          { theme ? (
            <button onClick={handleTheme} ><SunMedium/></button>
          ) : (
            <button onClick={handleTheme} ><MoonIcon/></button>
          ) }
        </div>
        <div className="flex justify-center items-center " >
          <span><Search className="size-6" /></span><input type="text" name="search" id="search" placeholder="Search..." className="w-full py-0.5 pl-2 border-2 border-base-300 rounded " />
        </div>
      {windowWidth < 480 ? (
        <div className="relative">
          <button onClick={() => setExtendedNavbar((prev) => prev)}>
            <Menu className="size-6 cursor-pointer" />
          </button>
          {extendNavbar && (
            <div className="absolute right-0 mt-2 bg-base-100 shadow-md rounded-md p-2">
              <Link to="/profile" className="block px-4 py-2 hover:bg-base-300 rounded">Profile</Link>
              {/* Add more links as needed */}
            </div>
          )}
        </div>
      ) : (
        <div className="flex gap-4">
          <Link to="/newThread" className="hover:underline">Post Thought</Link>
          <Link to="/community" className="hover:underline">Community </Link>
          <Link to="/profile" className="hover:underline"><UserCircle2 className="size-6" /> </Link>
        </div>
      )}
      </div>

    </nav>
  );
}

export default Navbar;
