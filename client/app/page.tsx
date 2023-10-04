import { agenda } from "@/consts/agenda";
import { FC } from "react";



const Home: FC = () => {
  return <main className="flex flex-col mx-28 ">
    <h1 className="text-lg mt-10 mb-2 font-bold text-center">MongoDB-Express-React-NodeJs</h1>
    <ul className="list-disc">
      {agenda.map(({ point }) =>
        <li key={point} className="p-3">{point}</li>
      )}
    </ul>
  </main>;
};

export default Home;
