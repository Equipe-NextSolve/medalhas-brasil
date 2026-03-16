// Cada produto tem um ID único que será usado na URL


export const products = [
  {
    id: 1,
    name: "Medalha Bronze",
    image: "/medalbronze.png",
    alt: "Medalha Bronze",
    price: "R$ 15,00",
    description: "Medalha de bronze de alta qualidade, perfeita para competições e eventos.",
    details: "Medalha confeccionada em bronze com acabamento premium. Ideal para premiações em competições esportivas, acadêmicas e corporativas.",
    specifications: {
      material: "Bronze",
      diâmetro: "50mm",
      peso: "45g",
      fita: "Fita vermelha padrão"
    },
    category: "Medalhas"
  },
  {
    id: 2,
    name: "Medalha Prata",
    image: "/medaliron.png",
    alt: "Medalha Prata",
    price: "R$ 25,00",
    description: "Medalha de prata com acabamento espelhado, elegante e sofisticada.",
    details: "Medalha em prata com revestimento espelhado. Excelente para eventos de prestígio e competições de destaque.",
    specifications: {
      material: "Prata",
      diâmetro: "50mm",
      peso: "50g",
      fita: "Fita azul padrão"
    },
    category: "Medalhas"
  },
  {
    id: 3,
    name: "Medalha Ouro",
    image: "/medalgold.png",
    alt: "Medalha Ouro",
    price: "R$ 35,00",
    description: "Medalha de ouro, o topo da linha para as melhores premiações.",
    details: "Medalha em ouro com acabamento brilhante. A escolha premium para eventos de grande importância e competições internacionais.",
    specifications: {
      material: "Ouro",
      diâmetro: "50mm",
      peso: "55g",
      fita: "Fita dourada padrão"
    },
    category: "Medalhas"
  },
  {
    id: 4,
    name: "Medalha Bronze Personalizada",
    image: "/medalbronze.png",
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
    image: "/medaliron.png",
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
    image: "/medalgold.png",
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
  }
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
