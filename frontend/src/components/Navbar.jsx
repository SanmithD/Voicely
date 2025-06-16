import { Menu, MoonIcon, SunMedium, UserCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UseThemeStore } from "../store/UseThemeStore";
import { Search as RecentSearch } from "./Search";

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
    <nav className="flex items-center justify-between px-4 py-2 bg-base-200 text-base-content sticky top-0 z-50 border-b-1 ">
      <Link to="/">
        <img src="/voicely.png" alt="logo" className="h-[100px] w-[100px]" />
      </Link>

      <div className="flex gap-3 justify-center items-center " >
        <div>
          { theme ? (
            <button onClick={handleTheme} ><SunMedium/></button>
          ) : (
            <button onClick={handleTheme} ><MoonIcon/></button>
          ) }
        </div>
        <div>
          <RecentSearch/>
        </div>
      {windowWidth < 480 ? (
        <div className="relative">
          <button onClick={() => setExtendedNavbar((prev) => !prev)}>
            <Menu className="size-6 cursor-pointer" />
          </button>
          {extendNavbar && (
            <div className="absolute right-0 w-[200px] mt-4 font-medium bg-base-100 shadow-md rounded-md p-2">
              <Link to="/newThread" className="block px-4 py-2 hover:bg-base-300 rounded">Post Thought</Link>
              <Link to="/community" className="block px-4 py-2 hover:bg-base-300 rounded">Community</Link>
              <Link to="/profile" className="block px-4 py-2 hover:bg-base-300 rounded">Profile</Link>
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
