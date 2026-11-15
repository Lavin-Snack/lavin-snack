import { useState } from "react";
import "./App.css";

type Category =
  | "Dodol dan Wajit"
  | "Kue dan Camilan"
  | "Keripik dan Makanan Ringan";

type Weight = "200g" | "1kg";

type Product = {
  id: string;
  name: string;
  category: Category;
  image: string;
  emoji: string;
  description: string;
  prices: Record<Weight, number>;
};

type CartItem = {
  product: Product;
  weight: Weight;
  quantity: number;
};

const WHATSAPP_NUMBER = "";
// Isi dengan nomor WhatsApp toko setelah tersedia.
// Format: 628123456789 tanpa tanda + atau spasi.

const dodolNames = [
  "Dodol Wajit",
  "Dodol Sirsak",
  "Dodol Buah",
  "Dodol Coklat",
  "Dodol Kertas",
  "Dodol Zebra",
  "Dodol Angleng",
  "Dodol Campur",
  "Dodol Batik",
  "Dodol Kacang",
  "Dodol Ketan Item",
];

const kueNames = [
  "Sistik",
  "Ciki Pandan",
  "Ciki Coklat",
  "Gungek",
  "Kue Bangket",
  "Makaroni Rujak",
  "Sale Pisang",
  "Kacang Polong",
  "Kacang Bandung",
  "Kacang Mersi",
  "Telur Gabus Manis Wijen",
  "Kue Ciput",
  "Kue Kancing",
  "Telur Gabus Keju",
  "Pilus Ikan Idola",
  "Stik Potato Original",
  "Kuping Gajah Kecil",
  "Kuping Gajah Besar",
  "Sumpia Udang",
  "Sale Lidah Pisang",
  "Coco Crunch",
  "Astor Panjang",
];

const keripikNames = [
  "Kripik Singkong",
  "Kripik Pisang",
  "Kripik Pangsit",
  "Kripik Kaca Ori",
  "Kripik Kaca Pedas",
  "Moring Pedas",
  "Moring Asin",
  "Endog Lewo Pedas",
  "Endog Lewo Ori",
];

const categoryImages: Record<Category, string> = {
  "Dodol dan Wajit":
    "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80",

  "Kue dan Camilan":
    "https://images.unsplash.com/photo-1599599810694-b5b37304c4f4?auto=format&fit=crop&w=700&q=80",

  "Keripik dan Makanan Ringan":
    "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=700&q=80",
};


const productImages: Record<string, string> = {
  // DODOL
  "Dodol Wajit": "/images/wajit.png",
  "Dodol Sirsak": "/images/Sirsak.png",
  "Dodol Coklat": "/images/Coklat.png",
  "Dodol Kacang": "/images/Kacang.png",
  "Dodol Kertas": "/images/Kertas.png",
  "Dodol Campur": "/images/Campur.png",
  "Dodol Zebra": "/images/Zebra.png",
  "Dodol Buah": "/images/D,Buah.png",
  "Dodol Angleng": "/images/Angleng.png",
  "Dodol Ketan Item": "/images/ketan item.png",
  "Dodol Batik": "/images/D,Batik.png",

  // KUE DAN CAMILAN
  "Sistik": "/images/sistik.png",
  "Ciki Pandan": "/images/CikiPndan.png",
  "Ciki Coklat": "/images/CikiCoklat.png",
  "Gungek": "/images/Gungek.png",
  "Kue Bangket": "/images/Bangket.png",
  "Makaroni Rujak": "/images/mkrnRjk.png",
  "Sale Pisang": "/images/SalePisang.png",
  "Kacang Polong": "/images/K,Polong.png",
  "Kacang Bandung": "/images/K,Bndng.png",
  "Kacang Mersi": "/images/K,Mersi.png",
  "Telur Gabus Manis Wijen": "/images/GbsWijen.png",
  "Kue Ciput": "/images/KueCiput.png",
  "Kue Kancing": "/images/KueKancing.png",
  "Telur Gabus Keju": "/images/GabusKeju.png",
  "Pilus Ikan Idola": "/images/PilusIkan.png",
  "Stik Potato Original": "/images/PotatoSaos.png",
  "Coco Crunch": "/images/Cococran.png",
  "Sale Lidah Pisang": "/images/SaleLidah.png",
  "Kuping Gajah Kecil": "/images/gajahkecil.png",
  "Kuping Gajah Besar": "/images/gajah.png",
  "Endog Lewo Pedas": "/images/lewoPedas.png",
  "Moring Pedas": "/images/moringPedas.png",
  "Moring Asin": "/images/asin.png",
  "Kripik Singkong": "/images/singkong.png",
  "Kripik Kaca Pedas": "/images/kacapedas.png",
  "Kripik Kaca Ori": "/images/KAsin.png",
  "Endog Lewo Ori": "/images/lewoOri.png",
  "Kripik Pisang": "/images/pisangK.png",
  "Sumpia Udang": "/images/udng.png",
  "Astor Panjang": "/images/astor.png",
  "Kripik Pangsit": "/images/pangsit.png",
};

  











