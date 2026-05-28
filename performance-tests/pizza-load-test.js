import http from 'k6/http';
import { check, sleep } from 'k6';

// 1. Configuração da simulação do K6
export const options = {
  stages: [
    { duration: '5s', target: 5 },  // Sobe para 5 usuários virtuais em 5 segundos
    { duration: '10s', target: 5 }, // Mantém 5 usuários por 10 segundos
    { duration: '5s', target: 0 },  // Desce para 0 usuários em 5 segundos
  ],
  thresholds: {
    // 95% das requisições devem ser menores que 1 segundo (1000ms)
    http_req_duration: ['p(95)<1000'],
    // Menos de 1% de taxa de erro nas chamadas de API
    http_req_failed: ['rate<0.01'],
  },
};

// 2. O teste que cada robô executará
export default function () {
  const url = 'http://localhost:3000/api/orders';
  
  // Envia uma requisição GET para listar os pedidos de pizza
  const res = http.get(url);
  
  // Validações
  check(res, {
    'GET status is 200': (r) => r.status === 200,
    'GET response time is under 1s': (r) => r.timings.duration < 1000,
  });
  
  sleep(1); // Pausa de 1 segundo entre as requisições de cada usuário
}
