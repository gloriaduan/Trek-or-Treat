import RouteCard from "@/components/RouteCard";

const routes = [
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

function Page() {
  return (
    <div className="py-16">
      <div className="container">
        <h1 className="mb-6 text-3xl font-bold">Saved Routes</h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {routes.map((route) => (
            <RouteCard
              key={route.id}
              id={route.id}
              title={route.title}
              description={route.description}
              date={route.date}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
