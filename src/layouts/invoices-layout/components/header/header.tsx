import { Button } from "@/components/ui/button";
import moon from "@/assets/icon-moon.svg";
import sun from "@/assets/icon-sun.svg";
import logo from "@/assets/logo.svg";
import { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import i18n from "@/i18n";
import { createAvatar } from "@dicebear/core";
import { avataaars } from "@dicebear/collection";

const Header = () => {
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.slice(4);
  const params = useParams();
  const lang = params.lang as string;
  const avatar = createAvatar(avataaars, {
    seed: "Felix",
  });

  const svg = avatar.toDataUri();

  const handleChangeTheme = () => {
    console.log(isDark);

    const html = document.querySelector("html");
    if (!isDark) {
      html?.classList.add("dark");
    } else {
      html?.classList.remove("dark");
    }
    setIsDark((prev) => !prev);
  };
  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    navigate(`/${lang}/${path}`);
  };

  return (
    <header className="h-16 md:w-16 md:min-h-screen md:h-auto bg-slate-900 dark:bg-slate-950 flex md:flex-col items-center justify-between p-4 rounded-r-none md:rounded-r-xl">
      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
        <img src={logo} alt="Logo" />
      </div>

      <div className="flex md:flex-col gap-4 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger className="text-purple-600">
            <Globe size={25} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleChangeLanguage("en")}>
              English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleChangeLanguage("ka")}>
              ქართული
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="ghost" size="icon" onClick={handleChangeTheme}>
          {isDark ? <img src={sun} alt="sun" /> : <img src={moon} alt="moon" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
        <Link to={`/${lang}/profile`}>
          <div className="w-8 h-8 rounded-full bg-slate-800 overflow-hidden">
            <img
              src={svg}
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
