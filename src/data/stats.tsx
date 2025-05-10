import { BsBarChartFill, BsFillStarFill,BsFillBox2Fill,          // palet ikonu
  BsFillEmojiSmileFill } from "react-icons/bs";
import { PiGlobeFill } from "react-icons/pi";
import { HiOutlineMap } from 'react-icons/hi';

import { IStats } from "@/types";

export const stats: IStats[] = [
    {
        title: "100.000+",
        icon: <BsBarChartFill size={34} className="text-blue-500" />,
        description: 'Müşterilerimizin bugüne dek bize emanet ettiği palet adedi.'
    },
    {
        title: "100+",
        icon: <BsFillStarFill size={34} className="text-yellow-500" />,
        description: "Kurumsal Müşteri Sayısı"
    },
    {
        title: "5000+ ",
        icon: <BsFillBox2Fill className="w-8 h-8 text-accent" />,
        description: "Palet Kapasitesi."
    }
    
];