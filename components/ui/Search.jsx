import Image from "next/image";
import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Title from "../ui/Title";
import { GiCancel } from "react-icons/gi";
import axios from "axios";
import { useEffect } from "react";
import Input from "../form/Input";
import { useRouter } from "next/router";

const Search = ({ setIsSearchModal }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/products`
        );
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  const handleSearch = (e) => {

    setSearch(e.target.value);
    const searchFilter = products.filter((product) => product.title.toLowerCase().inCludes(e.target.value.toLowerCase()))

  }

  console.log(products);
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 after:content-[''] after:w-screen after:h-screen after:bg-white after:absolute after:top-0 after:left-0 after:opacity-60 grid place-content-center">
      <OutsideClickHandler onOutsideClick={() => setIsSearchModal(false)}>
        <div className="w-full h-full grid place-content-center relative">
          <div className="relative z-50 md:w-[600px] w-[370px]  bg-white border-2 p-10 rounded-3xl">
            <Title addClass="text-[40px] text-center">Search</Title>
            <Input placeholder="Search..." onChange={handleSearch} />
            {products.length > 0 ? (
              <ul className="mt-4">
                {products.slice(0, 5).map((product) => (
                  <li
                    className="flex items-center justify-between p-1 hover:bg-primary transition-all px-2 cursor-pointer"
                    key={product._id}
                    onClick={() => {
                      router.push(`/product/${product?._id}`);
                      setIsSearchModal(false);
                    }}
                  >
                    <div className="relative flex">
                      <Image
                        src={product?.img}
                        alt={product?.title}
                        width={48}
                        height={48}
                      />
                    </div>
                    <span className="font-bold">{product?.title}</span>
                    <span className="font-bold">${product?.prices[0]}</span>
                  </li>
                ))}
              </ul>
            ) : (
              ""
            )}
            <button
              className="absolute  top-4 right-4"
              onClick={() => setIsSearchModal(false)}
            >
              <GiCancel size={25} className=" transition-all" />
            </button>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default Search;
