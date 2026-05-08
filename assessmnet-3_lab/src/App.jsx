import { useState, useEffect } from "react";

/* =========================
   COLOR THEME
========================= */

const COLORS = {
  bgDark: "#23361A",
  bgMain: "#516F7A",
  cream: "#EFF4BD",
  green: "#A2B447",
  olive: "#DCAA44",
  wood: "#362F22",
  blue: "#516F7A",
  white: "#ffffff"
};

/* =========================
   CATEGORIES
========================= */

const CATEGORIES = [
  "All",
  "smartphones",
  "laptops",
  "fragrances",
  "skincare",
  "groceries",
  "home-decoration"
];

/* =========================
   LOADER COMPONENT
========================= */

const Loader = () => {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        style={{
          width: "90px",
          height: "90px",
          border:
            "10px solid rgba(255,255,255,0.2)",
          borderTop:
            `10px solid ${COLORS.green}`,
          borderRadius: "50%",
          animation:
            "spin 1s linear infinite"
        }}
      />

      <h1
        style={{
          color: COLORS.cream,
          marginTop: "25px",
          fontSize: "32px"
        }}
      >
        Loading Products...
      </h1>

      <style>
        {`
          @keyframes spin {

            0% {
              transform: rotate(0deg);
            }

            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

/* =========================
   STARS
========================= */

const Stars = ({ rating }) => {

  const full = Math.floor(rating);

  return (
    <div>
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          style={{
            color:
              i < full
                ? COLORS.olive
                : "#ccc",
            fontSize: "12px"
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

/* =========================
   PRODUCT CARD
========================= */

const ProductCard = ({
  product,
  likedProducts,
  toggleLike,
  addToCart,
  buyNow
}) => {

  const liked =
    likedProducts.find(
      (p) =>
        p.id === product.id
    );

  return (
    <div
      style={{
        width: "250px",
        background:
          COLORS.cream,
        borderRadius: "22px",
        overflow: "hidden",
        boxShadow:
          "0 8px 18px rgba(0,0,0,0.25)",
        transition: "0.3s"
      }}
    >
      {/* IMAGE */}

      <div
        style={{
          height: "180px",
          position: "relative"
        }}
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
        />

        {/* LIKE */}

        <button
          onClick={() =>
            toggleLike(product)
          }
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "none",
            background:
              "rgba(255,255,255,0.9)",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          {liked ? "❤️" : "🤍"}
        </button>

        {/* PRICE */}

        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background:
              COLORS.wood,
            color:
              COLORS.cream,
            padding: "8px 14px",
            borderRadius: "999px",
            fontWeight: "700",
            fontSize: "13px"
          }}
        >
          ₹
          {Math.round(
            product.price * 83
          ).toLocaleString(
            "en-IN"
          )}
        </div>

        {/* BUTTONS */}

        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            right: "10px",
            display: "flex",
            gap: "8px"
          }}
        >
          <button
            onClick={() =>
              addToCart(product)
            }
            style={{
              flex: 1,
              border: "none",
              padding: "10px",
              borderRadius: "10px",
              background:
                COLORS.green,
              color:
                COLORS.white,
              fontWeight: "700",
              cursor: "pointer",
              fontSize: "13px"
            }}
          >
            🛒 Cart
          </button>

          <button
            onClick={() =>
              buyNow(product)
            }
            style={{
              flex: 1,
              border: "none",
              padding: "10px",
              borderRadius: "10px",
              background:
                COLORS.bgDark,
              color:
                COLORS.white,
              fontWeight: "700",
              cursor: "pointer",
              fontSize: "13px"
            }}
          >
            ⚡ Buy
          </button>
        </div>
      </div>

      {/* CONTENT */}

      <div
        style={{
          padding: "16px"
        }}
      >
        <p
          style={{
            color:
              COLORS.green,
            fontWeight: "700",
            marginBottom: "8px",
            textTransform:
              "uppercase",
            fontSize: "11px"
          }}
        >
          {product.category}
        </p>

        <h2
          style={{
            margin: 0,
            color:
              COLORS.bgDark,
            fontSize: "20px"
          }}
        >
          {product.title}
        </h2>

        <p
          style={{
            color:
              COLORS.blue,
            fontSize: "13px",
            marginTop: "8px",
            minHeight: "40px"
          }}
        >
          {product.description}
        </p>

        <div
          style={{
            marginTop: "14px",
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center"
          }}
        >
          <Stars
            rating={
              product.rating
            }
          />

          <span
            style={{
              color:
                COLORS.wood,
              fontWeight: "700",
              fontSize: "12px"
            }}
          >
            {product.stock} left
          </span>
        </div>
      </div>
    </div>
  );
};

/* =========================
   MAIN APP
========================= */

export default function ApiExplorer() {

  const [
    products,
    setProducts
  ] = useState([]);

  const [
    filtered,
    setFiltered
  ] = useState([]);

  const [
    search,
    setSearch
  ] = useState("");

  const [
    category,
    setCategory
  ] = useState("All");

  const [
    likedProducts,
    setLikedProducts
  ] = useState([]);

  const [
    cartProducts,
    setCartProducts
  ] = useState([]);

  const [
    buyProducts,
    setBuyProducts
  ] = useState([]);

  const [
    loading,
    setLoading
  ] = useState(true);

  /* =========================
     API CALL
  ========================= */

  useEffect(() => {

    document.body.style.margin =
      "0";

    document.body.style.padding =
      "0";

    document.body.style.overflowX =
      "hidden";

    const fetchProducts =
      async () => {

        try {

          /* LOADER START */

          setLoading(true);

          const response =
            await fetch(
              "https://dummyjson.com/products?limit=100"
            );

          const data =
            await response.json();

          /* EXTRA DELAY
             TO SHOW LOADER */

          await new Promise(
            (resolve) =>
              setTimeout(
                resolve,
                2500
              )
          );

          const fixedProducts =
            data.products.map(
              (product) => {

                let fixedCategory =
                  product.category.toLowerCase();

                if (
                  fixedCategory ===
                  "skin-care"
                ) {
                  fixedCategory =
                    "skincare";
                }

                return {
                  ...product,
                  category:
                    fixedCategory
                };
              }
            );

          /* EXTRA PRODUCTS */

          const extraProducts = [

            {
              id: 10001,
              title:
                "Vitamin C Serum",
              description:
                "Brightening skincare serum.",
              price: 899,
              rating: 4.7,
              stock: 44,
              category:
                "skincare",
              thumbnail:
                "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1200&auto=format&fit=crop"
            },

            {
              id: 10002,
              title:
                "Gaming Phone",
              description:
                "Powerful gaming smartphone.",
              price: 45999,
              rating: 4.9,
              stock: 20,
              category:
                "smartphones",
              thumbnail:
                "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop"
            },

            {
              id: 10003,
              title:
                "Wooden Lamp",
              description:
                "Minimal home decor lamp.",
              price: 2499,
              rating: 4.6,
              stock: 15,
              category:
                "home-decoration",
              thumbnail:
                "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop"
            }

          ];

          const finalProducts = [
            ...fixedProducts,
            ...extraProducts
          ];

          setProducts(
            finalProducts
          );

          setFiltered(
            finalProducts
          );

        } catch (error) {

          console.log(error);

        } finally {

          /* LOADER END */

          setLoading(false);

        }
      };

    fetchProducts();

  }, []);

  /* =========================
     FILTER FUNCTIONALITY
  ========================= */

  const filterProducts = (
    selectedCategory,
    searchText
  ) => {

    let result = [...products];

    /* CATEGORY FILTER */

    if (
      selectedCategory !== "All"
    ) {

      result = result.filter(
        (product) =>
          product.category
            .toLowerCase()
            .trim() ===
          selectedCategory
            .toLowerCase()
            .trim()
      );
    }

    /* SEARCH FILTER */

    if (searchText.trim()) {

      result = result.filter(
        (product) =>
          product.title
            .toLowerCase()
            .includes(
              searchText.toLowerCase()
            ) ||

          product.description
            .toLowerCase()
            .includes(
              searchText.toLowerCase()
            )
      );
    }

    setFiltered(result);
  };

  /* =========================
     SEARCH
  ========================= */

  const handleSearch = (
    e
  ) => {

    const value =
      e.target.value;

    setSearch(value);

    filterProducts(
      category,
      value
    );
  };

  /* =========================
     CATEGORY FILTER
  ========================= */

  const handleCategory = (
    cat
  ) => {

    setCategory(cat);

    filterProducts(
      cat,
      search
    );
  };

  /* =========================
     LIKE
  ========================= */

  const toggleLike = (
    product
  ) => {

    setLikedProducts(
      (prev) => {

        const exists =
          prev.find(
            (p) =>
              p.id ===
              product.id
          );

        if (exists) {

          return prev.filter(
            (p) =>
              p.id !==
              product.id
          );
        }

        return [
          ...prev,
          product
        ];
      }
    );
  };

  /* =========================
     CART
  ========================= */

  const addToCart = (
    product
  ) => {

    setCartProducts(
      (prev) => {

        const exists =
          prev.find(
            (p) =>
              p.id ===
              product.id
          );

        if (exists)
          return prev;

        return [
          ...prev,
          product
        ];
      }
    );
  };

  /* =========================
     BUY
  ========================= */

  const buyNow = (
    product
  ) => {

    setBuyProducts(
      (prev) => {

        const exists =
          prev.find(
            (p) =>
              p.id ===
              product.id
          );

        if (exists)
          return prev;

        return [
          ...prev,
          product
        ];
      }
    );
  };

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        background: `linear-gradient(
          135deg,
          ${COLORS.bgDark},
          ${COLORS.blue}
        )`
      }}
    >
      {/* NAVBAR */}

      <div
        style={{
          padding:
            "24px 30px",
          background:
            "rgba(35,54,26,0.92)",
          position:
            "sticky",
          top: 0,
          zIndex: 100
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems:
              "center",
            gap: "20px",
            flexWrap:
              "wrap"
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "20px",
              alignItems:
                "center",
              flexWrap:
                "wrap",
              flex: 1
            }}
          >
            <h1
              style={{
                color:
                  COLORS.cream,
                margin: 0,
                fontSize:
                  "32px"
              }}
            >
              Fine Dining Store
            </h1>

            {/* SEARCH BAR */}

            <input
              value={search}
              onChange={
                handleSearch
              }
              placeholder="Search products..."
              style={{
                flex: 1,
                minWidth:
                  "240px",
                maxWidth:
                  "500px",
                padding:
                  "14px",
                borderRadius:
                  "14px",
                border:
                  `2px solid ${COLORS.green}`,
                outline:
                  "none",
                background:
                  COLORS.cream,
                color: "#000",
                fontSize:
                  "15px"
              }}
            />
          </div>

          {/* COUNTERS */}

          <div
            style={{
              display: "flex",
              gap: "12px"
            }}
          >
            <button
              style={{
                padding:
                  "14px 18px",
                border:
                  "none",
                borderRadius:
                  "14px",
                background:
                  COLORS.wood,
                color:
                  COLORS.white,
                fontWeight:
                  "700"
              }}
            >
              ❤️{" "}
              {
                likedProducts.length
              }
            </button>

            <button
              style={{
                padding:
                  "14px 18px",
                border:
                  "none",
                borderRadius:
                  "14px",
                background:
                  COLORS.green,
                color:
                  COLORS.white,
                fontWeight:
                  "700"
              }}
            >
              🛒{" "}
              {
                cartProducts.length
              }
            </button>

            <button
              style={{
                padding:
                  "14px 18px",
                border:
                  "none",
                borderRadius:
                  "14px",
                background:
                  COLORS.blue,
                color:
                  COLORS.white,
                fontWeight:
                  "700"
              }}
            >
              ⚡{" "}
              {
                buyProducts.length
              }
            </button>
          </div>
        </div>

        {/* CATEGORY FILTER */}

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap:
              "wrap",
            marginTop:
              "20px"
          }}
        >
          {CATEGORIES.map(
            (cat) => (
              <button
                key={cat}
                onClick={() =>
                  handleCategory(
                    cat
                  )
                }
                style={{
                  padding:
                    "12px 20px",
                  border:
                    "none",
                  borderRadius:
                    "999px",
                  cursor:
                    "pointer",
                  background:
                    category ===
                    cat
                      ? COLORS.green
                      : "rgba(255,255,255,0.15)",
                  color:
                    COLORS.white,
                  fontWeight:
                    "700"
                }}
              >
                {cat}
              </button>
            )
          )}
        </div>
      </div>

      {/* PRODUCTS + LOADER */}

      {loading ? (

        <Loader />

      ) : (

        <div
          style={{
            padding: "24px",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(250px, 250px))",
            justifyContent:
              "center",
            gap: "20px"
          }}
        >
          {filtered.map(
            (product) => (
              <ProductCard
                key={
                  product.id
                }
                product={
                  product
                }
                likedProducts={
                  likedProducts
                }
                toggleLike={
                  toggleLike
                }
                addToCart={
                  addToCart
                }
                buyNow={
                  buyNow
                }
              />
            )
          )}
        </div>
      )}
    </div>
  );
}