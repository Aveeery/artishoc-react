import { Section } from "../../interfaces/Section";

export const isPublished = (section: Section): boolean => {
    return section.status === "published"
}

export const isUniqueContent = (section: Section): boolean => {
    return section.have_unique_content === true;
}

export const hasContents = (section: Section): boolean => {
    return section.contents.length > 0;
}

export const undisplayableSection = (section: Section): boolean => {
    return !isPublished(section) || isUniqueContent(section) && !hasContents(section);
}
