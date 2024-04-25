import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="p-5 w-full grid grid-cols-1 md:grid-cols-2 gap-5 bg-black-600 shadow-xl text-white-500">
      <div className="flex order-2 md:order-1 flex-row justify-center md:justify-start items-center gap-5 col-span-full md:col-span-1">
        <p className="text-white-500 text-text1-light md:text-body1-light text-center">
          Ahmad.dev
        </p>
        <div className="w-[2px] h-[20px] bg-white-500 rounded-xl"></div>
        <p className="text-white-500 text-text2-light md:text-body2-light text-center">
          all rights received &copy; {new Date().getFullYear()}
        </p>
      </div>
      <div className="flex order-1 md:order-2 flex-row justify-center md:justify-end items-center gap-5 col-span-full md:col-span-1">
        <Link
          to={`/privacy_policy`}
          className="text-white-500 text-text2-light md:text-body2-light text-center">
          Privacy Policy
        </Link>
        <div className="w-[2px] h-[20px] bg-white-500 rounded-xl"></div>
        <div className="flex flex-row justify-center items-center gap-2 col-span-full md:col-span-1">
          <a
            target="_blank"
            className="p-2 opacity-90 text-body1-semibold transition-all duration-200 hover:opacity-100"
            href="https://www.facebook.com/profile.php?id=100046621759093">
            <i className="fa-brands fa-facebook"></i>
          </a>

          <a
            target="_blank"
            className="p-2 opacity-90 text-body1-semibold transition-all duration-200 hover:opacity-100"
            href="https://www.youtube.com/channel/UCAiNkVKFGi1QRZARjyG2yuw">
            <i className="fa-brands fa-youtube"></i>
          </a>

          <a
            target="_blank"
            className="p-2 opacity-90 text-body1-semibold transition-all duration-200 hover:opacity-100"
            href="https://github.com/Ahmad-Softwaree">
            <i className="fa-brands fa-github"></i>
          </a>

          <a
            target="_blank"
            className="p-2 opacity-90 text-body1-semibold transition-all duration-200 hover:opacity-100"
            href="https://www.linkedin.com/in/ahmad-salah-50519022a/">
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
