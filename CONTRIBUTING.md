# Contribuindo para Forever Notes

Obrigado por seu interesse em contribuir para o Forever Notes! Este documento oferece diretrizes e informacoes para fazer contribuicoes efetivas.

## Como Contribuir

### Reportar Bugs

1. **Verifique se o bug ja foi reportado**: Procure nos Issues antes de criar um novo
2. **Descreva o problema com clareza**: Inclua titulo descritivo
3. **Forneça passos para reproduzir**: Seja o mais especifico possivel
4. **Descreva o comportamento observado vs esperado**
5. **Inclua screenshots se possivel**
6. **Mencione sua versao do navegador e SO**

Exemplo:
```
Titulo: Tarefas nao aparecem na secao Hoje
Passo: 1. Crie uma tarefa para hoje
       2. Navegue para a aba Journal
       3. Selecione o filtro 'Hoje'
Resultado esperado: Tarefa deve aparecer
Resultado observado: Tarefa nao aparece
Navegador: Chrome 120.0
```

### Sugerir Melhorias (Features)

1. Use um titulo claro e descritivo
2. Forneça uma descricao detalhada do comportamento desejado
3. Explique por que essa melhoria seria util
4. Liste exemplos de outras aplicacoes que implementam esse recurso (opcional)

## Guia de Desenvolvimento

### Configuracao Local

1. Faça um fork do repositorio
2. Clone seu fork:
   ```bash
   git clone https://github.com/[seu-usuario]/forever_notes.git
   cd forever_notes
   ```
3. Crie uma branch para sua feature:
   ```bash
   git checkout -b feature/sua-feature
   ```

### Estrutura de Arquivos

```
forever_notes/
├─ index.html   # Estrutura HTML (contem o DOM)
├─ app.js       # Toda a logica JavaScript
├─ styles.css   # Estilos com Tailwind CSS
├─ README.md    # Documentacao do projeto
└─ CONTRIBUTING.md
```

### Padroes de Codigo

#### JavaScript
- Use funcoes nomeadas para melhor legibilidade
- Adicione comentarios para logica complexa
- Use nomes descritivos para variaveis
- Exemplo:
  ```javascript
  // Bom
  function saveDataToLocalStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
  
  // Evitar
  function s() {
    localStorage.setItem('data', JSON.stringify(state));
  }
  ```

#### CSS
- Use Tailwind CSS classes quando possivel
- Evite CSS customizado sem necessidade
- Mantenha a consistencia de cores
- Use variáveis CSS para temas

#### HTML
- Mantenha estrutura semântica
- Use ids/classes descritivas
- Adicione atributos de acessibilidade

### Testes

Ainda não temos suite de testes. Ao implementar features:
1. Teste manualmente no navegador
2. Teste em multiplos navegadores (Chrome, Firefox, Safari)
3. Teste em modo responsivo (mobile/tablet)
4. Verifique console para erros/warnings

### Submeter Pull Request

1. Push sua branch para seu fork
2. Crie um Pull Request com titulo descritivo
3. Descreva as mudancas e por que foram feitas
4. Referencie issues relacionadas com "Fixes #123"
5. Mantenha a descricao concisa mas informativa

## Padroes de Commit

Use mensagens de commit claras:

```
[tipo] descricao breve

Descricao detalhada se necessario.

Fixes #123
```

Tipos comuns:
- **feat**: Nova feature
- **fix**: Bug fix
- **docs**: Mudancas na documentacao
- **refactor**: Refatoracao de codigo
- **style**: Mudancas de estilo (nao afetam logica)
- **perf**: Melhorias de performance

Exemplos:
```
feat: Adicionar modo escuro (Dark Mode)
fix: Corrigir bug onde tags nao eram salvas
docs: Atualizar README com instrucoes de instalacao
```

## Requisitos de Pull Request

- [ ] Codigo foi testado localmente
- [ ] Nenhum console error ou warning
- [ ] Commit messages seguem o padrao
- [ ] README foi atualizado (se necessario)
- [ ] Funciona em multiplos navegadores
- [ ] Responde bem em dispositivos moveis

## Dúvidas?

- Abra uma Discussion no GitHub
- Consulte a documentacao do README
- Procure em Issues existentes

## Licenca

Ao contribuir, você concorda que sua contribuicao sera licenciada sob a mesma licenca MIT do projeto.

---

Obrigado por melhorar o Forever Notes! 🎉
