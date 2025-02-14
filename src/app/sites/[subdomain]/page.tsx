"use client";
import Temp1 from "@/components/template/Temp1";
import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/spinner/Spinner";

interface SiteDetails {
  title: string;
  messages: string[];
  moods: string[];
  noButtonMessages: string[];
  celebrationMediaUrl: string;
  celebrationMessage: string;
}

export default function Home() {
  const { subdomain } = useParams();
  const router = useRouter();
  console.log(subdomain);
  const [isLoading, setIsLoading] = useState(false);

  const [siteDetails, setSiteDetails] = useState<SiteDetails>({
    title: "",
    messages: [],
    moods: [],
    noButtonMessages: [],
    celebrationMediaUrl: "",
    celebrationMessage: "",
  });
  const getSiteDetails = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/website?query=${subdomain}`);
      setSiteDetails(response.data.website);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching site details:", error);
      router.push("/404");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSiteDetails();
  }, []);

  return isLoading ? (
    <div className="flex justify-center items-center h-screen w-full bg-gradient-to-b from-pink-100 via-pink-200 to-pink-300">
      <Spinner />
    </div>
  ) : (
    <Temp1
      title={siteDetails?.title}
      messages={siteDetails?.messages}
      moods={siteDetails?.moods}
      prev={false}
      noButtonMessages={siteDetails?.noButtonMessages}
      celebrationMediaUrl={siteDetails?.celebrationMediaUrl}
      celebrationMessage={siteDetails?.celebrationMessage}
    />
  );
}
