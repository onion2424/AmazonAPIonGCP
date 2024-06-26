import { accessTokenFromRefreshToken } from "../Auth/accessTokenFromRefreshToken.js";

export class managerBase
{
    constructor(create, status, get, download)
    {
        this.create = create;
        this.get = get;
        this.status = status;
        this.download = download;
        this.accessTokenFromRefreshToken = accessTokenFromRefreshToken;
    }
}