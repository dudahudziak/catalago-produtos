import { useState, useEffect } from 'react'
import ProdutoCard from '../components/ProdutoCard'
import FormProduto from '../components/FormProduto'
import { produtosMock } from '../data/produtos'

const CHAVE = 'catalogo-produtos' // chave usada no localStorage

function Home() {
  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(true)

  // 1) Carregamento inicial simulado: lê o que está salvo no navegador
  //    (se não houver nada salvo, usa os produtos mockados)
  useEffect(() => {
    const timer = setTimeout(() => {
      let salvos = null
      try {
        salvos = JSON.parse(localStorage.getItem(CHAVE))
      } catch {
        salvos = null
      }
      setProdutos(salvos ?? produtosMock)
      setCarregando(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // 2) Sempre que a lista mudar (adicionar/remover), salva no navegador
  useEffect(() => {
    if (!carregando) {
      localStorage.setItem(CHAVE, JSON.stringify(produtos))
    }
  }, [produtos, carregando])

  function adicionarProduto(novoProduto) {
    setProdutos([...produtos, novoProduto])
  }

  function removerProduto(id) {
    setProdutos(produtos.filter((produto) => produto.id !== id))
  }

  return (
    <>
      <section>
        <h2>Produtos</h2>

        {carregando ? (
          <p className="carregando">Carregando...</p>
        ) : produtos.length === 0 ? (
          <p className="carregando">Nenhum produto cadastrado.</p>
        ) : (
          <div className="grid">
            {produtos.map((produto) => (
              <ProdutoCard
                key={produto.id}
                nome={produto.nome}
                preco={produto.preco}
                imagem={produto.imagem}
                descricao={produto.descricao}
                onRemover={() => removerProduto(produto.id)}
              />
            ))}
          </div>
        )}
      </section>

      <FormProduto onAdicionar={adicionarProduto} />
    </>
  )
}

export default Home