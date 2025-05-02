import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useSettings } from "@/providers/SettingsProvider";
import { AppRouting } from "@/routing";
import { PathnameProvider } from "@/providers";
import { Toaster } from "@/components/ui/sonner";
// import { Accordion } from "./components/accordion/Accordion";
const { VITE_BASE_URL } = import.meta.env;
const App = () => {
  const { settings } = useSettings();

  useEffect(() => {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add(settings.themeMode);
  }, [settings]);

  // const children = [<h1>Hello</h1>, <h1>buffellow</h1>, <h1>Yellow</h1>];

  return (
    <BrowserRouter
      basename={VITE_BASE_URL}
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <PathnameProvider>
        <AppRouting />
      </PathnameProvider>
      <Toaster />
    </BrowserRouter>
  );
  //   <>
  //     <h1>Hello World!</h1>
  //     <Accordion children={children} />
  //   </>
  // );
};
export { App };
