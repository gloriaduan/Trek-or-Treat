import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <div className="flex items-center flex-1 justify-center p-5">
        <SignUp
          appearance={{
            elements: {
              formButtonPrimary: "bg-primary py-2",
              cardBox: "bg-white shadow-lg",
            },
          }}
        />
      </div>
    </>
  );
}