const categoryEmojis: Record<Category, string> = {
  "Dodol dan Wajit": "",
  "Kue dan Camilan": "",
  "Keripik dan Makanan Ringan": "",
};

function createProducts(
  names: string[],
  category: Category,
): Product[] {
  const isDodol = category === "Dodol dan Wajit";

  return names.map((name, index) => ({
    id: `${category}-${index}`,
    name,
    category,
    image: productImages[name]
  ? `${import.meta.env.BASE_URL}${productImages[name].replace(/^\//, "")}`
  : categoryImages[category],
    emoji: categoryEmojis[category],
    description: `${name}, pilihan camilan dan oleh-oleh dari Lavin Snack. Pilih berat sesuai kebutuhanmu.`,
    prices: isDodol
      ? {
          "200g": 30000,
          "1kg": 50000,
        }
      : {
          "200g": 40000,
          "1kg": 60000,
        },
  }));
}

const products: Product[] = [
  ...createProducts(dodolNames, "Dodol dan Wajit"),
  ...createProducts(kueNames, "Kue dan Camilan"),
  ...createProducts(
    keripikNames,
    "Keripik dan Makanan Ringan",
  ),
];

const categories = [
  "Semua Produk",
  "Dodol dan Wajit",
  "Kue dan Camilan",
  "Keripik dan Makanan Ringan",
] as const;

type CategoryFilter = (typeof categories)[number];

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

