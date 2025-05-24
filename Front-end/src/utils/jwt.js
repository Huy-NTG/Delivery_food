export function parseJwt(token) {
    if (!token) return null;
    try {
      const base64Payload = token.split('.')[1];
      const payload = atob(base64Payload);
      return JSON.parse(payload);
    } catch (e) {
      return null;
    }
  }
  