import DirectionsBar from "@/components/DirectionsBar";
import MapContainer from "@/components/MapContainer";

export default function Home() {
  return (
    <>
      <section className="md:flex flex-1">
        <DirectionsBar />
        <MapContainer />
      </section>
    </>
  );
}
