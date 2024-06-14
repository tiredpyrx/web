"use client";

import { useIsClient } from "@/app/contexts/IsClientContext";
import classNames from "classnames";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Header = () => {
  const headerRef = useRef<HTMLElement>(null);
  const [isFadable, setIsFadable] = useState(false);
  const isClient = useIsClient();
  useEffect(() => {
    if (!isClient) return;
    setIsFadable(
      !!headerRef.current && (window.screenTop > 0 || window.scrollY > 0)
    );
    const scrollListener = () => {
      setIsFadable(!!headerRef.current && window.scrollY > 0);
    };
    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  }, [isClient]);

  return (
    <header
      ref={headerRef}
      className={classNames(
        "p-4 bg-lime-800 text-white sticky top-0 duration-200 z-50",
        {
          "opacity-70": isFadable,
        }
      )}
    >
      <nav>
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <div className="select-none pointer-events-none">
                <img
                  width={50}
                  src="/media/images/logo.png"
                  alt="osama bin laden"
                />
              </div>
              <div className="text-base font-light text-pretty">
                <Link
                  href={"/"}
                  className="hover:underline hover:text-blue-400 duration-100"
                >
                  dogakorkmaz.com
                </Link>
              </div>
            </div>
            <div>
              <ul className="flex items-center gap-x-4">
                <li className="text-base font-light text-pretty">
                  <Link
                    href={"/applications"}
                    className="hover:underline hover:text-blue-400 visited:hover:text-blue-500 duration-100"
                  >
                    apps
                  </Link>
                </li>
                <li className="text-base font-light text-pretty">
                  <Link
                    href={"/aboutme"}
                    className="hover:underline hover:text-blue-400 visited:hover:text-blue-500 duration-100"
                  >
                    aboutme
                  </Link>
                </li>
                <li className="text-base font-light text-pretty">
                  <Link
                    href={"/contactme"}
                    className="hover:underline hover:text-blue-400 visited:hover:text-blue-500 duration-100"
                  >
                    contactme
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export { Header };
