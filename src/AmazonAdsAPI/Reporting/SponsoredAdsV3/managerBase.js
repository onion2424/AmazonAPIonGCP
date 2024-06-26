import { accessTokenFromRefreshToken } from "../../Auth/accessTokenFromRefreshToken.js";

export class managerBase
{
    constructor(create, status, download)
    {
        this.create = create;
        this.status = status;
        this.download = download;
        this.accessTokenFromRefreshToken = accessTokenFromRefreshToken;
    }
}