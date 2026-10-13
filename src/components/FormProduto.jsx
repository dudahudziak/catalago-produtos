import { useState } from 'react'
import placeholder from '../assets/placeholder.svg'

const formInicial = { nome: '', preco: '', descricao: '', imagem: '' }

// Formulário controlado: cada campo é ligado a um state
function FormProduto({ onAdicionar }) {
  const [form, setForm] = useState(formInicial)
  const [erro, setErro] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (!form.nome.trim() || !form.descricao.trim() || !form.preco) {
      setErro('Preencha nome, preço e descrição.')
      return
    }
    if (Number(form.preco) <= 0) {
      setErro('O preço deve ser maior que zero.')
      return
    }

    onAdicionar({
      id: Date.now(),
      nome: form.nome.trim(),
      preco: Number(form.preco),
      descricao: form.descricao.trim(),
      imagem: form.imagem.trim() || placeholder, // imagem é opcional
    })

    setForm(formInicial)
    setErro('')
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Cadastrar novo produto</h2>

      <label htmlFor="nome">Nome *</label>
      <input id="nome" name="nome" value={form.nome} onChange={handleChange} required />

      <label htmlFor="preco">Preço (R$) *</label>
      <input id="preco" name="preco" type="number" step="0.01" min="0.01"
             value={form.preco} onChange={handleChange} required />

      <label htmlFor="descricao">Descrição *</label>
      <textarea id="descricao" name="descricao" rows="3"
                value={form.descricao} onChange={handleChange} required />

      <label htmlFor="imagem">URL da imagem (opcional)</label>
      <input id="imagem" name="imagem" type="url" placeholder="https://..."
             value={form.imagem} onChange={handleChange} />

      {erro && <p className="erro">{erro}</p>}

      <button type="submit">Adicionar produto</button>
    </form>
  )
}

export default FormProduto
