import {Hero, RecentFundraisers, Stats} from "@/frontend/components/home";
import MainLayout from "@/frontend/layouts/main";
import {useState} from "react";

export default function Home() {
  const [userData, setUserData] = useState(null);
  console.log(userData);
  return (
    <MainLayout setUserData={setUserData}>
      <Hero />
      <Stats />
      <RecentFundraisers />
    </MainLayout>
  );
}
