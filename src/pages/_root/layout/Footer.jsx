import { Loader } from "@/components/shared";
import Logo from "@/components/shared/Logo";

const Footer = () => {
  return (
    <footer className="p-5 w-full flex flex-col justify-center items-center gap-5 bg-black-600 shadow-xl text-white-500">
      <p className="text-white font-bold !text-[18px] w-full text-center">
        Ahmad Software all rights received &copy; {new Date().getFullYear()}
      </p>
      <div className="w-full flex flex-row justify-center items-center gap-5">
        <span className="p-2 rounded-full border-2 border-solid border-purple text-purple transition-all duration-300 hover:bg-purple hover:text-white px-[14px] !text-[22px]">
          <a
            target="_blank"
            href="https://www.facebook.com/profile.php?id=100046621757093">
            <i className="fa-brands fa-facebook"></i>
          </a>
        </span>
        <span className="p-2 rounded-full border-2 border-solid border-purple text-purple transition-all duration-300 hover:bg-purple hover:text-white px-[14px] !text-[22px]">
          <a
            target="_blank"
            href="https://www.youtube.com/channel/UCAiNkVKFGi1QRZARjyG2yuw">
            <i className="fa-brands fa-youtube"></i>
          </a>
        </span>
        <span className="p-2 rounded-full border-2 border-solid border-purple text-purple transition-all duration-300 hover:bg-purple hover:text-white px-[14px] !text-[22px]">
          <a target="_blank" href="https://github.com/Ahmad-Softwaree">
            <i className="fa-brands fa-github"></i>
          </a>
        </span>

        <span className="p-2 rounded-full border-2 border-solid border-purple text-purple transition-all duration-300 hover:bg-purple hover:text-white px-[14px] !text-[22px]">
          <a
            target="_blank"
            href="https://www.linkedin.com/in/ahmad-salah-50519022a/">
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
