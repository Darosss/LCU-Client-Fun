import { HeadContextProvider, HomeContent } from "@/components";

export default function Home() {
  return (
    <div>
      <h1>LCU Client</h1>
      <div>
        <HeadContextProvider>
          <HomeContent />
        </HeadContextProvider>
      </div>
    </div>
  );
}
