import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { TextAnimate } from "@/components/magicui/text-animate";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { AuroraText } from "@/components/magicui/aurora-text";
import tmpa from "../../../public/templatea.gif";
import tmpb from "../../../public/templateb.gif";

export default function HomePage() {
  const templates = [
    {
      id: 1,
      image: tmpa,
      title: "The Proposal",
    },
    {
      id: 2,
      image: tmpb,
      title: "Nerdy Reader",
    },
    {
      id: 3,
      image:
        "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXhyY2Z5dHNmam5vdDZzcWVqd3Z3NTFuZ2tpdTk5ZXQ2Z3U0eTQ5YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/wnX0o0R1baqTMNUw3A/giphy.gif",
      title: "Coming Soon",
    },
    {
      id: 4,
      image:
        "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXhyY2Z5dHNmam5vdDZzcWVqd3Z3NTFuZ2tpdTk5ZXQ2Z3U0eTQ5YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/wnX0o0R1baqTMNUw3A/giphy.gif",
      title: "Coming Soon",
    },
  ];

  return (
    <div className="h-screen max-w-7xl md:max-w-screen-2xl mx-auto ">
      <main className="mx-auto">
        <div className="flex flex-col justify-center items-center mt-10 sm:mt-20">
          <h1 className="text-2xl sm:text-3xl lg:text-6xl font-bold tracking-tighter text-center">
            Propose Your <AuroraText>juillet</AuroraText> in a Nerdy Way
          </h1>
          <TextAnimate animation="blurInUp" by="character" className="text-center">
            Create your own valentine page in simple clicks
          </TextAnimate>
          <Link href={"/create?template=1"}>
            <RainbowButton className="mt-4">Get Started</RainbowButton>
          </Link>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-400 to-blue-700 text-center mb-8 mt-6 drop-shadow-lg animate-bounce">
          Beautiful Picks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-8">
          {templates.map((template) => (
            <Card key={template.id} className="overflow-hidden transition-transform transform hover:rotate-3 hover:scale-105 hover:shadow-xl">
              <Link href={`/create?template=${template.id}`}>
                <CardContent className="p-0">
                  <div className="relative aspect-[3/4] w-full">
                    <Image
                      src={template.image || "/placeholder.svg"}
                      alt={template.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <h3 className="absolute bottom-5 left-5 text-blue from-slate-400 to-slate-900 bg-slate-400 bg-opacity-60 px-3 py-1 rounded-md font-bold shadow-lg transform hover:scale-110 transition-transform bg-[url('/texture.png')] bg-cover bg-center">
                      {template.title}
                    </h3>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
