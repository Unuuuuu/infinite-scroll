exports.id = 441;
exports.ids = [441];
exports.modules = {

/***/ 669:
/***/ ((module) => {

// Exports
module.exports = {
	"container": "index_container__gnN1f",
	"scrollElement": "index_scrollElement__vTSfa",
	"item": "index_item__ltGBJ",
	"title": "index_title__gEapU"
};


/***/ }),

/***/ 441:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(167);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _index_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(669);
/* harmony import */ var _index_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_index_module_css__WEBPACK_IMPORTED_MODULE_4__);





const PAGE_SIZE = 10;
const HALF_OF_PAGE_SIZE = PAGE_SIZE / 2;
function Home() {
    const { 0: items , 1: setItems  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)([]);
    const { 0: targetElement , 1: setTargetElement  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(null);
    const scrollElementRef = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(null);
    const queryRef = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)("");
    const pageRef = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(0);
    const isLastPageRef = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(false);
    const handleInputChange = (event)=>{
        const { value  } = event.target;
        if (value === "") {
            setItems([]);
            return;
        }
        if (scrollElementRef.current !== null) {
            scrollElementRef.current.scrollTop = 0;
        }
        isLastPageRef.current = false;
        queryRef.current = value;
        axios__WEBPACK_IMPORTED_MODULE_1___default().get("/items", {
            params: {
                query: value,
                page: 0,
                size: PAGE_SIZE
            }
        }).then(({ data  })=>{
            setItems(data.items);
            pageRef.current = data.page;
            isLastPageRef.current = data.isLastPage;
        });
    };
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        if (targetElement === null) {
            return;
        }
        const observer = new IntersectionObserver((entries)=>{
            entries.forEach((entry)=>{
                if (entry.isIntersecting) {
                    axios__WEBPACK_IMPORTED_MODULE_1___default().get("/items", {
                        params: {
                            query: queryRef.current,
                            page: pageRef.current + 1,
                            size: PAGE_SIZE
                        }
                    }).then(({ data  })=>{
                        setItems((prevItems)=>[
                                ...prevItems,
                                ...data.items
                            ]);
                        pageRef.current = data.page;
                        isLastPageRef.current = data.isLastPage;
                    });
                }
            });
        }, {
            root: scrollElementRef.current
        });
        observer.observe(targetElement);
        return ()=>{
            observer.unobserve(targetElement);
        };
    }, [
        targetElement
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        if (isLastPageRef.current) {
            setTargetElement(null);
        }
    }, [
        items
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_index_module_css__WEBPACK_IMPORTED_MODULE_4___default().container),
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("header", {
                className: (_index_module_css__WEBPACK_IMPORTED_MODULE_4___default().title),
                children: "header"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                type: "text",
                onChange: handleInputChange
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_index_module_css__WEBPACK_IMPORTED_MODULE_4___default().scrollElement),
                ref: scrollElementRef,
                children: items.map((item, index)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_index_module_css__WEBPACK_IMPORTED_MODULE_4___default().item),
                        ref: (instance)=>{
                            if (isLastPageRef.current) {
                                return;
                            }
                            if (items.length - HALF_OF_PAGE_SIZE === index) {
                                setTargetElement(instance);
                            }
                        },
                        style: {
                            backgroundColor: (index - 5) % PAGE_SIZE === 0 ? "lemonchiffon" : undefined
                        },
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {
                                src: item.image,
                                width: 100,
                                height: 100
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                children: item.name
                            })
                        ]
                    }, item.id))
            })
        ]
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Home);


/***/ })

};
;