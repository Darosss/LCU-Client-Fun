import { HeadContextProvider, HomeContent } from "@/components";

export default function Home() {
  return (
    <div>
      <HeadContextProvider>
        <HomeContent />
      </HeadContextProvider>
    </div>
  );
}
