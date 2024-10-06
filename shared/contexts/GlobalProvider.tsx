import { getCurrentUserAsync } from "@/shared/lib/appWrite";
import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { Models } from "react-native-appwrite";

interface IGlobalContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: Models.Document | null;
  SetUser: React.Dispatch<React.SetStateAction<Models.Document | null>>;
  isLoading: boolean;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

const GlobalContext = createContext<IGlobalContextType | undefined | null>(
  null
);

export const useGlobalContext = (): IGlobalContextType | undefined | null => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

interface IGlobalProviderProps {
  children: React.ReactNode;
}

const GlobalProvider = ({ children }: IGlobalProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, SetUser] = useState<Models.Document | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUserAsync()
      .then((result) => {
        if (result.isErr()) {
          console.log(`Execute:1`);
          setIsLoggedIn(false);
          SetUser(null);
        }

        if (result.isOk() && result.value) {
          console.log(`Execute:3`);
          setIsLoggedIn(true);
          SetUser(result.value);
        } else {
          console.log(`Execute:2`);
          setIsLoggedIn(false);
          SetUser(null);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        SetUser,
        isLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
