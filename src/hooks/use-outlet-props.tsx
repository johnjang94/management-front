import { useOutletContext } from "react-router-dom";

interface OutletContextType {
  isNavHovered: boolean;
}

export const useOutletProps = () => {
  return useOutletContext<OutletContextType>();
};
