import axios, { Axios } from "axios";
import { ChangeEvent, ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ICategoryCreate } from "../types";

const CategoryCreatePage = () => {
    const navigator = useNavigate();
  const [model, setModel] = useState<ICategoryCreate>({
    name: "",
    description: "",
    base64: "",
  });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    //console.log("input", e.target);
    setModel({...model, [e.target.name]: e.target.value});
  }
  const onFileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //console.log("files", e.target.files);
    const {target} = e;
    const {files} = target;
    if(files) {
        const file = files[0];
        const fileReader = new FileReader(); 
        fileReader.readAsDataURL(file);
        fileReader.onload=(e) =>{
            const result = e.target?.result as string;
            console.log("Read all bytes", );
            setModel({...model, base64: result});
        };
    }
    
    target.value="";
    //setModel({...model, [e.target.name]: e.target.value});
  }

  const onSubmitHandler= async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        const result = await axios.post("http://localhost:8081/api/categories", model);
        navigator("/");

    }catch(e: any) {

    }
    
  }

  return (
    <>
      <div className="p-8 rounded border border-gray-200">
        <h1 className="font-medium text-3xl">Додати категорію</h1>

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
                placeholder="Вкажіть назву категорії"
              />
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
              <label className="block text-sm font-medium text-gray-700">
                Фото
              </label>

              <div className="mt-1 flex items-center">
                <label
                  htmlFor="selectImage"
                  className="inline-block w-20 overflow-hidden bg-gray-100"
                >
                  {model.base64 === "" ? (
                    <svg
                      className="h-full w-full text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <img src={model.base64} />
                  )}
                </label>
                <label
                  htmlFor="selectImage"
                  className="ml-5 rounded-md border border-gray-300 bg-white 
                        py-2 px-3 text-sm font-medium leading-4 text-gray-700 
                        shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 
                        focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Change
                </label>
              </div>

              <input
                type="file"
                onChange={onFileChangeHandler}
                id="selectImage"
                className="hidden"
              />
            </div>

            {/* <div>
              <label className="block text-sm font-medium text-gray-700">
                Cover photo
              </label>
              <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div> */}
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
            </button>{" "}
          </div>{" "}
        </form>
      </div>
    </>
  );
};

export default CategoryCreatePage;
