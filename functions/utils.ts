import { truncateSync } from 'fs';
import {TJsonaModel} from 'jsona/lib/JsonaTypes';

//If the subsection is unique content, redirect to document page
//Otherwise deploy children section

export const generateNavbarHref = (section: TJsonaModel) => {

    //there should be no href if there is not a unique content (since it should just deploy the sublinks)
    if (!section.have_unique_content) {

        //if it's season section, link straight to the list, don't open subsections list
        if (section.identifier === process.env.seasonSectionIdentifier) {
            return {
                pathname: `/list/[list]`,
                query: {
                    list: section.slug
                },
            }
        }
        return {}
    }
        return {
            pathname: `/[document]`,
            query: {
                document: section.slug
            },
        }

    //unique content section here, redirect to document page   
}