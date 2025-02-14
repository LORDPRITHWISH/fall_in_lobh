"use client";
import Temp1 from "@/components/template/Temp1";
import Temp2 from "@/components/template/Temp2";
import Temp3 from "@/components/template/Temp3";
import Temp4 from "@/components/template/Temp4";
import Temp5 from "@/components/template/Temp5";
import { useParams } from "next/navigation";

const title = "Love Bliss";

const messages = [
  `Welcome, my Love 👑`,
  `Your presence brightens my day...`,
  `Every moment is magical ✨`,
  `You're absolutely incredible 🌟`,
  `Together, we create perfection 🎵`,
  `Will you be my Valentine? 🌹`,
];

const moods = [
  "superHappy",
  "excited",
  "happy",
  "hopeful",
  "nervous",
  "question",
];

const noButtonMessages = [
  "No",
  "Are you sure?",
  "Really sure?",
  "Think again!",
  "Last chance!",
  "Surely not?",
  "You might regret this!",
  "Give it another thought!",
  "Are you absolutely certain?",
  "This could be a mistake!",
  "Have a heart!",
  "Don't be so cold!",
  "Change of heart?",
  "Wouldn't you reconsider?",
];

export default function Home() {
  const { no } = useParams();
  console.log(no);

  
    const celebrationMediaUrl =
      "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzMxbWtuYTFldDdtd3I3MmxzMXc4ZjJneHA2dWVsODJndXlwYTBqdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/UkfUod3TFW66J2BWKK/giphy.gif";
  
  
  const celebrationMessage = "Congratulations! we have a date! 🎉";

  switch (no) {
    case "1":
      return (
        <Temp1
          title={title}
          messages={messages}
          moods={moods}
          prev={false}
          noButtonMessages={noButtonMessages}
          celebrationMediaUrl={celebrationMediaUrl}
          celebrationMessage={celebrationMessage}
        />
      );
    case "2":
      return (
        <Temp2
          title={title}
          messages={messages}
          moods={moods}
          prev={false}
          noButtonMessages={noButtonMessages}
          celebrationMediaUrl={celebrationMediaUrl}
          celebrationMessage={celebrationMessage}
        />
      );
    case "3":
      return (
        <Temp3
          title={title}
          messages={messages}
          moods={moods}
          prev={false}
          noButtonMessages={noButtonMessages}
          celebrationMediaUrl={celebrationMediaUrl}
          celebrationMessage={celebrationMessage}
        />
      );
    case "4":
      return (
        <Temp4
          title={title}
          messages={messages}
          moods={moods}
          prev={false}
          noButtonMessages={noButtonMessages}
          celebrationMediaUrl={celebrationMediaUrl}
          celebrationMessage={celebrationMessage}
        />
      );
    case "5":
      return (
        <Temp5
          title={title}
          messages={messages}
          moods={moods}
          prev={false}
          noButtonMessages={noButtonMessages}
          celebrationMediaUrl={celebrationMediaUrl}
          celebrationMessage={celebrationMessage}
        />
      );
    default:
      return <div>Default Template</div>;
  }
}
