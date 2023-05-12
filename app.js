require('dotenv').config(); // Uso .env
const AWS = require('aws-sdk');
const redis = require('redis');

// Configurar credenciales
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-west-1' 
});

// Crear el cliente para la elastiCache
const elastiCache = new AWS.ElastiCache({ apiVersion: '2015-02-02' });

// Conectar al endpoint de la elastiCache
const client = redis.createClient({
  host: process.env.ELASTICACHE_ENDPOINT,
  port: process.env.ELASTICACHE_PORT
});

// Guarda los datos("Test", "This is a test")
client.set('Test', 'This is a test', redis.print);

// Busca la información alojada en "Test"
client.get('Test', (err, reply) => {
  console.log(reply);
});

// Desconectar
client.quit();