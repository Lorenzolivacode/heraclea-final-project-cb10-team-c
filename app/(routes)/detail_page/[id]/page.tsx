"use client";
import React, { useEffect } from "react";
import eracleaData from "@/app/data";
import Carousel from "@/app/components/Molecoles/Carousel/Carousel";

interface UserProps {
  params: { id: string };
}
function DetailPage({ params }: UserProps) {
  const { id } = params;

  const obj = eracleaData[0].subcategory.find((item) => item.id === id);

  /* useEffect(() => {
    console.log("Params ID:", id);
    console.log("Data:", eracleaData[0].subcategory);
  }, []); */
  if (!obj) {
    return (
      <main className="main">
        <h1>404 Not found</h1>
      </main>
    );
  }
  return (
    <main className="main">
      <Carousel images={obj.images} />
      <h1>{obj.title.italian}</h1>
      <p>{obj.description.italian}</p>
    </main>
  );
}

export default DetailPage;
