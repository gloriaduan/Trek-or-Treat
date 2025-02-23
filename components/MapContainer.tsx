import MainMap from "@/components/MainMap";
import { getLocations } from "@/lib/locations";

export const revalidate = 5;

async function MapContainer() {
  const locations = await getLocations();
  console.log(locations);

  return (
    <>
      <section className="w-full h-full-height">
        {locations.locationsWithAvgRating ? (
          <MainMap locations={locations.locationsWithAvgRating} />
        ) : (
          <p>No locations!</p>
        )}
      </section>
    </>
  );
}

export default MapContainer;
