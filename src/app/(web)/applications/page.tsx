import Link from "next/link";
import React from "react";

function Page() {
  return (
    <>
      <div className="h-max-[220px] text-black/80 shadow-lg rounded-md overflow-hidden">
        <img
          className="w-full h-[160px] object-cover"
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-thsyY7pcpafX5U5CN_fkREa_Bmrvak0sRg&s"
          }
          alt={""}
        />
        <div className="p-4">
          <Link
            href={"/applications"}
            className="hover:underline hover:text-blue-400 visited:hover:text-blue-500 duration-100"
          >
            {" "}
            <h2 className="font-semibold text-sm mb-2">Application Name</h2>
          </Link>
          <article className="max-h-52 overflow-y-scroll">
            <p className="text-xs">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Necessitatibus aspernatur quidem maxime eius! Nihil quos dolor
              soluta itaque eius iure! Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Velit asperiores iure quo dignissimos sequi
              aliquam numquam, id sed! Temporibus laboriosam mollitia autem non
              laborum quisquam ea rerum. Soluta, ad corrupti. Ipsa amet ab
              quisquam corporis ducimus illo qui, voluptate dignissimos nemo
              harum, quidem dolore sapiente aliquam laborum dolor accusamus
              eligendi possimus totam illum numquam ipsam eum! Sapiente quaerat
              quas eligendi. Pariatur ipsam tempora rem voluptatum voluptatem
              officiis, sequi numquam aliquam at reprehenderit error corrupti?
              Adipisci quas neque inventore at illum cumque libero, eos
              voluptas, officiis hic a consectetur reiciendis debitis! Ab, enim
              molestias. Inventore ad rerum ducimus unde consequuntur odit
              libero impedit, dignissimos, voluptas et numquam consectetur
              accusantium eveniet, illo minima vero sequi possimus aliquam
              doloremque nam earum tempora voluptatum!
            </p>
          </article>
        </div>
      </div>
    </>
  );
}

export default Page;
