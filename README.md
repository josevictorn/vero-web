# Vero Web — Documentação de Arquitetura (PT-BR)

## 1) Visão geral

Este projeto é um frontend em React + TypeScript com Vite, organizado por **domínio** (`modules`) e por **infraestrutura compartilhada** (`common`).

Stack principal:
- React 19
- TanStack Router
- TanStack Query
- React Hook Form + Zod
- Axios
- Tailwind + shadcn/ui + Radix
- Sonner (toasts)

Arquivos-base:
- Entrada da aplicação: `src/main.tsx`
- Raiz de rotas: `src/routes/__root.tsx`
- Layout autenticado: `src/routes/_app/layout.tsx`
- Layout público/auth: `src/routes/_auth/layout.tsx`

---

## 2) Estrutura de pastas (arquitetura)

```text
src/
  common/
    components/   # componentes reutilizáveis globais (ui e compostos)
    contexts/     # contextos globais (ex.: usuário)
    config/       # configuração local (ex.: storage)
    env/          # validação de variáveis de ambiente
    hooks/        # hooks reutilizáveis
    lib/          # libs/base adapters (ex.: axios)
    utils/        # utilitários e schemas comuns

  modules/
    auth/         # domínio de autenticação
    users/        # domínio de usuários

  routes/         # definição de páginas e layouts por rota
```

### Princípio de organização
- `common`: tudo que pode ser usado por múltiplos módulos.
- `modules`: regra de negócio e UI específica de cada domínio.
- `routes`: composição final de tela/layout e orquestração por URL.

---

## 3) Fluxo de dados (como a aplicação funciona)

Fluxo padrão de uma funcionalidade:
1. **Rota** (`routes/...`) monta a página.
2. **Controller** (`modules/*/controllers`) controla estado assíncrono com React Query.
3. **Service** (`modules/*/services`) chama API via `request` (Axios).
4. **Componentes de UI** (`modules/*/components`) renderizam formulário/listagem.
5. **Feedback** com toast e atualização de cache via `invalidateQueries`.

Exemplo real (edição de usuário):
- `UsersList` abre diálogo de edição.
- `EditUserController` busca usuário por ID e executa `updateUser`.
- `UserEditDialog` renderiza `UserCreateForm` em `mode="edit"`.

---

## 4) Tipos de componentes e como construir cada um

## 4.1 Componentes de UI base (Design System)

Onde ficam:
- `src/common/components/ui/*`

Objetivo:
- Componentes visuais atômicos (`Button`, `Input`, `Dialog`, `Table`, etc.).

Como construir:
1. Criar arquivo em `common/components/ui`.
2. Usar composição Radix/shadcn + classes Tailwind.
3. Manter API pequena e previsível (props explícitas).
4. Não colocar regra de negócio dentro de componente de UI base.

Quando usar:
- Sempre que precisar de peça visual reutilizável entre módulos.

---

## 4.2 Componentes compartilhados compostos

Onde ficam:
- `src/common/components/*` (fora de `ui`), ex.: `page-header`, `table`, `sidebar`.

Objetivo:
- Combinar componentes base para resolver padrões de tela recorrentes.

Como construir:
1. Definir `types.ts` com as props.
2. Compor somente o comportamento visual/comum.
3. Receber dados e callbacks por props (não acoplar serviço/API).

Exemplos:
- `PageHeader`: título/subtítulo/ação principal.
- `Table`: loading skeleton, vazio, paginação.
- `AppSidebar`: navegação lateral + usuário.

---

## 4.3 Componentes de domínio (módulo)

Onde ficam:
- `src/modules/<dominio>/components/*`

Objetivo:
- Renderizar UI específica da regra de negócio do domínio.

Como construir:
1. Criar componente focado em uma responsabilidade (ex.: `user-create-form`).
2. Validar formulário com Zod e React Hook Form.
3. Receber ação de submit por props (`onSubmit...`) ao invés de chamar API direto.
4. Suportar `create/edit` quando fizer sentido (com `mode`).

Exemplo de padrão usado:
- `UserCreateForm` é reaproveitado para criar e editar.

---

## 4.4 Controllers (camada de orquestração)

Onde ficam:
- `src/modules/<dominio>/controllers/*`

