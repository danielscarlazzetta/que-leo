interface Subcategory {
    name: string;
}

interface Category {
    name: string;
    subcategories?: Subcategory[];
}

const categories: Category[] = [
    { name: "Clásicos" },
    { 
        name: "Ciencias Sociales y Política",
        subcategories: [
            { name: "Historia de Chile" },
            { name: "Política" },
            { name: "Poesía" },
        ],
    },
    { 
        name: "Novelas",
        subcategories: [
            { name: "Juvenil" },
            { name: "Histórico" },
            { name: "Época" },
            { name: "Erótico" },
            { name: "Negra" },
            { name: "Contemporánea" },
        ],
    },
    { 
        name: "Autoayuda",
        subcategories: [
            { name: "Autoayuda" },
            { name: "Esoterismo" },
        ],
    },
    { 
        name: "Fantasía",
        subcategories: [
            { name: "Mundo Harry Potter" },
            { name: "Mundo Juego de Tronos" },
            { name: "Percy Jackson" },
            { name: "Fantasía" },
            { name: "Mundo de Sanderson" },
        ],
    },
    { name: "Terror y Suspenso" },
    { name: "Enciclopedias" },
    { 
        name: "Actualidad",
        subcategories: [
            { name: "Biografías" },
            { name: "Cocina" },
            { name: "Liderazgo" },
            { name: "Jardín" },
            { name: "Vinos" },
            { name: "Turismo" },
            { name: "Manga" },
        ],
    },
    { name: "Infantil" },
    { name: "Novedades" },
];

export default categories;