import { useState, useCallback } from "react";

export const useError = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorAnimation, setErrorAnimation] = useState(false);

  const showError = useCallback((msg: string) => {
    setErrorVisible(true);
    setErrorAnimation(true);
    setErrorMessage(msg);

    setTimeout(() => {
      setErrorAnimation(false);
    }, 2500);

    setTimeout(() => {
      setErrorVisible(false);
    }, 3000);
  }, []);

  return { errorMessage, errorVisible, errorAnimation, showError };
};
