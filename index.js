const http = require('http');

// Usuários autorizados
const users = {
  'username': 'password',
  // Adicione mais usuários e senhas conforme necessário
};

// Função para verificar as credenciais
function checkCredentials(username, password) {
  return users[username] === password;
}

// Servidor HTTP
const server = http.createServer((req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const auth = authHeader.split(' ')[1]; // Obter a parte após 'Basic '
    const credentials = Buffer.from(auth, 'base64').toString().split(':');
    const username = credentials[0];
    const password = credentials[1];

    if (checkCredentials(username, password)) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Autenticação bem-sucedida! Você pode acessar esta rota.');
    } else {
      res.writeHead(401, { 'WWW-Authenticate': 'Basic realm="Autenticação necessária"' });
      res.end('Falha na autenticação');
    }
  } else {
    res.writeHead(401, { 'WWW-Authenticate': 'Basic realm="Autenticação necessária"' });
    res.end('É necessário fornecer credenciais');
  }
});

// Iniciar o servidor
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
