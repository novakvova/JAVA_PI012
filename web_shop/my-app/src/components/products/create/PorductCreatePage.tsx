import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { APP_ENV } from "../../../env";
import { ICategoryItem } from "../../home/types";
import { IPorductCreate } from "../types";

const ProductCreatePage = () => {
  const navigator = useNavigate();
  const [model, setModel] = useState<IPorductCreate>({
    name: "",
    category_id: "",
    price: 0,
    description: "",
    files: [],
  });
  const [categories, setCategories] = useState<Array<ICategoryItem>>([]);

  useEffect(() => {
    axios
      .get<Array<ICategoryItem>>(`${APP_ENV.REMOTE_HOST_NAME}api/categories`)
      .then((resp) => {
        console.log("resp = ", resp);
        setCategories(resp.data);
      });
  }, []);

  const content = categories.map((category) => (
    <option key={category.id} value={category.id}>
      {category.name}
    </option>
  ));

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    //console.log("input", e.target);
    setModel({ ...model, [e.target.name]: e.target.value });
  };

  const onChangeSelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    //console.log("input", e.target);
    //console.log("input", e.target.value);
    setModel({ ...model, [e.target.name]: e.target.value });
  };

  const onFileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //console.log("files", e.target.files);
    const { target } = e;
    if (target.files) {
      const file = target.files[0];
      setModel({ ...model, files: [...model.files, file] });
    }
    e.target.value="";
  };
  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${APP_ENV.REMOTE_HOST_NAME}api/products`,
        model,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      navigator("/");
    } catch (e: any) {}
  };

  const filesContent = model.files.map((f, index) => (
    <div key={index} className="mb-4">
      <Link
        to="#"
        onClick={(e) => {
          e.preventDefault();
          setModel({ ...model, files: model.files.filter((x) => x !== f) });
          console.log("click delete", f);
        }}
      >
        <FaTrash className="m-2 " />
      </Link>
      <div className="relative">
        <div style={{ height: "150px" }}>
          <div className="picture-main">
            <img
              src={URL.createObjectURL(f)}
              className="picture-container"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  ));
  return (
    <div className="mx-auto max-w-7xl px-6">
      <h1 className="font-medium text-3xl">Додати товар</h1>
      <form onSubmit={onSubmitHandler}>
        <div className="mt-8 grid lg:grid-cols-1 gap-4">
          <div>
            <label
              htmlFor="name"
              className="text-sm text-gray-700 block mb-1 font-medium"
            >
              Назва
            </label>
            <input
              type="text"
              name="name"
              value={model.name}
              onChange={onChangeHandler}
              id="name"
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Вкажіть назву"
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="text-sm text-gray-700 block mb-1 font-medium"
            >
              Ціна
            </label>
            <input
              type="number"
              name="price"
              value={model.price}
              onChange={onChangeHandler}
              id="price"
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Вкажіть ціна"
            />
          </div>

          <div>
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Оберіть категорію
            </label>
            <select
              onChange={onChangeSelectHandler}
              id="category_id"
              name="category_id"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Виберіть категорію</option>
              {content}
            </select>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Опис
            </label>
            <textarea
              id="description"
              name="description"
              value={model.description}
              onChange={onChangeHandler}
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Вкажіть опис..."
            ></textarea>
          </div>

          <div>
            <div className="grid lg:grid-cols-8 md:grid-cols-6 sm:grid-cols-4 grid-cols-2 items-center gap-4">
              {filesContent}
            </div>
            <label className="block text-sm font-medium text-gray-700">
              Фото
            </label>

            <div className="mt-1 flex items-center">
              <label
                htmlFor="selectImage"
                className="ml-5 rounded-md border border-gray-300 bg-white 
                        py-2 px-3 text-sm font-medium leading-4 text-gray-700 
                        shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 
                        focus:ring-indigo-500 focus:ring-offset-2"
              >
                Додати фото
              </label>
            </div>

            <input
              type="file"
              onChange={onFileChangeHandler}
              id="selectImage"
              className="hidden"
            />
          </div>
        </div>
        <div className="space-x-4 mt-8">
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
          >
            Save
          </button>
          <button className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductCreatePage;
