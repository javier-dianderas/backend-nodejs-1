import { CartModel } from "../models/cart.model.js";
import { ProductModel } from "../models/product.model.js";
import dotenv from "dotenv";

const products = [
    {
        code:"SAM-S24-256",
        category:"Smartphones",
        title:"Samsung Galaxy S24 256GB",
        price:999,
        status:true,
        stock:32,
        thumbnails:[
            "https://picsum.photos/seed/smartphone-1-1/400/400",
            "https://picsum.photos/seed/smartphone-1-2/400/400",
            "https://picsum.photos/seed/smartphone-1-3/400/400"
        ],
        description:"Smartphone premium con pantalla AMOLED y alto rendimiento."
    },
    {
        code:"APL-IP15-128",
        category:"Smartphones",
        title:"Apple iPhone 15 128GB",
        price:899,
        status:true,
        stock:21,
        thumbnails:[
            "https://picsum.photos/seed/smartphone-2-1/400/400",
            "https://picsum.photos/seed/smartphone-2-2/400/400",
            "https://picsum.photos/seed/smartphone-2-3/400/400"
        ],
        description:"iPhone con chip A16 y cámara avanzada."
    },
    {
        code:"GOO-PX8-128",
        category:"Smartphones",
        title:"Google Pixel 8",
        price:799,
        status:true,
        stock:17,
        thumbnails:[
            "https://picsum.photos/seed/smartphone-3-1/400/400",
            "https://picsum.photos/seed/smartphone-3-2/400/400",
            "https://picsum.photos/seed/smartphone-3-3/400/400"
        ],
        description:"Pixel con fotografía computacional avanzada."
    },
    {
        code:"XIA-13-256",
        category:"Smartphones",
        title:"Xiaomi 13 256GB",
        price:699,
        status:true,
        stock:40,
        thumbnails:[
            "https://picsum.photos/seed/smartphone-4-1/400/400",
            "https://picsum.photos/seed/smartphone-4-2/400/400",
            "https://picsum.photos/seed/smartphone-4-3/400/400"
        ],
        description:"Smartphone potente con cámara Leica."
    },
    {
        code:"ONE-11-256",
        category:"Smartphones",
        title:"OnePlus 11 256GB",
        price:749,
        status:true,
        stock:26,
        thumbnails:[
            "https://picsum.photos/seed/smartphone-5-1/400/400",
            "https://picsum.photos/seed/smartphone-5-2/400/400",
            "https://picsum.photos/seed/smartphone-5-3/400/400"
        ],
        description:"Rendimiento flagship con carga rápida."
    },
    {
        code:"SAM-S23FE",
        category:"Smartphones",
        title:"Samsung Galaxy S23 FE",        
        price:649,
        status:true,
        stock:33,
        thumbnails:[
            "https://picsum.photos/seed/smartphone-6-1/400/400",
            "https://picsum.photos/seed/smartphone-6-2/400/400",
            "https://picsum.photos/seed/smartphone-6-3/400/400"
        ],
        description:"Versión Fan Edition con alto rendimiento."
    },
    {        
        code:"APL-IP14",
        idcategory:1,
        category:"Smartphones",
        title:"iPhone 14",        
        price:799,
        status:true,        
        stock:29,
        thumbnails:[
            "https://picsum.photos/seed/smartphone-7-1/400/400",
            "https://picsum.photos/seed/smartphone-7-2/400/400",
            "https://picsum.photos/seed/smartphone-7-3/400/400"
        ],
        description:"iPhone con cámara dual avanzada."
    },
    {        
        code:"XIA-REDMI12",
        idcategory:1,
        category:"Smartphones",
        title:"Redmi Note 12",        
        price:299,
        status:true,        
        stock:60,
        thumbnails:[
            "https://picsum.photos/seed/smartphone-8-1/400/400",
            "https://picsum.photos/seed/smartphone-8-2/400/400",
            "https://picsum.photos/seed/smartphone-8-3/400/400"
        ],
        description:"Smartphone económico con gran batería."
    },
    {        
        code:"GOO-PX7A",
        idcategory:1,
        category:"Smartphones",
        title:"Google Pixel 7a",        
        price:499,
        status:true,        
        stock:28,
        thumbnails:[
            "https://picsum.photos/seed/smartphone-9-1/400/400",
            "https://picsum.photos/seed/smartphone-9-2/400/400",
            "https://picsum.photos/seed/smartphone-9-3/400/400"
        ],
        description:"Pixel asequible con gran cámara."
    },
    {        
        code:"ONE-NORD3",
        idcategory:1,
        category:"Smartphones",
        title:"OnePlus Nord 3",        
        price:549,
        status:true,        
        stock:37,
        thumbnails:[
            "https://picsum.photos/seed/smartphone-10-1/400/400",
            "https://picsum.photos/seed/smartphone-10-2/400/400",
            "https://picsum.photos/seed/smartphone-10-3/400/400"
        ],
        description:"Rendimiento equilibrado y carga rápida."
    },
    {        
        code:"APL-IPAD10",
        idcategory:2,
        category:"Tablets",
        title:"Apple iPad 10th Gen",        
        price:599,
        status:true,        
        stock:25,
        thumbnails:[
            "https://picsum.photos/seed/tablet-1-1/400/400",
            "https://picsum.photos/seed/tablet-1-2/400/400",
            "https://picsum.photos/seed/tablet-1-3/400/400"
        ],
        description:"Tablet versátil para trabajo y entretenimiento."
    },
    {        
        code:"SAM-TABS9",
        idcategory:2,
        category:"Tablets",
        title:"Samsung Galaxy Tab S9",        
        price:799,
        status:true,        
        stock:22,
        thumbnails:[
            "https://picsum.photos/seed/tablet-2-1/400/400",
            "https://picsum.photos/seed/tablet-2-2/400/400",
            "https://picsum.photos/seed/tablet-2-3/400/400"
        ],
        description:"Tablet premium con pantalla AMOLED."
    },
    {        
        code:"LEN-PADP11",
        idcategory:2,
        category:"Tablets",
        title:"Lenovo Tab P11",        
        price:329,
        status:true,        
        stock:30,
        thumbnails:[
            "https://picsum.photos/seed/tablet-3-1/400/400",
            "https://picsum.photos/seed/tablet-3-2/400/400",
            "https://picsum.photos/seed/tablet-3-3/400/400"
        ],
        description:"Tablet ideal para estudio y multimedia."
    },
    {        
        code:"HUA-MATEPAD11",
        idcategory:2,
        category:"Tablets",
        title:"Huawei MatePad 11",        
        price:449,
        status:true,        
        stock:20,
        thumbnails:[
            "https://picsum.photos/seed/tablet-4-1/400/400",
            "https://picsum.photos/seed/tablet-4-2/400/400",
            "https://picsum.photos/seed/tablet-4-3/400/400"
        ],
        description:"Tablet elegante con pantalla fluida."
    },
    {        
        code:"XIA-PAD6",
        idcategory:2,
        category:"Tablets",
        title:"Xiaomi Pad 6",        
        price:399,
        status:true,        
        stock:33,
        thumbnails:[
            "https://picsum.photos/seed/tablet-5-1/400/400",
            "https://picsum.photos/seed/tablet-5-2/400/400",
            "https://picsum.photos/seed/tablet-5-3/400/400"
        ],
        description:"Tablet potente para productividad."
    },
    {        
        code:"APP-WATCH9",
        idcategory:3,
        category:"Smartwatches",
        title:"Apple Watch Series 9",        
        price:429,
        status:true,        
        stock:35,
        thumbnails:[
            "https://picsum.photos/seed/watch-1-1/400/400",
            "https://picsum.photos/seed/watch-1-2/400/400",
            "https://picsum.photos/seed/watch-1-3/400/400"
        ],
        description:"Smartwatch con funciones avanzadas de salud."
    },
    {        
        code:"SAM-WATCH6",
        idcategory:3,
        category:"Smartwatches",
        title:"Samsung Galaxy Watch 6",        
        price:329,
        status:true,        
        stock:41,
        thumbnails:[
            "https://picsum.photos/seed/watch-2-1/400/400",
            "https://picsum.photos/seed/watch-2-2/400/400",
            "https://picsum.photos/seed/watch-2-3/400/400"
        ],
        description:"Seguimiento completo de salud y deporte."
    },
    {        
        code:"ANK-65W",
        idcategory:4,
        category:"Accesorios para móvil",
        title:"Anker 65W Fast Charger",        
        price:49,
        status:true,        
        stock:120,
        thumbnails:[
            "https://picsum.photos/seed/accessory-1-1/400/400",
            "https://picsum.photos/seed/accessory-1-2/400/400",
            "https://picsum.photos/seed/accessory-1-3/400/400"
        ],
        description:"Cargador rápido compatible con múltiples dispositivos."
    },
    {        
        code:"BEL-WIRELESS",
        idcategory:4,
        category:"Accesorios para móvil",
        title:"Belkin Wireless Charger",        
        price:39,
        status:true,        
        stock:75,
        thumbnails:[
            "https://picsum.photos/seed/accessory-2-1/400/400",
            "https://picsum.photos/seed/accessory-2-2/400/400",
            "https://picsum.photos/seed/accessory-2-3/400/400"
        ],
        description:"Cargador inalámbrico rápido."
    }
];

export const seedDatabase = async ({ force = false, fromCli = false } = {}) => {
    dotenv.config();
    if (!process.env.seedData && !force && !fromCli) {
        console.log("SEED_DATA=false — seed omitido. Ejecuta npm run seed o npm run seed:force");
        return;
    }

    const productCount = await ProductModel.countDocuments();
    if (productCount > 0 && !force) {
        console.log(`Ya existen ${userCount} productos. Seed omitido.`);
        console.log("Ejecuta: npm run seed:force");
        return;
    }

    if (force) {
        await CartModel.deleteMany({});
        await ProductModel.deleteMany({});
        console.log("Colecciones carts y products limpiadas");
    }
    
    console.log("Datos cargados:");
    for (const item of products) {
        const newProduct = await ProductModel.create(item);
        console.log(`${newProduct.id} - ${newProduct.title}`);
    }
};