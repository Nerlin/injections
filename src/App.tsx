import { useLocalStore } from "mobx-react";
import React, { useCallback, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import InjectionStoryList from "./components/InjectionStoryList";
import InjectionStories from "./state/InjectionStories";

export const AppContext = React.createContext<{
  saveStories(): void;
}>({ saveStories(): void {} });

const App: React.FC = () => {
  const stories = useLocalStore<InjectionStories>(() => {
    const json = localStorage.getItem("store");
    console.log(json);
    return json ? InjectionStories.fromJSON(json) : new InjectionStories();
  });

  const saveStories = useCallback(() => {
    console.log(JSON.stringify(stories));
    localStorage.setItem("store", JSON.stringify(stories));
  }, [stories]);

  const [prompt, setPrompt] = useState<any>(null);
  const [install, setInstall] = useState<"none" | "installed" | "declined">(
    "none"
  );
  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e: any) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setPrompt(e);

      console.log("Prompt");
    });
  }, []);

  const launchInstall = useCallback(() => {
    if (prompt) {
      prompt.prompt();
      prompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the A2HS prompt");
          setInstall("installed");
        } else {
          console.log("User dismissed the A2HS prompt");
          setInstall("declined");
        }
        setPrompt(null);
      });
    }
  }, [prompt]);

  return (
    <ThemeProvider theme={Theme}>
      <AppContext.Provider value={{ saveStories }}>
        <>
          {prompt && install === "none" ? (
            <button onClick={launchInstall}>Install</button>
          ) : null}
          <InjectionStoryList stories={stories} />
        </>
      </AppContext.Provider>
    </ThemeProvider>
  );
};

const Theme = {};

export default App;
