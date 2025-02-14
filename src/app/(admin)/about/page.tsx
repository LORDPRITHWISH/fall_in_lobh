import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Github, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  const teamMembers = [
    {
      image: "https://i.postimg.cc/wx5hC89X/zenux.jpg",
      name: "Zenux Studios",
      github: "https://github.com/Zenux-Studios",
    },
  ];

  return (
    <div className="min-h-screen ">
      <main className="container mx-auto px-4 py-8 space-y-8">
        <section className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">About Our Project</h2>
          <Card className="max-w-3xl mx-auto">
            <CardContent className="p-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                Valentine's Templates is a delightful collection of interactive Valentine's Day cards. Our project aims to spread love and joy through creative digital expressions.
                Each template is carefully crafted to create memorable Valentine's moments.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Our Team</h2>
          <div className="mx-auto max-w-md">
            {teamMembers.map((member, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center flex flex-col items-center gap-4 p-6">
                  <Image className="rounded-full w-28 h-28 text-center" src={member.image} width={200} height={200} alt="zenux studios" />
                  <h3 className="text-4xl font-semibold text-gray-800">{member.name}</h3>
                </CardHeader>
                <CardContent className="text-center">
                  <Link href={member.github} className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700" target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 h-5" />
                    GitHub Profile
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
