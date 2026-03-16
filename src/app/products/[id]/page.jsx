import Link from 'next/link'
import Image from 'next/image'
import { getProductById, products } from '@/data/products'
import { redirect } from 'next/navigation'

export async function generateMetadata({ params }) {
  const { id } = await params
  const product = getProductById(id)
  
  if (!product) {
    return {
      title: 'Produto não encontrado',
      description: 'O produto que você procura não existe.'
    }
  }

  return {
    title: `${product.name} | Medalhas Brasil`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
    }
  }
}

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }))
}

export default async function ProdutoDetalhePage({ params }) {
  const { id } = await params
  const product = getProductById(id)

  if (!product) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center ">
        <div className="text-center mt-20">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Produto não encontrado
          </h1>
          <p className="text-gray-600 mb-6">
            Desculpe, o produto que você procura não existe.
          </p>
          <Link
            href="/"
            className="inline-block bg-green-700 hover:bg-green-800 text-white font-medium px-8 py-3 rounded-lg transition duration-300"
          >
            Voltar para Home
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-16 mt-20">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-gray-600">
          <Link href="/" className="hover:text-green-700 transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">{product.name}</span>
        </div>

        {/* Conteúdo Principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Imagem do Produto */}
          <div className="flex items-center justify-center bg-white rounded-xl shadow-md p-8">
            <div className="relative w-full h-[400px] rounded-xl overflow-hidden group">
              <Image
                src={product.image}
                alt={product.alt}
                fill
                className="object-contain transition-transform duration-500 ease-in-out sm:group-hover:scale-110"
                priority
              />
            </div>
          </div>

          {/* Informações do Produto */}
          <div className="flex flex-col justify-center">
            <div className="mb-4">
              <span className="inline-block bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-medium">
                {product.category}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {product.name}
            </h1>

            <p className="text-2xl font-bold text-green-700 mb-6">
              {product.price}
            </p>

            <p className="text-gray-700 text-lg mb-8 leading-relaxed">
              {product.details}
            </p>

            {/* Especificações */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Especificações
              </h3>
              <div className="space-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-600 font-medium capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}:
                    </span>
                    <span className="text-gray-800 font-semibold text-sm sm:text-md">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/budget?produto=${product.id}`}
                className="flex-1 bg-green-700 hover:bg-green-800 text-white font-bold py-3 rounded-lg transition duration-300 text-center"
              >
                Solicitar Orçamento
              </Link>
              <Link
                href="/"
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 rounded-lg transition duration-300 text-center"
              >
                Voltar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
