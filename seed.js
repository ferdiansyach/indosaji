import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_URL = "http://localhost:4000/api/food/add";
const ASSETS_DIR = path.join(__dirname, "frontend", "src", "assets");

// 8 categories × 5 items = 40 items, Indonesian food themed
const foodItems = [
    // Salad (images: food_1 to food_4, reuse food_1)
    { name: "Gado-Gado", description: "Salad sayur Indonesia dengan bumbu kacang khas yang gurih dan lezat", price: 25000, category: "Salad", image: "food_1.png" },
    { name: "Karedok", description: "Salad sayuran mentah khas Sunda dengan bumbu kacang pedas", price: 22000, category: "Salad", image: "food_2.png" },
    { name: "Urap Sayur", description: "Campuran sayuran rebus dengan parutan kelapa berbumbu rempah", price: 20000, category: "Salad", image: "food_3.png" },
    { name: "Pecel Madiun", description: "Sayuran rebus dengan sambal pecel kacang khas Madiun", price: 23000, category: "Salad", image: "food_4.png" },
    { name: "Asinan Betawi", description: "Salad sayur dan buah segar dengan kuah kacang pedas asam khas Betawi", price: 18000, category: "Salad", image: "food_1.png" },

    // Rolls (images: food_5 to food_8, reuse food_5)
    { name: "Lumpia Semarang", description: "Lumpia goreng khas Semarang berisi rebung dan udang", price: 15000, category: "Rolls", image: "food_5.png" },
    { name: "Risoles Mayo", description: "Risoles isi ragout sayuran dan mayonaise, digoreng hingga renyah", price: 12000, category: "Rolls", image: "food_6.png" },
    { name: "Martabak Telur", description: "Kulit tipis berisi telur, daging, dan daun bawang goreng", price: 35000, category: "Rolls", image: "food_7.png" },
    { name: "Popiah Basah", description: "Kulit lumpia lembut berisi sayuran, tahu, dan saus kacang", price: 18000, category: "Rolls", image: "food_8.png" },
    { name: "Sosis Solo", description: "Crepe tipis berisi daging ayam cincang berbumbu khas Solo", price: 14000, category: "Rolls", image: "food_5.png" },

    // Deserts (images: food_9 to food_12, reuse food_9)
    { name: "Es Cendol", description: "Minuman manis dengan cendol pandan, santan, dan gula merah", price: 15000, category: "Deserts", image: "food_9.png" },
    { name: "Klepon", description: "Bola ketan hijau berisi gula merah cair, taburan kelapa parut", price: 10000, category: "Deserts", image: "food_10.png" },
    { name: "Dadar Gulung", description: "Crepe hijau pandan berisi parutan kelapa manis gula merah", price: 12000, category: "Deserts", image: "food_11.png" },
    { name: "Kolak Pisang", description: "Pisang dan ubi dalam kuah santan manis dengan gula merah", price: 14000, category: "Deserts", image: "food_12.png" },
    { name: "Es Teler", description: "Campuran alpukat, kelapa muda, nangka dalam santan dan es", price: 18000, category: "Deserts", image: "food_9.png" },

    // Sandwich (images: food_13 to food_16, reuse food_13)
    { name: "Roti John", description: "Roti bakar berisi daging sapi cincang, telur, dan saus spesial", price: 28000, category: "Sandwich", image: "food_13.png" },
    { name: "Roti Bakar Bandung", description: "Roti bakar dengan selai cokelat, keju, dan susu kental manis", price: 15000, category: "Sandwich", image: "food_14.png" },
    { name: "Kebab Turki", description: "Tortilla berisi daging sapi panggang, sayuran, dan saus sambal mayo", price: 25000, category: "Sandwich", image: "food_15.png" },
    { name: "Burger Rendang", description: "Burger dengan patty rendang sapi, selada, dan sambal hijau", price: 35000, category: "Sandwich", image: "food_16.png" },
    { name: "Roti Lapis Ayam", description: "Sandwich ayam panggang dengan sayuran segar dan saus wijen", price: 22000, category: "Sandwich", image: "food_13.png" },

    // Cake (images: food_17 to food_20, reuse food_17)
    { name: "Bolu Pandan", description: "Kue bolu lembut rasa pandan dengan lapisan santan gurih", price: 30000, category: "Cake", image: "food_17.png" },
    { name: "Lapis Legit", description: "Kue lapis khas Indonesia dengan rempah spekuk yang kaya rasa", price: 45000, category: "Cake", image: "food_18.png" },
    { name: "Bika Ambon", description: "Kue khas Medan bertekstur bersarang dengan aroma pandan", price: 35000, category: "Cake", image: "food_19.png" },
    { name: "Kue Lumpur", description: "Kue manis lembut bertekstur creamy dengan topping kismis", price: 12000, category: "Cake", image: "food_20.png" },
    { name: "Martabak Manis", description: "Terang bulan tebal dengan cokelat, kacang, keju, dan susu", price: 40000, category: "Cake", image: "food_17.png" },

    // Pure Veg (images: food_21 to food_24, reuse food_21)
    { name: "Sayur Lodeh", description: "Sayuran campur dalam kuah santan kuning yang gurih", price: 20000, category: "Pure Veg", image: "food_21.png" },
    { name: "Tumis Kangkung", description: "Kangkung segar ditumis dengan bawang putih dan terasi", price: 15000, category: "Pure Veg", image: "food_22.png" },
    { name: "Cap Cay Sayur", description: "Tumisan beragam sayuran segar dengan saus tiram", price: 22000, category: "Pure Veg", image: "food_23.png" },
    { name: "Tahu Tempe Penyet", description: "Tahu dan tempe goreng dipenyet dengan sambal bawang pedas", price: 18000, category: "Pure Veg", image: "food_24.png" },
    { name: "Pepes Tahu", description: "Tahu berbumbu rempah dibungkus daun pisang dan dikukus", price: 16000, category: "Pure Veg", image: "food_21.png" },

    // Pasta (images: food_25 to food_28, reuse food_25)
    { name: "Pasta Rendang", description: "Fusilli dengan saus rendang creamy khas Padang", price: 35000, category: "Pasta", image: "food_25.png" },
    { name: "Spaghetti Sambal Matah", description: "Spaghetti dengan sambal matah Bali dan udang panggang", price: 38000, category: "Pasta", image: "food_26.png" },
    { name: "Penne Saus Rica", description: "Penne dengan saus rica-rica Manado yang pedas", price: 32000, category: "Pasta", image: "food_27.png" },
    { name: "Fettuccine Soto", description: "Fettuccine dalam kuah soto ayam kuning creamy", price: 30000, category: "Pasta", image: "food_28.png" },
    { name: "Macaroni Schotel Indo", description: "Macaroni panggang dengan daging ayam suwir dan keju melimpah", price: 28000, category: "Pasta", image: "food_25.png" },

    // Noodels (images: food_29 to food_32, reuse food_29)
    { name: "Mie Goreng Jawa", description: "Mie goreng khas Jawa dengan kecap manis dan sayuran", price: 20000, category: "Noodels", image: "food_29.png" },
    { name: "Mie Aceh", description: "Mie kuah pedas khas Aceh dengan daging sapi dan rempah", price: 30000, category: "Noodels", image: "food_30.png" },
    { name: "Kwetiau Goreng", description: "Kwetiau lebar digoreng dengan telur, sayuran, dan kecap", price: 25000, category: "Noodels", image: "food_31.png" },
    { name: "Bakmi Ayam", description: "Mie halus dengan topping ayam cincang dan pangsit goreng", price: 28000, category: "Noodels", image: "food_32.png" },
    { name: "Indomie Goreng Spesial", description: "Indomie goreng dengan telur ceplok, sosis, dan sayuran", price: 18000, category: "Noodels", image: "food_29.png" },
];

