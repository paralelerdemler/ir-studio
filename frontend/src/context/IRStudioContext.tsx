import {
  createContext,
  useContext,
  type ReactNode,
} from "react";

type IRStudioContextValue = {};

const IRStudioContext = createContext<IRStudioContextValue | null>(
  null
);

type Props = {
  children: ReactNode;
};

export function IRStudioProvider({
  children,
}: Props) {
  const value: IRStudioContextValue = {};

  return (
    <IRStudioContext.Provider value={value}>
      {children}
    </IRStudioContext.Provider>
  );
}

export function useIRStudio() {
  const context = useContext(IRStudioContext);

  if (!context) {
    throw new Error(
      "useIRStudio must be used inside IRStudioProvider"
    );
  }

  return context;
}