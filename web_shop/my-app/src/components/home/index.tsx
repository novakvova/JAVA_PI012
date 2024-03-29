import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { APP_ENV } from "../../env";
import { ICategoryItem } from "./types";

const Home = () => {
  const [list, setList] = useState<Array<ICategoryItem>>([]);

  useEffect(() => {
    axios
      .get<Array<ICategoryItem>>(`${APP_ENV.REMOTE_HOST_NAME}api/categories`)
      .then((resp) => {
        console.log("resp = ", resp);
        setList(resp.data);
      });
  }, []);
  console.log("List data: ", list);

  const content = list.map((category) => (
    <div key={category.id} className="group relative">
      <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
        <div className="picture-main">
          <img
            src={`${APP_ENV.REMOTE_HOST_NAME}files/600_${category.image}`}
            alt={category.name}
            className="picture-container"
          />
        </div>
      </div>
      <h3 className="mt-6 text-sm text-gray-500">
        <a href="#">
          <span className="absolute inset-0" />
          {category.name}
        </a>
      </h3>
      <p className="text-base font-semibold text-gray-900">
        {category.description}
      </p>
    </div>
  ));

  return (
    <>
      <div className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-10 sm:py-16 lg:max-w-none lg:py-20">
            <h2 className="text-2xl font-bold text-gray-900">Категорії</h2>

            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {content}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
