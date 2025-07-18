export const parseAccessToken = (accessToken: string) => {
  return JSON.parse(Buffer.from(accessToken.split('.')[1], 'base64').toString())
}
