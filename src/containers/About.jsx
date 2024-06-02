import { Tabs } from "@/components/ui/tabs";

export default function About() {
  const tabs = [
    {
      title: "My Self",
      value: "myself",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>About My Self</p>
          <p>1.My name is Ahmad, I'm 21 Years Old from Kurdistan Iraq</p>
        </div>
      ),
    },
    {
      title: "Education",
      value: "education",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Education</p>
          <p>
            1. 1 Year Studying Bachelor In Computer Science, Sulaymaniah
            University
          </p>
          <p>2. Student In Software Engineer, Salahadin University</p>
        </div>
      ),
    },
    {
      title: "Experience",
      value: "experience",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Experience</p>
          <p>1. Developing Good UI/UX Front-end With React.js</p>
          <p>2. Developing Good Back-end With Node.js & Express.js</p>
          <p>3. Project Manager & Developer at Bester Group</p>
          <p>4. Full-stack Developer in Bester Group</p>
          <p>5. Full-stack Developer in Kurdferga Group</p>
          <p>6. Front-end Developer in Informatics</p>
        </div>
      ),
    },
  ];

  return (
    <>
      <h1 className="serviceHeader font-bold text-white-500">About</h1>
      <div className="h-[25rem] [perspective:1000px] relative  flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-10">
        <Tabs tabs={tabs} />
      </div>
    </>
  );
}
