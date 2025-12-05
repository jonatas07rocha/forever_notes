# Forever Notes

> Um aplicativo web de produtividade moderno que combina Bullet Journal, Task Manager e Sistema de Notas em uma unica plataforma intuitiva.

## Caracteristicas Principais

### Multiplos Tipos de Entradas
- **Notas**: Texto ilimitado com suporte a formatacao
- **Tarefas**: Com limite de 140 caracteres (BuJo style)
- **Eventos**: Agendamento com datas e alertas
- **Reflexoes**: Anotacoes reflexivas de ate 280 caracteres
- **Ideias**: Captura rapida de conceitos (140 caracteres)

### Funcionalidades Avancadas
- **Hubs**: Organize por contextos (Pessoal, Trabalho, etc)
- **Colecoes por Tags**: #hashtags para categorizacao automatica
- **Sistema de Prioridades**: Marque com para priorizacao
- **Linking**: Use >> para vincular a Hubs ou executar buscas rapidas
- **Diario com Periodos**: Visualize Hoje, Todos os Itens ou Futuros
- **Calendario Interativo**: Visualize eventos por data
- **Busca Global**: Encontre qualquer item instantaneamente
- **Modo Visual e Classico**: Escolha sua preferencia de visualizacao
- **Dark Mode**: Tema claro/escuro
- **Backup & Restauracao**: Exporte e importe dados em JSON

## Como Usar

### Iniciando
1. Acesse [Forever Notes](https://forevernotes.vercel.app/)
2. Dados sao salvos localmente no seu navegador (localStorage)
3. Faça backup regularmente na seção Configuracoes

### Atalhos Principais
- **/** : Abre a entrada global de itens (funciona em qualquer lugar)
- **#tag** : Cria colecoes automaticamente
- **>>** : Cria links para Hubs ou executa buscas
- **✱** : Marca item como prioridade
- **Amanha/Hoje/@dia/mes** : Interpreta datas naturais
- **Shift+Enter** : Quebra de linha em modo global
- **Esc** : Fecha menus e modais

## Estrutura do Projeto

```
forever_notes/
├── index.html      # HTML principal (interface)
├── app.js          # Logica completa da aplicacao
├── styles.css      # Estilos com Tailwind CSS
└── README.md       # Esta documentacao
```

### Componentes Principais (app.js)

#### Estado Global
- `state.entries`: Array de todas as notas/tarefas/eventos
- `state.hubs`: Contextos de organizacao
- `state.activeTab`: Aba atual (home, journal, hubs, collections, calendar)
- `state.prefs`: Preferencias do usuario (tema, alertas, etc)

#### Funcoes Principais

**Gerenciamento de Entradas:**
- `addNewEntry()` : Adiciona nova entrada
- `toggleEntry(id)` : Marca como completo/incompleto
- `deleteEntry(id)` : Remove uma entrada
- `startEditEntry(id)` : Ativa edicao inline
- `saveEditEntry(id, content)` : Salva edicao

**Hubs e Contextos:**
- `createNewHub()` : Cria novo hub
- `openHub(hubId)` : Abre hub específico
- `deleteHub(hubId)` : Deleta hub

**Tags e Colecoes:**
- `extractTags(content)` : Extrai #tags do texto
- `getUniqueTags()` : Retorna lista de tags únicas
- `openCollection(tagName)` : Abre colecao por tag
- `boostTagRelevance(tag)` : Incrementa relevância da tag

**Renderizacao:**
- `render()` : Funcao principal que renderiza a UI
- `renderEntry(entry)` : Renderiza item individual
- `getHomeHTML()` : Dashboard principal
- `getJournalHTML()` : View de diario
- `getCalendarHTML()` : Visualizacao em calendario

**Dados:**
- `saveData()` : Persiste em localStorage
- `loadData()` : Carrega dados salvos
- `exportData()` : Exporta backup JSON
- `importData(file)` : Importa backup JSON

**Interface:**
- `handleGlobalKeydown(e)` : Listener global (/) 
- `openGlobalInput()` : Abre modal de entrada global
- `toggleTheme()` : Alterna tema claro/escuro
- `toggleViewMode()` : Alterna visual/classico

## Tipos de Entradas (ENTRY_TYPES)

| Tipo | Label | Icone | Limite | Simbolo |
|------|-------|-------|--------|----------|
| note | Nota | align-left | Ilimitado | — |
| task | Tarefa | check-square | 140 | • |
| event | Evento | calendar | 140 | ○ |
| reflection | Reflexao | moon | 280 | > |
| idea | Ideia | lightbulb | 140 | ! |

## Tecnologias

- **HTML5** : Estrutura
- **CSS3 + Tailwind CSS** : Estilos
- **JavaScript (Vanilla)** : Logica
- **Lucide Icons** : Iconografia
- **LocalStorage** : Persistencia
- **Vercel** : Deploy

## Roadmap

- [ ] Sincronizacao na nuvem
- [ ] Modo offline com service workers
- [ ] Compartilhamento de hubs
- [ ] API REST
- [ ] Mobile app nativa
- [ ] Integracao com calendarios
- [ ] Modo colaborativo

## Licenca

MIT License - Veja LICENSE para detalhes

## Autor

**Jonatas Rocha** (@jonatas07rocha)
- GitHub: [github.com/jonatas07rocha](https://github.com/jonatas07rocha)
- Deployed: [forevernotes.vercel.app](https://forevernotes.vercel.app/)

---

**Versao**: 3.0.0  
**Ultima Atualizacao**: Dezembro 2025  
**Status**: Ativo e em desenvolvimento