async function seedFood() {
    console.log(`Seeding ${foodItems.length} food items...\n`);

    let success = 0;
    let failed = 0;

    for (const item of foodItems) {
        const imagePath = path.join(ASSETS_DIR, item.image);

        if (!fs.existsSync(imagePath)) {
            console.log(`❌ Image not found: ${item.image}, skipping ${item.name}`);
            failed++;
            continue;
        }

        try {
            const formData = new FormData();
            formData.append("name", item.name);
            formData.append("description", item.description);
            formData.append("price", item.price.toString());
            formData.append("category", item.category);

            const imageBuffer = fs.readFileSync(imagePath);
            const blob = new Blob([imageBuffer], { type: "image/png" });
            formData.append("image", blob, item.image);

            const response = await fetch(API_URL, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                console.log(`✅ [${item.category}] ${item.name} - Rp${item.price.toLocaleString()}`);
                success++;
            } else {
                console.log(`❌ ${item.name}: ${data.message}`);
                failed++;
            }
        } catch (error) {
            console.log(`❌ ${item.name}: ${error.message}`);
            failed++;
        }
    }

    console.log(`\n=== Seeding Complete ===`);
    console.log(`✅ Success: ${success}`);
    console.log(`❌ Failed: ${failed}`);
}

seedFood();
