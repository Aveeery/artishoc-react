import axios, {AxiosRequestConfig} from 'axios';
import {getAuthToken} from './auth';
import {Includes} from '../../enums/Includes'

import {IRequestFilters} from "../../interfaces/IRequestFilters"
import {Section} from "../../interfaces/Section"
import Jsona from 'jsona';

// data format from JSON-API format to simple objects
const dataFormatter = new Jsona();

export async function getSection(slug: string, includes?: Includes[], filters?: IRequestFilters[]): Promise<Section | null> {
    const authToken = await getAuthToken();

    // concatenate includes parameters url
    let includesParam = includes ? `&include=` + includes?.join(',') : "";

    let config: AxiosRequestConfig = {
        method: 'get',
        url: `https://api.preprod.artishoc.coop/${process.env.projectId}/v1/sections?filter[slug]=${slug}${includesParam}`,
        withCredentials: false,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken
        }
    };

    try {
        const safeJsonStringify = require('safe-json-stringify');
        let [currentSection] = dataFormatter.deserialize((await axios(config)).data) as Section[];
    
        return JSON.parse(safeJsonStringify(currentSection));
    } catch {
        return null;
    }
}

