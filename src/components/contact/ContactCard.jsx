import React, { useState } from "react";
import EmailInput from "../inputs/EmailInput";

export default function ContactCard() {
  const [email, setEmail] = useState("");
  return (
    <div className="p-10 bg-black rounded-md flex flex-col justify-left items-start gap-[10px] min-w-[350px] md:w-[500px] h-[300px]">
      <h1 className="font-bold !text-[20px] text-white">Get the best deals</h1>
      <p className="text-white !text-[14px]">Subscribe to get more!</p>

      <EmailInput
        className={`w-full bg-black mt-[30px]`}
        textInputClass={`!bg-black`}
        title={`Email`}
        value={email}
        titleClass={`!bg-black`}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        type="button"
        className="!text-[14px] text-blue border-2 border-solid border-blue rounded-md transition-all duration-300 hover:bg-blue hover:text-black p-2 px-4 w-full"
      >
        Subscribe
      </button>
    </div>
  );
}
