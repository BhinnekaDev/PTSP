import { useState } from "react";

const usePagination = (itemList, itemsPerPage = 6) => {
  const [activePage, setActivePage] = useState(1);
  const totalHalaman = Math.ceil(itemList.length / itemsPerPage);

  const itemTerkini = itemList.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  const nextPage = () => {
    if (activePage < totalHalaman) setActivePage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (activePage > 1) setActivePage((prev) => prev - 1);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalHalaman) {
      setActivePage(page);
    }
  };

  const getItemProps = (index) => ({
    className:
      activePage === index
        ? "bg-blue-500 text-white"
        : "bg-gray-200 text-black",
    onClick: () => goToPage(index),
  });

  return {
    itemTerkini,
    activePage,
    totalHalaman,
    nextPage,
    prevPage,
    goToPage,
    getItemProps,
  };
};

export default usePagination;