function App() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] =
    useState<CategoryFilter>("Semua Produk");

  const [selectedWeights, setSelectedWeights] =
    useState<Record<string, Weight>>({});

  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [detailProduct, setDetailProduct] =
    useState<Product | null>(null);

  const visibleProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      activeCategory === "Semua Produk" ||
      product.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  

  const cartTotal = cart.reduce(
    (total, item) =>
      total +
      item.product.prices[item.weight] * item.quantity,
    0,
  );

  function getSelectedWeight(product: Product): Weight {
    return selectedWeights[product.id] ?? "200g";
  }

  function addToCart(
    product: Product,
    weight = getSelectedWeight(product),
  ) {
    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) =>
          item.product.id === product.id &&
          item.weight === weight,
      );

      if (existing) {
        return currentCart.map((item) =>
          item.product.id === product.id &&
          item.weight === weight
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [
        ...currentCart,
        { product, weight, quantity: 1 },
      ];
    });

    setDetailProduct(null);
    setCartOpen(true);
  }

  function changeQuantity(
    productId: string,
    weight: Weight,
    change: number,
  ) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.product.id === productId &&
          item.weight === weight
            ? {
                ...item,
                quantity: item.quantity + change,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function removeFromCart(
    productId: string,
    weight: Weight,
  ) {
    setCart((currentCart) =>
      currentCart.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.weight === weight
          ),
      ),
    );
  }

  function orderWhatsApp() {
    if (cart.length === 0) {
      alert("Keranjang kamu masih kosong.");
      return;
    }

    if (!WHATSAPP_NUMBER.trim()) {
      alert(
        "Nomor WhatsApp toko belum diisi. Isi WHATSAPP_NUMBER di bagian atas App.tsx terlebih dahulu.",
      );
      return;
    }

    const orderLines = cart.map((item) => {
      const weightLabel =
        item.weight === "200g"
          ? "200 gram (1/5 kg)"
          : "1 kg";

      const price = item.product.prices[item.weight];

      return [
        `• ${item.product.name}`,
        `  Berat: ${weightLabel}`,
        `  Jumlah: ${item.quantity}`,
        `  Harga satuan: ${formatPrice(price)}`,
        `  Subtotal: ${formatPrice(price * item.quantity)}`,
      ].join("\n");
    });

    const message = [
      "Halo Lavin Snack! Saya ingin memesan:",
      "",
      ...orderLines,
      "",
      `TOTAL: ${formatPrice(cartTotal)}`,
      "",
      "Mohon konfirmasi pesanan saya. Terima kasih!",
    ].join("\n");

    const url =
      `https://wa.me/${WHATSAPP_NUMBER}` +
      `?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="app">
      {/* NAVBAR */}
      <header className="navbar">
        <a href="#beranda" className="brand">
          <img
  className="brand-logo"
  src="/images/lgolvn.png"
  alt="LAVIN SNACK"
/>

          <span>
            <strong>LAVIN SNACK</strong>
            <small>Teman Ngemil, Pilihan Oleh-Oleh</small>
          </span>
        </a>

        <nav className="nav-links">
          <a href="#beranda">Beranda</a>
          <a href="#kategori">Kategori</a>
          <a href="#produk">Produk</a>
          <a href="#tentang">Tentang Kami</a>
          <a href="#kontak">Kontak</a>
        </nav>

        
      </header>

      <main>
        {/* HERO */}
        <section className="hero" id="beranda">
          <div className="hero-copy">
            <span className="eyebrow">
              ✦ CAMILAN & OLEH-OLEH PILIHAN
            </span>

            <h1>
              Ragam Rasa,
              <br />
              Banyak <span>Pilihan.</span>
            </h1>

            <p>
              Temukan dodol, kue, dan camilan favoritmu
              di Lavin Snack. Teman ngemil untuk setiap
              momen dan pilihan oleh-oleh untuk orang tersayang.
            </p>

            <div className="hero-actions">
              <a href="#produk" className="button-primary">
                Belanja Sekarang <span>→</span>
              </a>

              <a href="#tentang" className="button-secondary">
                Kenali Kami
              </a>
            </div>

            <div className="hero-note">
             
              <span>Manisnya dodol, renyahnya camilan.</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-photo">
              <img
                src={`${import.meta.env.BASE_URL}images/logo lavin.jpeg`}
                alt="Logo LAVIN SNACK"
/>
              

             
            </div>

            
          </div>
        </section>

        {/* CATEGORY */}
        <section className="category-section" id="kategori">
          <div className="section-heading centered">
            <span className="eyebrow">PILIHAN CAMILAN</span>
            <h2>Temukan Favoritmu</h2>
            <p>
              Dari dodol yang manis sampai camilan yang renyah.
            </p>
          </div>

          <div className="category-cards">
            <button
              className={`category-card category-dodol ${
                activeCategory === "Dodol dan Wajit"
                  ? "selected"
                  : ""
              }`}
              onClick={() => {
                setActiveCategory("Dodol dan Wajit");
                document
                  .getElementById("produk")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              
              <span className="category-card-text">
                <strong>Dodol dan Wajit</strong>
                <small>Manis, legit, dan istimewa</small>
              </span>
              <span className="category-arrow">↗</span>
            </button>

            <button
              className={`category-card category-kue ${
                activeCategory === "Kue dan Camilan"
                  ? "selected"
                  : ""
              }`}
              onClick={() => {
                setActiveCategory("Kue dan Camilan");
                document
                  .getElementById("produk")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              
              <span className="category-card-text">
                <strong>Kue dan Camilan</strong>
                <small>Teman santai setiap hari</small>
              </span>
              <span className="category-arrow">↗</span>
            </button>

            <button
              className={`category-card category-keripik ${
                activeCategory === "Keripik dan Makanan Ringan"
                  ? "selected"
                  : ""
              }`}
              onClick={() => {
                setActiveCategory("Keripik dan Makanan Ringan");
                document
                  .getElementById("produk")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              
              <span className="category-card-text">
                <strong>Keripik & Makanan Ringan</strong>
                <small>Renyah di setiap gigitan</small>
              </span>
              <span className="category-arrow">↗</span>
            </button>
          </div>
        </section>

        {/* PRODUCTS */}
        <section className="products-section" id="produk">
          <div className="section-heading">
            <span className="eyebrow">KATALOG LAVIN SNACK</span>
            <h2>Belanja Camilan Favorit</h2>
            <p>
              Pilih produk, tentukan berat, lalu masukkan
              ke keranjang.
            </p>
          </div>

          <div className="catalog-tools">
            <label className="search-box">
              <span>⌕</span>
              <input
                type="search"
                placeholder="Cari nama camilan..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>

            <label className="filter-box">
              <span>Kategori:</span>
              <select
                value={activeCategory}
                onChange={(event) =>
                  setActiveCategory(
                    event.target.value as CategoryFilter,
                  )
                }
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="catalog-summary">
            <span>
              Menampilkan <strong>{visibleProducts.length}</strong>{" "}
              produk
            </span>

            {(search || activeCategory !== "Semua Produk") && (
              <button
                className="reset-filter"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("Semua Produk");
                }}
              >
                Reset filter
              </button>
            )}
          </div>

          {visibleProducts.length > 0 ? (
            <div className="product-grid">
              {visibleProducts.map((product) => {
                const weight = getSelectedWeight(product);

                return (
                  <article className="product-card" key={product.id}>
                    <div className="product-image">
                      <span className="image-placeholder">
                        {product.emoji}
                      </span>

                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />

                      <span className="product-tag">
                        {product.category === "Dodol dan Wajit"
                          ? "Dodol"
                          : product.category === "Kue dan Camilan"
                            ? "Camilan"
                            : "Keripik"}
                      </span>
                    </div>

                    <div className="product-info">
                      <span className="product-category">
                        {product.category}
                      </span>

                      <h3>{product.name}</h3>

                      <div className="weight-control">
                        <label htmlFor={`weight-${product.id}`}>
                          Pilih berat
                        </label>

                        <select
                          id={`weight-${product.id}`}
                          value={weight}
                          onChange={(event) =>
                            setSelectedWeights((current) => ({
                              ...current,
                              [product.id]: event.target.value as Weight,
                            }))
                          }
                        >
                          <option value="200g">
                            200 gram (1/5 kg)
                          </option>
                          <option value="1kg">1 kg</option>
                        </select>
                      </div>

                      <div className="product-price-row">
                        <div>
                          <small>Harga</small>
                          <strong>
                            {formatPrice(product.prices[weight])}
                          </strong>
                        </div>
                      </div>

                      <div className="product-buttons">
                        <button
                          className="detail-button"
                          onClick={() => setDetailProduct(product)}
                        >
                          Detail
                        </button>
                        </div>
                        </div>
            </article>
);
})}
</div>
) : (
<div className="empty-search">
              <span>🔎</span>
              <h3>Produk tidak ditemukan</h3>
              <p>Coba gunakan nama camilan atau kategori lain.</p>
              <button
                className="button-primary"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("Semua Produk");
                }}
              >
                Lihat Semua Produk
              </button>
            </div>
          )}
        </section>

        {/* ABOUT */}
        <section className="about-section" id="tentang">
          

          <div className="about-copy">
            <span className="eyebrow">CERITA KAMI</span>
            <h2>
              Satu tempat,
              <br />
              banyak camilan.
            </h2>

            <p>
              LAVIN SNACK hadir untuk membantu kamu menemukan
              aneka dodol, kue, dan makanan ringan dalam satu
              tempat. Cocok untuk teman bersantai, menemani
              perjalanan, atau menjadi pilihan oleh-oleh
              untuk keluarga dan sahabat.
            </p>

            <p>
              Jelajahi katalog kami, pilih camilan favoritmu,
              dan masukkan pesanan ke keranjang.
            </p>

            <a href="#produk" className="button-primary">
              Jelajahi Produk →
            </a>
          </div>
        </section>

        {/* CONTACT */}
        <section className="contact-section" id="kontak">
          <div>
            <span className="eyebrow">ADA YANG INGIN DITANYAKAN?</span>
            <h2>Yuk, pilih camilan favoritmu!</h2>
            <p>
              Masukkan pilihanmu ke keranjang dan lanjutkan
              pemesanan melalui WhatsApp setelah nomor toko
              dikonfigurasi.
            </p>
          </div>

          <button
            className="contact-button"
            onClick={() => {
              setCartOpen(true);
              document
                .getElementById("produk")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            🛒 Lihat Keranjang
          </button>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-main">
          <div className="footer-brand">
            <a href="#beranda" className="brand">
              <span className="brand-icon">L</span>
              <span>
                <strong>LAVIN SNACK</strong>
                <small>Teman Ngemil, Pilihan Oleh-Oleh</small>
              </span>
            </a>

            <p>
              Aneka dodol, kue, dan camilan untuk menemani
              setiap momen.
            </p>
          </div>

          <div className="footer-links">
            <strong>Jelajahi</strong>
            <a href="#beranda">Beranda</a>
            <a href="#kategori">Kategori</a>
            <a href="#produk">Produk</a>
            <a href="#tentang">Tentang Kami</a>
          </div>

          <div className="footer-links">
            <strong>Kontak</strong>
            <span>WhatsApp: --</span>
            <span>Alamat: GARUT</span>
            <span>Email: --</span>
          </div>

          
<div className="footer-links">
  <strong>Media Sosial</strong>


<a
  href="https://www.tiktok.com/@lavinsnack"
  target="_blank"
  rel="noreferrer"
>
  TikTok – Kunjungi toko
</a>

  <a
    href="https://id.shp.ee/G17GCyS2"
    target="_blank"
    rel="noreferrer"
  >
    Shopee – Belanja di sini
  </a>
</div>

        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} LAVIN SNACK</span>
          <span>Dibuat dengan ♥ untuk pecinta camilan</span>
        </div>
      </footer>

      {/* DETAIL MODAL */}
      {detailProduct && (
        <div
          className="modal-backdrop"
          onClick={() => setDetailProduct(null)}
        >
          <div
            className="detail-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`Detail ${detailProduct.name}`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setDetailProduct(null)}
              aria-label="Tutup detail"
            >
              ×
            </button>

            <div className="modal-product-image">
              <span>{detailProduct.emoji}</span>
              <img
                src={detailProduct.image}
                alt={detailProduct.name}
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            </div>

            <div className="modal-product-info">
              <span className="eyebrow">
                {detailProduct.category}
              </span>

              <h2>{detailProduct.name}</h2>
              <p>{detailProduct.description}</p>

              <label htmlFor="modal-weight">Pilih berat</label>

              <select
                id="modal-weight"
                value={getSelectedWeight(detailProduct)}
                onChange={(event) =>
                  setSelectedWeights((current) => ({
                    ...current,
                    [detailProduct.id]: event.target.value as Weight,
                  }))
                }
              >
                <option value="200g">200 gram (1/5 kg)</option>
                <option value="1kg">1 kg</option>
              </select>

              <strong className="modal-price">
                {formatPrice(
                  detailProduct.prices[
                    getSelectedWeight(detailProduct)
                  ],
                )}
              </strong>

              <button
                className="button-primary modal-add"
                onClick={() => addToCart(detailProduct)}
              >
                + Tambahkan ke Keranjang
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CART DRAWER */}
      {cartOpen && (
        <div
          className="cart-backdrop"
          onClick={() => setCartOpen(false)}
        >
          <aside
            className="cart-drawer"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cart-header">
              <div>
                <span className="eyebrow">PESANAN KAMU</span>
                <h2>Keranjang Belanja</h2>
              </div>

              <button
                className="modal-close"
                onClick={() => setCartOpen(false)}
                aria-label="Tutup keranjang"
              >
                ×
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="cart-empty">
                <span>🛒</span>
                <h3>Keranjang masih kosong</h3>
                <p>Yuk, temukan camilan favoritmu!</p>
                <button
                  className="button-primary"
                  onClick={() => {
                    setCartOpen(false);
                    document
                      .getElementById("produk")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Lihat Produk
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => {
                    const weightLabel =
                      item.weight === "200g"
                        ? "200 gram (1/5 kg)"
                        : "1 kg";

                    const unitPrice =
                      item.product.prices[item.weight];

                    return (
                      <div
                        className="cart-item"
                        key={`${item.product.id}-${item.weight}`}
                      >
                        <div className="cart-item-emoji">
                          {item.product.emoji}
                        </div>

                        <div className="cart-item-info">
                          <strong>{item.product.name}</strong>
                          <small>{weightLabel}</small>
                          <span>{formatPrice(unitPrice)}</span>

                          <div className="quantity-control">
                            <button
                              onClick={() =>
                                changeQuantity(
                                  item.product.id,
                                  item.weight,
                                  -1,
                                )
                              }
                              aria-label="Kurangi jumlah"
                            >
                              −
                            </button>

                            <span>{item.quantity}</span>

                            <button
                              onClick={() =>
                                changeQuantity(
                                  item.product.id,
                                  item.weight,
                                  1,
                                )
                              }
                              aria-label="Tambah jumlah"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="cart-item-end">
                          <strong>
                            {formatPrice(unitPrice * item.quantity)}
                          </strong>

                          <button
                            className="remove-item"
                            onClick={() =>
                              removeFromCart(
                                item.product.id,
                                item.weight,
                              )
                            }
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="cart-footer">
                  <div className="cart-total">
                    <span>Total pesanan</span>
                    <strong>{formatPrice(cartTotal)}</strong>
                  </div>

                  <p>
                    Total belum termasuk ongkos kirim, jika ada.
                  </p>

                  <button
                    className="whatsapp-button"
                    onClick={orderWhatsApp}
                  >
                    Pesan via WhatsApp ↗
                  </button>

                  <button
                    className="continue-shopping"
                    onClick={() => setCartOpen(false)}
                  >
                    Lanjut Belanja
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

export default App;