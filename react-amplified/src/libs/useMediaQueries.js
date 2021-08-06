import { useMediaQuery } from "react-responsive";

const useBreakPoints = () => {
  const isXS = useMediaQuery({
    query: "(max-device-width: 480px)",
  });

  const isSM = useMediaQuery({
    query: "(max-device-width: 769px)",
  });

  const isMD = useMediaQuery({
    query: "(max-device-width: 1025px)",
  });

  const isLG = useMediaQuery({
    query: "(max-device-width: 1201px)",
  });

  const isExLg = useMediaQuery({
    query: "(min-device-width: 1201px)",
  });

  return {
    isXS,
    isSM,
    isMD,
    isLG,
    isExLg,
  };
};

export default useBreakPoints;
