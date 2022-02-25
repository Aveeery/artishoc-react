import {TJsonaModel} from "jsona/lib/JsonaTypes";

export const isAgenda = (content: TJsonaModel): boolean => {
    return content.sti_type === "Agenda";
}

export const isDocument = (content: TJsonaModel): boolean => {
    return content.sti_type === "Document";
}
