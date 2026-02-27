import { useEffect, useState } from "react";
import { Heading } from "../../components/ui/Heading";
import type { Product } from "../../types";

const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Nexus Processor",
    sku: "NEX-001",
    stock: 42,
    price: 299.99,
  },
  {
    id: "2",
    name: "Ethernet Shield",
    sku: "NEX-002",
    stock: 12,
    price: 45.0,
  },
];

export const InventoryManager = () => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem("nexus-inventory");
    return saved ? JSON.parse(saved) : MOCK_PRODUCTS;
  });

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, //This is the "Magic" line
    }));
  };
  const [searchTerm, setSearchTerm] = useState("");

  // DERIVED STATE - This calculates automatically every time products or searchTerm changes
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // DERIVED STATE - TOTAL value of all products in the table
  const totalValue = filteredProducts.reduce(
    (sum, p) => sum + p.price * p.stock,
    0,
  );
  // DERIVED STATE - Total Item Count
  const totalItems = filteredProducts.reduce((sum, p) => sum + p.stock, 0);

  // EVERY TIME 'products' changes, save it to the browser's brain
  useEffect(() => {
    localStorage.setItem("nexus_inventory", JSON.stringify(products));
  }, [products]);
  // Add a product
  const addProduct = () => {
    if (!formData.name || !formData.price || !formData.stock) return;

    const newEntry: Product = {
      id: crypto.randomUUID(),
      name: formData.name,
      sku: `NEX-${Math.floor(Math.random() * 1000)}`,
      stock: parseInt(formData.stock),
      price: parseFloat(formData.price),
    };

    setProducts([...products, newEntry]); // The "Spread" operator - adding to the list
    setFormData({ name: "", price: "", stock: "" });
  };
  // Delete a product
  const deleteProduct = (id: string) => {
    // We use .filter to create a NEW array excluding the target ID (Immutability!)
    const updatedProducts = products.filter((p) => p.id !== id);
    setProducts(updatedProducts);
  };
  return (
    <section className="inventory-module">
      <header className="module-header">
        <div className="header-main">
          <Heading level={2}>Stock Levels</Heading>
        </div>

        <div className="module-controls">
          {/* Search stays prominent */}
          <input
            type="text"
            placeholder="Search SKU or Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="nexus-input"
          />

          {/* Form inputs grouped together */}
          <div className="form-group">
            <input
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleInputChange}
              className="nexus-input"
            />
            <input
              name="price"
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={handleInputChange}
              className="nexus-input small"
            />
            <input
              name="stock"
              type="number"
              placeholder="Stock"
              value={formData.stock}
              onChange={handleInputChange}
              className="nexus-input small"
            />
            <button className="btn-primary" onClick={addProduct}>
              Add Product
            </button>
          </div>
        </div>
      </header>
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Total Inventory Value </span>
          <span className="stat-value">
            $
            {totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Units in Stock</span>
          <span className="stat-value">{totalItems}</span>
        </div>
      </div>
      <table className="nexus-table">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Product Name</th>
            <th>Stock</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((p) => (
            <tr key={p.id}>
              <td>
                <code>{p.sku}</code>
              </td>
              <td>{p.name}</td>
              <td>{p.stock}</td>
              <td>{p.price.toFixed(2)}</td>
              <td>
                <button
                  className="btn-danger"
                  onClick={() => deleteProduct(p.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