Objetivo:
- Orquestrar query/mutation, cache, toasts e estado assíncrono.

Como construir:
1. Usar `useQuery` para leitura e `useMutation` para escrita.
2. Invalidar/refetch de chaves após sucesso.
3. Tratar erro e expor feedback (toast).
4. Expor dados para UI via padrão **render prop** (`children({...})`).

Padrão do projeto:
- `ChildrenController<T>` e `BaseFormProps<TypeBody, Type>` em `src/global.d.ts`.

---

## 4.5 Services (acesso a API)

Onde ficam:
- `src/modules/<dominio>/services/*`

Objetivo:
- Centralizar chamadas HTTP e tipagem de payload/resposta.

Como construir:
1. Definir tipos em `services/types.ts`.
2. Implementar funções puras de API em `services/index.tsx`.
3. Reutilizar `request` de `src/common/lib/axios.ts`.
4. Não colocar lógica de UI/toast aqui.

Exemplos em `users/services`:
- `fetchAccounts`
- `createAccount`
- `updateUser`
- `getUserById`

---

## 4.6 Rotas (composição final)

Onde ficam:
- `src/routes/*`

Objetivo:
- Compor layout + controllers + componentes e aplicar guards de autenticação.

Como construir:
1. Criar arquivo de rota com `createFileRoute`.
2. Definir `beforeLoad` quando houver proteção/autorização.
3. Montar tela com componentes de `common` + `modules`.
4. Validar `search params` com Zod quando necessário.

Exemplo:
- `src/routes/_app/users/index.tsx` define página de usuários com create/list/edit.

---

## 5) Autenticação e contexto

Camadas usadas:
- `AuthProvider` (`modules/auth/contexts/auth-context`): login/logout e mutação.
- `UserProvider` (`common/contexts/user`): carrega perfil com `getProfile`.
- `RouterProvider` recebe `context.isAuthenticated` para guards nas rotas.

Token:
- Persistido em Local Storage via `common/config/storage`.
- Injetado em headers pelo interceptor do Axios.

---

## 6) Regras e convenções recomendadas

1. **Separação de responsabilidades**
   - UI em componentes.
   - Orquestração assíncrona em controllers.
   - HTTP em services.

2. **Tipagem explícita**
   - Tipos de request/response em `services/types.ts`.
   - Evitar `any`.

3. **Validação consistente**
   - Schemas compartilhados em `common/utils/validation-schemas.ts`.

4. **Estados de interface**
   - Sempre tratar loading, erro e vazio.

5. **Cache React Query**
   - Padronizar `queryKey` por domínio e operação.

---

## 7) Guia rápido: criar um novo módulo

Exemplo: módulo `clients`.

1. Estrutura inicial:
```text
src/modules/clients/
  components/
  controllers/
  services/
  utils/
```

2. Criar `services/types.ts` e `services/index.tsx`.
3. Criar controller de listagem e controller de criação/edição.
4. Criar componentes de formulário/lista/dialog.
5. Criar rota em `src/routes/_app/clients/index.tsx`.
6. Adicionar item no menu lateral (`navMain` da sidebar).
7. Garantir invalidação de cache após mutations.
8. Validar com `pnpm run typecheck` e `pnpm run check`.

---

## 8) Scripts úteis

- `pnpm run dev` — desenvolvimento
- `pnpm run build` — build de produção
- `pnpm run typecheck` — checagem de tipos
- `pnpm run check` — lint/check (Ultracite)
- `pnpm run fix` — correções automáticas

---

## 9) Melhorias arquiteturais sugeridas

1. Padronizar nomes (`Account` vs `User`) para reduzir ambiguidade.
2. Definir convenção única de `queryKey` (com paginação inclusa na chave).
3. Extrair constantes de chaves React Query para arquivo central por módulo.
4. Evoluir para documentação viva por módulo (README por pasta).

---

## 10) Resumo

A aplicação já segue uma base sólida de arquitetura em camadas:
- **Routes** para composição e navegação,
- **Controllers** para orquestração de estado assíncrono,
- **Services** para API,
- **Components** para UI.

Esse padrão facilita manutenção, reuso e evolução por domínio.
