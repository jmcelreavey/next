import { Api } from "@gcdtech/acorn-react-core";

export class CognitoApiClient extends Api {
  public async login(pool: string, token: string) {
    return await this.post<{ token: string }, string>("/auth/cognito/" + pool + "/tokens", {
      token,
    });
  }
}
