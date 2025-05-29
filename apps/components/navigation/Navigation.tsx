"use client";

import Image from "next/image";
import logo from '@/public/Logo.jpg';
import { JSX } from "react";

const Navigation: React.FC = (): JSX.Element => {
    return (
        <Image 
            alt="Logo"
            src={logo}
            width={150}
            height={150}
        />
    );
};

export default Navigation;