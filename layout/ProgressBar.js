import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PageTransitionEffect() {
  const [show, setShow] = useState(false);
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", routeChangeHandler);
    router.events.on("routeChangeComplete", routeChangeHandler);

    return () => {
      router.events.off("routeChangeComplete", routeChangeHandler);
      router.events.off("routeChangeComplete", routeChangeHandler);
    };
  }, []);

  function routeChangeHandler() {
    setShow((show) => !show);
  }

  return show ? (
    <div className="container">
      <style jsx>{`
        .container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background-color: lightgreen;
        }

        .container::before {
          content: "";
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          height: 100%;
          background-color: rgba(0, 222, 0, 0.5);
          animation: toLeft 0.5s ease infinite;
        }

        @keyframes toLeft {
          to {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  ) : (
    ""
  );
}
