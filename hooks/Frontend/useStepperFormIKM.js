import { useState, useEffect } from "react";

function useStep(storageKey) {
  const [stepAktif, setStepAktif] = useState(0);

  useEffect(() => {
    if (!storageKey) return; // kalau belum ada id, jangan jalan
    const savedStep = localStorage.getItem(storageKey);
    if (savedStep) {
      setStepAktif(parseInt(savedStep, 10));
    }
  }, [storageKey]);

  const handleSelanjutnya = () => {
    setStepAktif((cur) => {
      const next = cur + 1;
      if (storageKey) localStorage.setItem(storageKey, next);
      return next;
    });
  };

  const handleSebelumnya = () => {
    setStepAktif((cur) => {
      const prev = cur - 1;
      if (storageKey) localStorage.setItem(storageKey, prev);
      return prev;
    });
  };

  const resetStep = () => {
    setStepAktif(0);
    if (storageKey) localStorage.removeItem(storageKey);
  };

  return {
    stepAktif,
    handleSelanjutnya,
    handleSebelumnya,
    resetStep,
  };
}

export default useStep;
