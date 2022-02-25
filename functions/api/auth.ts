import axios, {AxiosRequestConfig} from 'axios';

export let authToken: string;

export async function getAuthToken(): Promise<any> {

    if (!authToken) {

        let tokenParam = JSON.stringify({
            "token": process.env.projectToken
        });

        let config: AxiosRequestConfig = {
            method: 'post',
            url: `https://api.preprod.artishoc.coop/${process.env.projectId}/v1/auth`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: tokenParam
        };

        try {
            return (await axios(config)).data.auth_token;
        } catch (err) {
            return null
        }
    }
}


