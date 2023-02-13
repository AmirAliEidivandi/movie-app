import { FC } from "react";
import { AiFillGithub, AiFillInstagram } from "react-icons/ai";

const Footer: FC = () => {
  return (
    <div className="bg-dark-lighten text-white flex justify-between items-center py-3 px-4 shadow-md mt-3">
      <p className="flex gap-2">
        <span>Copyright _AmirAli</span>
        <span className="hidden md:block"> &copy; 1/28/2023</span>
      </p>
      <div className="flex gap-3 items-center">
        <p className="hidden md:block">Contact me: </p>
        <div className="flex gap-2">
          <a
            href="https://github.com/AmirAliEidivandi"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#6e5494] transition duration-300"
          >
            <AiFillGithub size={25} />
          </a>
          <a
            href="https://www.instagram.com/amirali_edv_"
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary transition duration-300"
          >
            <AiFillInstagram size={25} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
