import axios, {AxiosRequestConfig} from 'axios';
import {getAuthToken} from './auth';
import {Includes} from '../../enums/Includes'

import {IRequestFilters} from "../../interfaces/IRequestFilters"
import {Content} from "../../interfaces/Content"
import Jsona from 'jsona';

// data format from JSON-API format to simple objects
const dataFormatter = new Jsona();

export async function getContent(slug: string, includes?: Includes[], filters?: IRequestFilters[]): Promise<Content | null> {
    const authToken = await getAuthToken();

    // concatenate includes parameters url
    let includesParam = includes ? `&include=` + includes?.join(',') : "";
    
    let config: AxiosRequestConfig = {
        method: 'get',
        url: `https://api.preprod.artishoc.coop/${process.env.projectId}/v1/contents?filter[slug]=${slug}${includesParam}`,
        withCredentials: false,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken
        }
    };
    
    try {        
        const safeJsonStringify = require('safe-json-stringify');
        let [content] = dataFormatter.deserialize((await axios(config)).data) as Content[];
    
        return JSON.parse(safeJsonStringify(content));
    } catch  {
        return null;
    }
}

