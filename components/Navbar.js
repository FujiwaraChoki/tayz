import React, { useState } from "react";
import Navbar from "reactjs-navbar";
import { useRouter } from "next/router";
import {
    faUser,
    faBookOpen,
    faGlobe,
    faCogs,
    faHome,
    faChartPie,
    faKey,
    faCheese,
    faWater,
    faSignIn,
    faSignOut,
    faContactCard,
} from "@fortawesome/free-solid-svg-icons";
import { ThreeDots } from "react-loader-spinner";

export default function Nav() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    return (
        <Navbar
            logo={"https://i.imgur.com/xmjg60H.png"}
            loader={<ThreeDots color="#fff" height={30} width={30} />}
            isLoading={isLoading}
            helpCallback={() => {
                alert("I need help... and coffee...");
            }}
            menuItems={[
                {
                    title: "Home",
                    icon: faHome,
                    isAuth: true,
                    onClick: () => {
                        router.push("/");
                    }
                },
                {
                    title: "Contact",
                    icon: faContactCard,
                    isAuth: () => {
                        // Claim authorization logic...
                        return true;
                    },
                    onClick: () => {
                        router.push("/contact");
                    }
                },
                {
                    title: "Socials",
                    icon: faGlobe,
                    isAuth: true
                }, {
                    title: "Settings",
                    icon: faCogs,
                    isAuth: true,
                    subItems: [
                        {
                            title: "Account",
                            icon: faUser,
                            isAuth: true,
                            subItems: [
                                { title: "Login", icon: faSignIn, isAuth: true },
                                {
                                    title: "Register",
                                    icon: faKey,
                                    isAuth: true,
                                },
                                {
                                    title: "Logout",
                                    icon: faSignOut,
                                    isAuth: true,
                                    onClick: () => {
                                        setIsLoading(true);
                                    }
                                }
                            ]
                        },
                        {
                            title: "Subitem 3",
                            icon: faWater,
                            isAuth: () => {
                                // Claim authorization logic...
                                return false;
                            }
                        }
                    ]
                },
                {
                    title: "Reports",
                    icon: faChartPie,
                    isAuth: true
                }
            ]}
        />
    );
}