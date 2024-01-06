import React, { createContext, useState, useReducer } from "react";
import { IWashroom } from "../types";

// interface Istate {
//   data: IWashroom[];
//   loading: boolean | null;
//   error: any;
// }

// const initialState: Istate = {
//   data: [] as IWashroom[],
//   loading: null,
//   error: null,
// };

interface IWashroomContext {
  washroomsState: IWashroom[];
  setWashrooms: (washrooms: IWashroom[]) => void;
}

export const WashroomDataContext = createContext<IWashroomContext>(null);

export const WashroomDataProvider = ({ children }) => {
  const [washroomsState, setWashrooms] = useState<IWashroom[]>();

  return (
    <WashroomDataContext.Provider value={{ washroomsState, setWashrooms }}>
      {children}
    </WashroomDataContext.Provider>
  );
};

// export const WashroomDataProvider = ({ children }) => {
//   const [washroomState, dispatch] = useReducer(
//     WashroomDataReducer,
//     initialState
//   );

//   const fetchData = async () => {
//     dispatch({ type: "FETCH_REQUEST" });

//     try {
//       const washrooms = await fetchWashrooms();
//       dispatch({ type: "FETCH_SUCCESS", payload: washrooms });
//     } catch (error) {
//       dispatch({ type: "FETCH_FAILURE", payload: error });
//     }
//   };
