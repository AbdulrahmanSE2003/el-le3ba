// Matchmaking page
"use client";
import { Button } from "@/components/ui/button";

const page = () => {
  const login = async () => {
    const x = await fetch("http://localhost:5000/api/v1/users/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "abdulrahman.saad2303@gmail.com",
        password: "pass1234",
      }),
    });
    console.log(x);
  };
  const startSession = async () => {
    const res = await fetch("http://localhost:5000/api/v1/sessions/start", {
      method: "POST",
      credentials: "include", // ← this sends the cookie
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);

    // redirect("/match");
  };
  return (
    <section
      className={`bg-foreground min-h-screen dark:bg-background flex justify-center items-center text-background dark:text-foreground`}
    >
      <Button
        variant={"secondary"}
        onClick={login}
        className={`px-6 py-6 cursor-pointer text-lg`}
      >
        login
      </Button>
      <Button
        onClick={startSession}
        className={`px-6 py-6 cursor-pointer text-lg`}
      >
        start session
      </Button>
    </section>
  );
};

export default page;
