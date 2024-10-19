import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fetch from 'node-fetch'; 

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let items = [
  { id: 1, name: "Laptop ASUS", description: "Laptop ASUS con 16GB de RAM", price: 1200, thumbnail: "https://via.placeholder.com/150", purchased: false },
  { id: 2, name: "MacBook Pro", description: "MacBook Pro 2021", price: 2500, thumbnail: "https://via.placeholder.com/150", purchased: false },
  { id: 3, name: "Dell XPS", description: "Dell XPS con pantalla 4K", price: 1800, thumbnail: "https://via.placeholder.com/150", purchased: false },
  { id: 4, name: "HP Spectre", description: "HP Spectre x360", price: 1400, thumbnail: "https://via.placeholder.com/150", purchased: false },
  { id: 5, name: "Lenovo ThinkPad", description: "Lenovo ThinkPad con procesador Intel i7", price: 1300, thumbnail: "https://via.placeholder.com/150", purchased: false },
  { id: 6, name: "Acer Swift", description: "Acer Swift con SSD de 512GB", price: 1000, thumbnail: "https://via.placeholder.com/150", purchased: false },
  { id: 7, name: "Microsoft Surface", description: "Microsoft Surface Pro", price: 1500, thumbnail: "https://via.placeholder.com/150", purchased: false },
  { id: 8, name: "Razer Blade", description: "Razer Blade con GPU RTX 3080", price: 3000, thumbnail: "https://via.placeholder.com/150", purchased: false },
  { id: 9, name: "Apple MacBook Air", description: "MacBook Air M1", price: 999, thumbnail: "https://via.placeholder.com/150", purchased: false },
  { id: 10, name: "Samsung Galaxy Book", description: "Samsung Galaxy Book", price: 1100, thumbnail: "https://via.placeholder.com/150", purchased: false },
  { id: 11, name: "Alienware m15", description: "Alienware m15 R6", price: 2000, thumbnail: "https://via.placeholder.com/150", purchased: false },
  { id: 12, name: "MSI GS66", description: "MSI GS66 Stealth", price: 2200, thumbnail: "https://via.placeholder.com/150", purchased: false },
  { id: 13, name: "Huawei MateBook X", description: "Huawei MateBook X Pro", price: 1200, thumbnail: "https://via.placeholder.com/150", purchased: false },
  { id: 14, name: "LG Gram", description: "LG Gram 17", price: 1500, thumbnail: "https://via.placeholder.com/150", purchased: false },
  { id: 15, name: "Asus ROG Zephyrus", description: "Asus ROG Zephyrus G14", price: 1900, thumbnail: "https://via.placeholder.com/150", purchased: false },
  { id: 16, name: "Gigabyte Aero", description: "Gigabyte Aero 15", price: 2300, thumbnail: "https://via.placeholder.com/150", purchased: false },
  { id: 17, name: "Toshiba Dynabook", description: "Toshiba Dynabook", price: 900, thumbnail: "https://via.placeholder.com/150", purchased: false },
  { id: 18, name: "Sony Vaio", description: "Sony Vaio Z", price: 2000, thumbnail: "https://via.placeholder.com/150", purchased: false },
  { id: 19, name: "Chromebook Pixelbook", description: "Google Pixelbook Go", price: 850, thumbnail: "https://via.placeholder.com/150", purchased: false },
  { id: 20, name: "Acer Predator", description: "Acer Predator Helios 300", price: 1800, thumbnail: "https://via.placeholder.com/150", purchased: false }
];

app.get('/items', (req, res) => {
  res.json(items); 
});

app.post('/items', (req, res) => {
    const newItem = {
      ...req.body,
      purchased: false 
    };
    newItem.id = items.length > 0 ? items[items.length - 1].id + 1 : 1;
    items.push(newItem);
    console.log(items);
    res.status(201).json(newItem);
  });
  
app.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const index = items.findIndex(item => item.id == id);

  if (index === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }

  items[index].purchased = true; 
  res.json(items[index]);
});

app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  const index = items.findIndex(item => item.id == id);

  if (index === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }

  items.splice(index, 1); 
  res.status(200).json({ message: 'Item deleted successfully' }); 
});

app.get('/dummy-products', async (req, res) => {
  try {
    const response = await fetch('https://dummyjson.com/products/category/laptops');
    if (!response.ok) {
      throw new Error('Failed to fetch products from DummyJSON');
    }
    const data = await response.json();
    res.json(data.products);
  } catch (error) {
    console.error('Error fetching data from DummyJSON:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`); 
});
