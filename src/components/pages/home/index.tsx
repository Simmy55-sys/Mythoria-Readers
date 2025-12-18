import Hero from "./hero";
import PopularToday from "./popular-today";
import MostPopular from "./most-popular";
import LatestNovels from "./latest";

export default function HomeComponent() {
  return (
    <>
      <Hero />
      <PopularToday />
      <LatestNovels />
      <MostPopular />
    </>
  );
}
