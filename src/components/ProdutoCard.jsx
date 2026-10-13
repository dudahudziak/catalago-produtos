// Componente reutilizável: recebe os dados do produto via props
function ProdutoCard({ nome, preco, imagem, descricao, onRemover }) {
  const precoFormatado = preco.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return (
    <article className="card">
      <img src={imagem} alt={nome} className="card-img" />
      <div className="card-corpo">
        <h3>{nome}</h3>
        <p className="card-desc">{descricao}</p>
        <p className="card-preco">{precoFormatado}</p>
        <button type="button" className="btn-remover" onClick={onRemover}>
          Remover
        </button>
      </div>
    </article>
  )
}

export default ProdutoCard