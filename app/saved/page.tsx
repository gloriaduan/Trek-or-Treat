import RouteCard from "@/components/RouteCard";
import { getLocation } from "@/lib/locations";
import { getRoutes } from "@/lib/route";

const routes_arr = [
  {
    id: "1",
    title: "Morning Jog Route",
    description:
      "My favorite route for morning jogs through the park and along the river",
    date: "2023-11-15",
  },
  {
    id: "2",
    title: "Weekend Bike Trail",
    description:
      "Scenic bike trail through the mountains with several rest stops",
    date: "2023-10-22",
  },
  {
    id: "3",
    title: "City Walking Tour",
    description:
      "Walking tour covering major landmarks and historical sites in the downtown area",
    date: "2023-11-05",
  },
];

async function Page() {
  const res = await getRoutes();
  console.log(res);

  return (
    <div className="py-16">
      <div className="container">
        <h1 className="mb-6 text-3xl font-bold">Saved Routes</h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {res.routes?.map((route) => {
            return (
              <RouteCard
                key={route.id}
                id={route.id}
                title={route.name}
                description={route.description}
                date={route.createdAt.toISOString()}
                imageUrl={route.locations[0].location.images[0]}
                locations={route.locations}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Page;
