import axios from "axios";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Item } from "../interface";
import styles from "./index.module.css";

const PAGE_SIZE = 10;
const HALF_OF_PAGE_SIZE = PAGE_SIZE / 2;

function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [targetElement, setTargetElement] = useState<HTMLDivElement | null>(null);
  const scrollElementRef = useRef<HTMLDivElement>(null);

  const queryRef = useRef("");
  const pageRef = useRef(0);
  const isLastPageRef = useRef(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value === "") {
      setItems([]);
      return;
    }

    if (scrollElementRef.current !== null) {
      scrollElementRef.current.scrollTop = 0;
    }

    isLastPageRef.current = false;
    queryRef.current = value;
    axios.get("/api/items", { params: { query: value, page: 0, size: PAGE_SIZE } }).then(({ data }) => {
      setItems(data.items);
      pageRef.current = data.page;
      isLastPageRef.current = data.isLastPage;
    });
  };

  useEffect(() => {
    if (targetElement === null) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            axios
              .get("/api/items", {
                params: {
                  query: queryRef.current,
                  page: pageRef.current + 1,
                  size: PAGE_SIZE,
                },
              })
              .then(({ data }) => {
                setItems((prevItems) => [...prevItems, ...data.items]);
                pageRef.current = data.page;
                isLastPageRef.current = data.isLastPage;
              });
          }
        });
      },
      { root: scrollElementRef.current }
    );

    observer.observe(targetElement);

    return () => {
      observer.unobserve(targetElement);
    };
  }, [targetElement]);

  useEffect(() => {
    if (isLastPageRef.current) {
      setTargetElement(null);
    }
  }, [items]);

  return (
    <div className={styles.container}>
      <header className={styles.title}>header</header>
      <input type="text" onChange={handleInputChange} />
      <div className={styles.scrollElement} ref={scrollElementRef}>
        {items.map((item, index) => (
          <div
            className={styles.item}
            key={item.id}
            ref={(instance) => {
              if (isLastPageRef.current) {
                return;
              }

              if (items.length - HALF_OF_PAGE_SIZE === index) {
                setTargetElement(instance);
              }
            }}
            style={{ backgroundColor: (index - 5) % PAGE_SIZE === 0 ? "lemonchiffon" : undefined }}
          >
            <Image src={item.image} width={100} height={100} />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
