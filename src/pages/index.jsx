import {Hero, RecentFundraisers, Stats} from "@/frontend/components/home";
import MainLayout from "@/frontend/layouts/main";

export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <Stats />
      <RecentFundraisers />
    </MainLayout>
  );
}
