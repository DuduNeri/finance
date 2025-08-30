export const jwtsConfig = {
  secret: process.env.JWT_SECRET || "sua_chave_jwt",
  expiresIn: "1h",
}