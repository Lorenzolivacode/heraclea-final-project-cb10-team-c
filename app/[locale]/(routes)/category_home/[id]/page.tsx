import eracleaData from "@/app/[locale]/data";
import Card from "@/app/[locale]/components/Molecoles/Card/Card";
import { ISubObj } from "@/app/[locale]/Interface/Interface_eracleaData";
import dynamic from "next/dynamic";
import Loader from "@/app/[locale]/components/Atom/Loader/Loader";
import { useTranslations } from "next-intl";

interface CategoryProps {
  params: { id: string };
}

function CategoryPage({ params }: CategoryProps) {
  const { id } = params;
  const t = useTranslations("eracleaDataSubcategory");
  const tCat = useTranslations("eracleaDataCategory");
  const isArcheo = eracleaData.some(
    //scorro gli obj di eracleaData
    (category, index) => index === 1 && category.id === id
    //se trovo una corrispondenza con entrambe le condizioni, vuol dire che l'id di riferimento fa parte della categoria archeo
  );

  const catId = Number(id);
  let categoryIndex;
  if (!isNaN(catId)) {
    categoryIndex = catId - 1;
  }

  const obj = eracleaData.find((item) => item.id === id); // trovo la subcategory all'id di riferimento
  if (!obj || categoryIndex === undefined) {
    return (
      <main className="main">
        <h1>404 Not found</h1>
      </main>
    );
  }

  const Map = dynamic(
    () => import("@/app/[locale]/components/Molecoles/Map/Map"),
    {
      loading: () => <Loader />,
      ssr: false,
    }
  );

  return (
    <main className="main">
      <h1>{tCat(obj.titleDetails)}</h1>
      {isArcheo && <Map posix={[37.394118, 13.28136]} zoom={17} />}
      {eracleaData[categoryIndex].subcategory.map((point: ISubObj) => {
        return (
          <Card
            key={point.id}
            roadmap={`/detail_page/${point.id}`}
            label={t(point.title)}
            image={point.images[1]}
          />
        );
      })}
    </main>
  );
}

export default CategoryPage;
