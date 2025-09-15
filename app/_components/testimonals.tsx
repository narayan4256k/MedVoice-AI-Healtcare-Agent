import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";

const reviews = [
  {
    name: "Riya Sharma",
    username: "@riya",
    body: "The AI doctor consultation saved me so much time. I explained my symptoms, and within minutes I was connected to the right specialist.",
    img: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    name: "Arjun Patel",
    username: "@arjun",
    body: "I loved how the report was generated automatically after my call. It listed medicines and precautions clearly. Super useful!",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Meera Nair",
    username: "@meera",
    body: "Talking to the AI medical agent in Hindi made it so easy for my parents to use. Multi-language support is a game-changer.",
    img: "https://randomuser.me/api/portraits/women/67.jpg",
  },
  {
    name: "Aditya Verma",
    username: "@aditya",
    body: "Available 24/7! I was able to connect with a doctor late at night when I wasn’t feeling well. Truly reliable.",
    img: "https://randomuser.me/api/portraits/men/28.jpg",
  },
  {
    name: "Sneha Kapoor",
    username: "@sneha",
    body: "The voice consultation felt natural. It was like talking to a real doctor, but faster and more accessible.",
    img: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    name: "Rahul Mehta",
    username: "@rahul",
    body: "As a frequent traveler, this app is perfect. No matter where I am, I can still get medical guidance instantly.",
    img: "https://randomuser.me/api/portraits/men/41.jpg",
  },
  {
    name: "Priya Singh",
    username: "@priya",
    body: "Finally, a medical app my grandparents can use easily! They got advice in Marathi without any struggle.",
    img: "https://randomuser.me/api/portraits/women/21.jpg",
  },
  {
    name: "Vikram Desai",
    username: "@vikram",
    body: "The symptom analyzer was spot on. Suggested the right doctor before I even booked a call.",
    img: "https://randomuser.me/api/portraits/men/14.jpg",
  },
  {
    name: "Neha Joshi",
    username: "@neha",
    body: "Super quick, user-friendly, and accurate. I trust it more than googling symptoms!",
    img: "https://randomuser.me/api/portraits/women/34.jpg",
  },
  {
    name: "Kabir Malhotra",
    username: "@kabir",
    body: "Never thought I’d say this but AI + healthcare = best combo ever.",
    img: "https://randomuser.me/api/portraits/men/53.jpg",
  },
  {
    name: "Pooja Rao",
    username: "@pooja",
    body: "Easy to use and the consultation report is very professional. Perfect for keeping health records.",
    img: "https://randomuser.me/api/portraits/women/19.jpg",
  },
  {
    name: "Rohan Kulkarni",
    username: "@rohan",
    body: "Got a prescription within 15 minutes. Saved me a trip to the hospital.",
    img: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    name: "Simran Kaur",
    username: "@simran",
    body: "Best part? The AI never gets tired of my 100 questions 😂",
    img: "https://randomuser.me/api/portraits/women/56.jpg",
  },
  {
    name: "Abhay Mishra",
    username: "@abhay",
    body: "Affordable and reliable. I recommend this app to all my college friends.",
    img: "https://randomuser.me/api/portraits/men/27.jpg",
  },
  {
    name: "Tanya Bhat",
    username: "@tanya",
    body: "Helped me book the right doctor appointment directly through the app. Seamless experience!",
    img: "https://randomuser.me/api/portraits/women/39.jpg",
  },
  {
    name: "Kunal Saxena",
    username: "@kunal",
    body: "Feels futuristic. Feels safe. This is the future of healthcare.",
    img: "https://randomuser.me/api/portraits/men/18.jpg",
  },
  {
    name: "Ishita Roy",
    username: "@ishita",
    body: "Was surprised by how accurate the translation was when I spoke in Bengali. Amazing!",
    img: "https://randomuser.me/api/portraits/women/72.jpg",
  },
  {
    name: "Nikhil Jain",
    username: "@nikhil",
    body: "The AI calmed me down during a panic attack. Honestly, worth more than 5 stars.",
    img: "https://randomuser.me/api/portraits/men/49.jpg",
  },
  {
    name: "Aditi Deshmukh",
    username: "@aditi",
    body: "Love how it remembers my past reports. Feels like a personalized health assistant.",
    img: "https://randomuser.me/api/portraits/women/29.jpg",
  },
  {
    name: "Siddharth Menon",
    username: "@sid",
    body: "I’ve tried many health apps. None felt this polished and trustworthy.",
    img: "https://randomuser.me/api/portraits/men/9.jpg",
  },
  {
    name: "Kavya Sharma",
    username: "@kavya",
    body: "Got advice in just 2 minutes! Beats waiting in clinic queues any day.",
    img: "https://randomuser.me/api/portraits/women/77.jpg",
  },
  {
    name: "Harshit Agarwal",
    username: "@harshit",
    body: "Really liked the smooth UI and fast responses. Doesn’t feel like a beta product at all.",
    img: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    name: "Divya Iyer",
    username: "@divya",
    body: "Can’t believe healthcare can be this simple. Hats off to the devs!",
    img: "https://randomuser.me/api/portraits/women/50.jpg",
  },
  {
    name: "Manav Kapoor",
    username: "@manav",
    body: "Instant advice. Accurate answers. Stress-free experience every time.",
    img: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Ananya Sen",
    username: "@ananya",
    body: "This is my go-to app whenever I feel unwell. Trustworthy and quick.",
    img: "https://randomuser.me/api/portraits/women/63.jpg",
  },
  {
    name: "Ritesh Gupta",
    username: "@ritesh",
    body: "The doctor suggestions were on point. Exactly who I needed to consult.",
    img: "https://randomuser.me/api/portraits/men/23.jpg",
  },
];



const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden mb-10">
      <Marquee  className="[--duration:60s] md:[--duration-50s] lg:[--duration:40s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse  className="[--duration:50s] md:*[--duration-40s] lg:[--duration-30s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}
