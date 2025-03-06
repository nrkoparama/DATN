"use client";
import Link from "next/link";
import useSWR from "swr";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { addItem } from "@/redux/slices/cartSlice";
import type Product from "../app/models/Product";

export default function Home() {
  const [selectedSize, setSelectedSize] = useState(0);
  const dispatch = useDispatch();
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR<Product[]>(
    "http://localhost:3000/products",
    fetcher,
    {
      refreshInterval: 3000,
    }
  );
  if (!data) return <div>Loading...</div>;
  if (error) return <div>Lỗi fetching data: {error.message}</div>;

  function handleAdd(product: Product) {
    if (selectedSize === 0) {
      alert("Vui lòng chọn size giày");
    } else {
      dispatch(addItem(product));
    }
  }

  return (
    <div>
      <div className="m-[48px]">
        <Link href="/pages/cart">
          <div>giỏ hàng</div>
        </Link>
        {data.map((product: Product) => (
          // <Link href={`/pages/product-detail/${product._id}`} key={product._id}>
          <div
            key={product._id}
            className="w-[20%] bg-[#fff] rounded-lg mx-auto my-[8px] p-[14px] hover:shadow-lg flex flex-col space-y-[8px]"
          >
            <img
              src={`/assets/images/${product.image}`}
              alt=""
              className="rounded"
            />
            <p>{product.name}</p>
            <div className="text-[#D92D20]">
              {product.price}
              {product.priceSale && (
                <span className="text-[#000000] opacity-60 line-through ml-[8px]">
                  {product.priceSale}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              {product.sizes
                .filter((object) => object.stock > 0)
                .map((object, index) => (
                  <button
                    onClick={() => setSelectedSize(object.size)}
                    key={index}
                    className="w-8 h-8 bg-gray-200 hover:bg-white text-xs border-2 rounded-lg flex justify-center items-center"
                  >
                    {object.size}
                  </button>
                ))}
            </div>
            <button
              onClick={() =>
                handleAdd({
                  ...product,
                  selectedSize: selectedSize,
                  quantity: 1,
                })
              }
            >
              Mua
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
