"use strict";
exports.id = 369;
exports.ids = [369];
exports.modules = {

/***/ 369:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "server": () => (/* binding */ server)
});

// EXTERNAL MODULE: external "msw/node"
var node_ = __webpack_require__(56);
// EXTERNAL MODULE: external "msw"
var external_msw_ = __webpack_require__(386);
;// CONCATENATED MODULE: ./src/mocks/handlers.ts

const items = Array.from(Array(10000).keys()).map((index)=>({
        id: index,
        name: `item${index}`,
        image: `https://i.pravatar.cc/100?img=${String(index).slice(-1)}`
    }));
const handlers = [
    external_msw_.rest.get("/items", (req, res, ctx)=>{
        const { searchParams  } = req.url;
        const query = searchParams.get("query");
        if (query === null) {
            return;
        }
        const filteredItems = items.filter((item)=>item.name.includes(query));
        const page = Number(searchParams.get("page"));
        const size = Number(searchParams.get("size"));
        const totalCountOfItems = filteredItems.length;
        const totalCountOfPages = Math.ceil(totalCountOfItems / size);
        return res(ctx.status(200), ctx.json({
            items: filteredItems.slice(page * size, (page + 1) * size),
            page,
            size,
            totalCountOfItems,
            totalCountOfPages,
            isLastPage: totalCountOfPages - 1 === page,
            isFirstPage: page === 0
        }), ctx.delay(300));
    }), 
];

;// CONCATENATED MODULE: ./src/mocks/server.ts


const server = (0,node_.setupServer)(...handlers);


/***/ })

};
;