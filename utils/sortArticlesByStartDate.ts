import { IArticle } from "../interfaces";
import { parseDateString } from "./parseDateString";

/**
 * Sorts an array of IArticle objects in descending order based on their start time.
 * 
 * @param {IArticle[]} articles - The array of articles to sort.
 * @returns {IArticle[]} The sorted array of articles.
 */
export function sortArticlesByStartDateDescending(articles: IArticle[]): IArticle[] {
    // Create a map for storing parsed dates to avoid reparsing
    const dateMap = new Map<IArticle, Date | null>();

    articles.forEach(article => {
        dateMap.set(article, parseDateString(article.time_start));
    });

    return articles.sort((a, b) => {
        const dateA = dateMap.get(a) || new Date(0); // Use Unix epoch as fallback for invalid dates
        const dateB = dateMap.get(b) || new Date(0);

        return dateB.getTime() - dateA.getTime();
    });
}
