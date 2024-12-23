import PostLocationForm from "@/components/postLocationForm";

function Page() {
  return (
    <section className="py-16">
      <div className="container">
        <h2 className="text-center text-3xl font-bold mb-10">
          Post a location
        </h2>
        <PostLocationForm />
      </div>
    </section>
  );
}

export default Page;
