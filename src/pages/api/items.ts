import type { NextApiRequest, NextApiResponse } from "next";
import { Item } from "../../interface";

const items = Array.from(Array(10000).keys()).map<Item>((index) => ({
  id: index,
  name: `item${index}`,
  image: `https://i.pravatar.cc/100?img=${String(index).slice(-1)}`,
}));

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { query, page: pageFromQuery, size: sizeFromQuery } = req.query;
  if (query === null) {
    return;
  }

  const filteredItems = items.filter((item) => item.name.includes(query as string));
  const page = Number(pageFromQuery);
  const size = Number(sizeFromQuery);
  const totalCountOfItems = filteredItems.length;
  const totalCountOfPages = Math.ceil(totalCountOfItems / size);

  res.status(200).json({
    items: filteredItems.slice(page * size, (page + 1) * size),
    page,
    size,
    totalCountOfItems,
    totalCountOfPages,
    isLastPage: totalCountOfPages - 1 === page,
    isFirstPage: page === 0,
  });
};
