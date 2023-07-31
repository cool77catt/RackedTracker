import { createContext, useState } from 'react';

type TimerContextType = {
  duration: number;
  setDuration: (value: number) => void;
};

export const TimerContext = createContext<TimerContextType | undefined>(
  undefined,
);

type Props = {
  children: React.ReactNode;
};

export const TimerProvider: React.FC<Props> = ({ children }) => {
  const [duration, setDuration] = useState<number>(60);

  return (
    <TimerContext.Provider value={{ duration, setDuration }}>
      {children}
    </TimerContext.Provider>
  );
};
