import dynamic from "next/dynamic";
import React, { useMemo } from "react";

function Itineraries() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/app/components/Molecoles/Map/Map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );
  return (
    <div>
      <Map posix={[37.394118, 13.28136]} zoom={18} />
    </div>
  );
}

export default Itineraries;
