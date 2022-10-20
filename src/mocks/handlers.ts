import { rest } from 'msw';
import { Item } from '../interface';

const items = Array.from(Array(10000).keys()).map<Item>((index) => ({
  id: index,
  name: `item${index}`,
}));

export const handlers = [
  rest.get('/items', (req, res, ctx) => {
    const { searchParams } = req.url;
    const query = searchParams.get('query');
    if (query === null) {
      return;
    }

    const filteredItems = items.filter((item) => item.name.includes(query));
    const page = Number(searchParams.get('page'));
    const size = Number(searchParams.get('size'));
    const totalCountOfItems = filteredItems.length;
    const totalCountOfPages = Math.ceil(totalCountOfItems / size);

    return res(
      ctx.status(200),
      ctx.json({
        items: filteredItems.slice(page * size, (page + 1) * size),
        page,
        size,
        totalCountOfItems,
        totalCountOfPages,
        isLastPage: totalCountOfPages - 1 === page,
        isFirstPage: page === 0,
      })
    );
  }),
];
