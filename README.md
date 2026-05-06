#  HealthSteps :) — App de Monitoramento de Passos

Um aplicativo mobile desenvolvido com **React Native + Expo** que utiliza o acelerômetro do dispositivo para contar passos em tempo real, armazenar dados no banco e acompanhar progresso diário.

---

##  Funcionalidades

* 🔐 Autenticação de usuários (login / cadastro)
* 🚶‍♂️ Contagem de passos em tempo real (acelerômetro)
* 💾 Salvamento automático no banco de dados
* 📅 Histórico de passos por dia
* 🎯 Meta diária personalizada
* 📊 Barra de progresso estilo app fitness
* 👤 Tela de perfil (visualizar e alterar meta)
* 🔄 Sincronização automática com backend

---

##  Tecnologias utilizadas

* ⚛️ React Native (Expo)
* 🧭 Expo Router (navegação)
* 📡 Supabase (auth + banco de dados)
* 📱 Expo Sensors (acelerômetro)
* 🎨 Styled UI (custom styles)

---

## Estrutura do projeto

```
src/
 ├── components/
 │    ├── authForm/
 │    ├── stepsSensors/
 │
 ├── services/
 │    ├── supabase.ts
 │    ├── steps.ts
 │    └── user.ts
 │
 ├── hooks/
 │    └── useAuth.ts
 │
 └── constants/
      └── colors.ts

app/
 ├── (drawer)/
 │    ├── index.tsx      # Home (contador)
 │    ├── history.tsx    # Histórico
 │    └── profile.tsx    # Perfil
```

---

##  Como rodar o projeto

### 1. Instalar dependências

```bash
npm install
```

---

### 2. Configurar Supabase

Crie um arquivo:

```
src/services/supabase.ts
```

E adicione:

```ts
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "SUA_URL",
  "SUA_ANON_KEY"
);
```

---

### 3. Rodar o app

```bash
npx expo start
```

---

## Como funciona

### Contagem de passos

O app usa o acelerômetro para detectar movimento:

* calcula magnitude do movimento
* aplica filtro (remove gravidade)
* detecta picos (passos)
* evita duplicação com intervalo mínimo

---

### Salvamento

* Os passos são salvos automaticamente a cada 5 segundos
* Cada usuário tem registros por dia

---

### Banco de dados (Supabase)

#### Tabela: `steps`

| campo   | tipo |
| ------- | ---- |
| id      | uuid |
| user_id | uuid |
| date    | date |
| steps   | int  |

---

#### Tabela: `profiles`

| campo      | tipo |
| ---------- | ---- |
| id         | uuid |
| goal_steps | int  |

---


##  Autor

Desenvolvido por **Bruno Firmino Torres**

---
