import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { User } from "next-auth"

// Estendendo o tipo User para incluir a role
declare module "next-auth" {
  interface User {
    role?: string
  }
}

// Variável de ambiente para o segredo de autenticação.
// !! IMPORTANTE !! Gere um segredo forte e aleatório para produção!
// Você pode usar: openssl rand -base64 32
// E armazene-o em suas variáveis de ambiente (ex: .env.local)
const authSecret = process.env.AUTH_SECRET || "default_secret_for_development_1234567890_abcdefghijklmnopqrstuvwxyz"

if (process.env.NODE_ENV === 'production' && authSecret === "default_secret_for_development_1234567890_abcdefghijklmnopqrstuvwxyz") {
  console.warn("AVISO: AUTH_SECRET não está configurado para produção! Use um segredo forte e aleatório.")
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // O nome a ser exibido no formulário de login (por exemplo, 'Email e Senha')
      name: 'Credentials',
      // O objeto `credentials` é usado para gerar um formulário na página de login padrão.
      // Você pode especificar quais campos devem ser enviados.
      // ex. domain, username, password, 2FA token, etc.
      // Você pode passar qualquer atributo HTML adicional para a tag <input> através do objeto.
      credentials: {
        username: { label: "Usuário", type: "text", placeholder: "admin" },
        password: { label: "Senha", type: "password", placeholder: "admin" }
      },
      async authorize(credentials, req) {
        // Adicione aqui a lógica para buscar o usuário em seu banco de dados
        // e verificar a senha.

        // Este é um EXEMPLO MUITO SIMPLES e INSEGURO apenas para desenvolvimento.
        // NÃO USE ISSO EM PRODUÇÃO!
        // Em um cenário real, você compararia a senha com um hash armazenado.
        if (credentials?.username === "admin" && credentials?.password === "admin") {
          // Qualquer objeto retornado aqui será salvo na propriedade `user` do token JWT
          // e também na propriedade `user` do objeto `session` do lado do cliente.
          return { id: "1", name: "Admin User", email: "admin@example.com", role: "admin" }
        } else {
          // Se você retornar null, um erro será exibido para o usuário.
          console.log('Credenciais inválidas:', credentials)
          return null

          // Você também pode lançar um Erro ou um objeto com uma mensagem de erro
          // para ser exibida no formulário de login.
          // throw new Error("Credenciais inválidas")
        }
      }
    })
    // ...adicionar mais provedores aqui (Google, GitHub, etc.)
  ],
  secret: authSecret,
  session: {
    // Usar JWT para sessões, não sessões de banco de dados.
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Adicionar role ao token se o usuário tiver uma role
      if (user?.role) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      // Adicionar role à sessão
      if (token?.role && session.user) {
        (session.user as any).role = token.role;
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/signin', // Opcional: crie uma página de login customizada
    // signOut: '/auth/signout',
    // error: '/auth/error', // Página para exibir erros (por exemplo, falha no login)
    // verifyRequest: '/auth/verify-request', // (Novo usuário) Verificar e-mail
    // newUser: null // Deixe como null para desabilitar a criação de novos usuários por provedores OAuth por padrão
  }
})

export { handler as GET, handler as POST } 