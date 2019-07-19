const appConfig = {
  baseUrl:
    process.env.BASE_URL ||
    'http://localhost:3002' ||
    // 'https://5cdb7589069eb30014202135.mockapi.io/api/v1' ||
    'http://10.90.29.31:8092',
  daySessionExpiration: 1
}
export default appConfig
