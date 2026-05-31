import PortfolioHome from "./Components/PortfolioHome";
import { HOME_ABSTRACT_SEGMENTS } from "./data/workPages";

export default function Page() {
  return (
    <PortfolioHome
      abstractSegments={HOME_ABSTRACT_SEGMENTS}
      heroImage="/herotesting.png"
    />
  );
}
