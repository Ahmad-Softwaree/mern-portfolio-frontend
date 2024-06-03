import MagicButton from "@/components/ui/MagicButton";
import { FaLocationArrow } from "react-icons/fa";

export default function Contact() {
  return (
    <>
      <h1 className="font-bold text-white-500 w-full text-center">
        You Want Website Like this? <br />
        <span className="text-primary-500">Contact Me</span>
      </h1>
      <a href="mailto:dr.ahmad.salah.54@gmail.com">
        <MagicButton
          icon={<FaLocationArrow />}
          position="right"
          title={`Let's get in touch`}
        />
      </a>
    </>
  );
}
