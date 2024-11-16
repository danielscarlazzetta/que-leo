
import prisma from '../lib/prisma'
import { initialData } from "./seed";
import { countries } from './seed-countries';


async function main() {

    // 1. borrar data
    // await Promise.all([
    //     prisma.productImage.deleteMany(),
    //     prisma.product.deleteMany(),
    //     prisma.category.deleteMany(),
    // ])

    await prisma.orderAddress.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();

    await prisma.userAddress.deleteMany();
    await prisma.user.deleteMany();
    await prisma.country.deleteMany();

    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();



    const { categories, products, user } = initialData;

    await prisma.user.createMany({
      data: user
    })

    await prisma.country.createMany({
      data: countries
    })

    //2. Insertar categorias

    // Primera forma de hacerlo
    // Esta forma funciona pero si quisieramos agregarlas de una en una
    // await prisma.category.create({
    //     data: {
    //         name: 'Shirts',
    //     }
    // })

    const categoriesData = categories.map( name => ({ name}));

    await prisma.category.createMany({
        data: categoriesData,
    });

    //3. Preguntar a la base de datos los ids de las categorias
    const categoriesDB = await prisma.category.findMany();

    
    const categoriesMap = categoriesDB.reduce( (map, category) => {
        
        map[ category.name.toLowerCase() ] = category.id;
        return map;
        
    }, {} as Record<string, string>);//<string = category, string = id>


    //Ingresar productos 

    
  products.forEach( async(product) => {

    const { type, images, ...rest } = product;

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type]
      }
    })


    // Images
    const imagesData = images.map( images => ({
      url: images,
      productId: dbProduct.id
    }));

    await prisma.productImage.createMany({
      data: imagesData
    });


  });


    console.log('Seed ejecutado')
}


(() => {
    //evitamos que se ejecute el seed en produccion
    if (process.env.NODE_ENV === 'production') return;
    main();
})();