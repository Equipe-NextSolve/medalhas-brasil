// Cada produto tem um ID único que será usado na URL


export const products = [
    {
        id: 1,
        name: "Troféu de Bronze",
        image: "/products/produtTrophy-03.png",
        alt: "Troféu de Bronze",
        price: "R$ 50,00",
        description: "Troféu de bronze com acabamento elegante, ideal para reconhecer conquistas e celebrar grandes momentos.",
        details: "Troféu confeccionado com acabamento de alta qualidade, desenvolvido para premiações esportivas, acadêmicas, corporativas e eventos especiais.",
        specifications: {
            material: "Bronze",
            altura: "Personalizável",
            peso: "Variável",
            acabamento: "Acabamento premium"
        },
        category: "Troféu"
    },
    {
        id: 2,
        name: "Troféu de Prata",
        image: "/products/produtTrophy-02.png",
        alt: "Troféu de Prata",
        price: "R$ 50,00",
        description: "Troféu de prata com visual sofisticado, perfeito para homenagear conquistas e momentos de destaque.",
        details: "Troféu com acabamento prateado de alta qualidade, ideal para premiações em competições, eventos corporativos, acadêmicos e cerimônias especiais.",
        specifications: {
            material: "Prata",
            altura: "Personalizável",
            peso: "Variável",
            acabamento: "Acabamento espelhado"
        },
        category: "Troféu"
    },
    {
        id: 3,
        name: "Troféu de Ouro",
        image: "/products/produtTrophy-01.png",
        alt: "Troféu de Ouro",
        price: "R$ 50,00",
        description: "Troféu de ouro com acabamento brilhante, ideal para celebrar grandes conquistas e premiações especiais.",
        details: "Troféu com acabamento dourado de alta qualidade, desenvolvido para destacar os grandes vencedores em competições, eventos corporativos, acadêmicos e cerimônias.",
        specifications: {
            material: "Dourado",
            altura: "Personalizável",
            peso: "Variável",
            acabamento: "Acabamento brilhante"
        },
        category: "Troféu"
    }
    /*  {
       id: 4,
       name: "Medalha Bronze Personalizada",
       image: "/products/produtMedal-01.png",
       alt: "Medalha Bronze Personalizada",
       price: "R$ 20,00",
       description: "Medalha de bronze com personalização de nome e data.",
       details: "Medalha em bronze com gravação personalizada. Perfeita para eventos corporativos e premiações especiais.",
       specifications: {
         material: "Bronze",
         diâmetro: "50mm",
         peso: "45g",
         fita: "Fita vermelha padrão",
         personalização: "Gravação incluída"
       },
       category: "Medalhas Personalizadas"
     },
     {
       id: 5,
       name: "Medalha Prata Personalizada",
       image: "/products/produtMedal-02.png",
       alt: "Medalha Prata Personalizada",
       price: "R$ 30,00",
       description: "Medalha de prata com gravação personalizada.",
       details: "Medalha em prata com revestimento espelhado e gravação personalizada. Ideal para eventos corporativos de destaque.",
       specifications: {
         material: "Prata",
         diâmetro: "50mm",
         peso: "50g",
         fita: "Fita azul padrão",
         personalização: "Gravação incluída"
       },
       category: "Medalhas Personalizadas"
     },
     {
       id: 6,
       name: "Medalha Ouro Personalizada",
       image: "/products/produtMedal-03.png",
       alt: "Medalha Ouro Personalizada",
       price: "R$ 40,00",
       description: "Medalha de ouro com gravação personalizada premium.",
       details: "Medalha em ouro com acabamento brilhante e gravação personalizada. A escolha máxima para eventos de grande importância.",
       specifications: {
         material: "Ouro",
         diâmetro: "50mm",
         peso: "55g",
         fita: "Fita dourada padrão",
         personalização: "Gravação incluída"
       },
       category: "Medalhas Personalizadas"
     } */
];

// Função auxiliar para buscar um produto pelo ID
export const getProductById = (id) => {
    return products.find(product => product.id === parseInt(id));
};

// Função auxiliar para buscar produtos por categoria
export const getProductsByCategory = (category) => {
    return products.filter(product => product.category === category);
};

// Função auxiliar para obter todas as categorias
export const getCategories = () => {
    return [...new Set(products.map(product => product.category))];
};
