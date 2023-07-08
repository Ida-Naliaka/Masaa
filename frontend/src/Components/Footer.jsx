import React from "react";
import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
} from "@material-ui/icons";
import {useNavigate} from 'react-router-dom'

const Footer = () => {
  const navigate= useNavigate();
  return (
    <div className="bg-black text-white">
      <div className="flex p-5 flex-1 flex-col justify-center items-center flex-wrap w-full">
        <div className="flex flex-row justify-center items-center flex-wrap w-full">
          <div className="flex ">
            <a
              href="https://github.com/Ida-Naliaka"
              style={{ textDecoration: "none" }}
            >
              <div className="w-10 h-10 text-[white] flex items-center justify-center mr-5 rounded-[50%] bg-[#3B5999]">
                <Facebook />
              </div>
            </a>
            <a href="https://github.com/Ida-Naliaka">
              <div className="w-10 h-10 text-[white] flex items-center justify-center mr-5 rounded-[50%] bg-[#E4405F]">
                <Instagram />
              </div>
            </a>
            <a href="https://github.com/Ida-Naliaka">
              <div className="w-10 h-10 text-[white] flex items-center justify-center mr-5 rounded-[50%] bg-[#E60023]">
                <Pinterest />
              </div>
            </a>
          </div>
        </div>
        <div className="flex md:flex-row flex-col justify-center items-center flex-wrap w-full">
          <div className="flex items-center md:mb-5 mb-2.5 p-[5px]">
            <Phone style={{ marginRight: "5px" }} />
            +254 7123 45678
          </div>
          <div className="flex items-center md:mb-5 mb-2.5 p-[5px]">
            <MailOutline style={{ marginRight: "10px" }} />
            wafulaida@gmail.com
          </div>
          <div className="flex items-center md:mb-5 mb-2.5 p-[5px]" onClick={()=>navigate('/admin/product/display')}>
            <Room style={{ marginRight: "10px" }} />
            Bihi Towers, Moi Avenue
          </div>
        </div>
      </div>
      <small> &copy;Masaa | All Rights Reserved</small>
    </div>
  );
};

export default Footer;
