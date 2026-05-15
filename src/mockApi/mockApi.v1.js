// src/api/v1/mockApi.js
// Simulación de API REST versionada para Café Santara

const API_VERSION = "/api/v1";

// ----------------------
// DATA
// ----------------------
const products = [
    {
        id: 1,
        name: "Espresso Clásico",
        description: "Concentrado intenso de café de origen único, con notas de chocolate amargo y avellana.",
        price: 4500,
        category: "bebidas",
        image: "../public/images/espreso.png",
    },
    {
        id: 2,
        name: "Latte Artesanal",
        description: "Espresso suave con leche vaporizada cremosa y arte latte dibujado a mano.",
        price: 7200,
        category: "bebidas",
        image: "../public/images/latte.png",
    },
    {
        id: 3,
        name: "Capuchino Premium",
        description: "Equilibrio perfecto entre espresso, leche vaporizada y espuma densa de leche.",
        price: 6800,
        category: "bebidas",
        image: "../public/images/capuchino.png",
    },
    {
        id: 4,
        name: "Frappé de Caramelo",
        description: "Café frío batido con caramelo artesanal, crema batida y toffee crocante.",
        price: 9500,
        category: "bebidas",
        image: "../public/images/frappe.png",
    },
    {
        id: 5,
        name: "Croissant de Mantequilla",
        description: "Hojaldre francés recién horneado, crujiente por fuera y suave por dentro.",
        price: 5500,
        category: "alimentos",
        image: "../public/images/croissant.jpg",
    },
    {
        id: 6,
        name: "Muffin de Arándanos",
        description: "Esponjoso muffin casero con arándanos frescos y una capa de azúcar perlado.",
        price: 4800,
        category: "alimentos",
        image: "../public/images/Muffin.jpg",
    },
    {
        id: 7,
        name: "Tostada con Aguacate",
        description: "Pan de masa madre tostado con aguacate, huevo pochado y semillas de sésamo.",
        price: 8900,
        category: "alimentos",
        image: "../public/images/tostada.jpg",
    },
    {
        id: 8,
        name: "Combo Mañanero",
        description: "Cualquier bebida caliente + croissant o muffin a precio especial. El desayuno perfecto.",
        price: 10500,
        category: "combos",
        image: "../public/images/Combo.jpeg",
    },
    ];

    // ----------------------
    // HELPERS
    // ----------------------
    function simulateDelay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
    }

    function simulateError(probability) {
    return Math.random() < probability;
    }

    // ----------------------
    // ENDPOINTS
    // ----------------------

    /**
     * GET /api/v1/products
     */
    export async function getProducts() {
    console.log(`GET ${API_VERSION}/products`);

    await simulateDelay(800);

    if (simulateError(0.1)) {
        console.error("500 Internal Server Error: No se pudo obtener el catálogo");
        throw new Error("No pudimos cargar el menú. Intenta recargar la página.");
    }

    return products;
    }

    /**
     * GET /api/v1/products/:id
     */
    export async function getProductById(id) {
    console.log(`GET ${API_VERSION}/products/${id}`);

    await simulateDelay(500);

    const product = products.find((p) => p.id === Number(id));

    if (!product) {
        console.error("404 Not Found: Producto no encontrado");
        throw new Error("Producto no encontrado");
    }

    return product;
    }

    /**
     * POST /api/v1/orders
     */
    export async function submitOrder(orderData) {
    console.log(`POST ${API_VERSION}/orders`, orderData);

    await simulateDelay(1200);

    if (simulateError(0.2)) {
        console.error("500 Internal Server Error: No se pudo registrar el pedido");
        throw new Error("No pudimos procesar tu pedido. Inténtalo de nuevo.");
    }

    const randomId = Math.floor(1000 + Math.random() * 9000);

    return {
        success: true,
        orderId: `CAF-${randomId}`,
        message: "Pedido registrado correctamente",
    };
    }