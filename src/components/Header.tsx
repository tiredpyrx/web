import Link from "next/link";

const Header = () => {
  return (
    <header className="p-4 bg-lime-800 text-white">
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
