import React, { useContext, useState } from "react";
import EmailInput from "../inputs/EmailInput";
import { AlertContext } from "../../context/AlertContext";
import { SubscribeContext } from "../../context/SubscribeContext";
import { addSubscribe } from "../../context/actions/subscribeAction";
import SpinnerLoading from "../global/SpinnerLoading";
import { LanguageContext } from "../../context/LanguageContext";

export default function ContactCard() {
  const [email, setEmail] = useState("");
  const { dispatch: alertDispatch } = useContext(AlertContext);
  const {
    state: { file },
  } = useContext(LanguageContext);
  const {
    dispatch: subscribeDispatch,
    state: { addSubscribeLoading },
  } = useContext(SubscribeContext);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addSubscribe(subscribeDispatch, alertDispatch, { email }, setEmail);
      }}
      className="p-10 bg-black rounded-md flex flex-col justify-left items-start gap-[10px] min-w-[350px] md:w-[500px] h-[300px]"
    >
      <h1 className="font-bold !text-[20px] text-white">{file.contact.get}</h1>
      <p className="text-white !text-[14px]">{file.contact.sub}</p>

      <EmailInput
        className={`w-full bg-black mt-[30px]`}
        textInputClass={`!bg-black !text-white`}
        title={`Email`}
        value={email}
        titleClass={`!bg-black`}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        type="submit"
        disabled={addSubscribeLoading}
        className="!text-[14px] text-blue border-2 border-solid border-blue rounded-md transition-all duration-300 hover:bg-blue hover:text-black p-2 px-4 w-full"
      >
        {addSubscribeLoading ? (
          <SpinnerLoading size={`30px`} />
        ) : (
          file.contact.subButton
        )}
      </button>
    </form>
  );
}
