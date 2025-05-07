import { parseHTML } from "linkedom";

/**
 * Interface representing a feed item.
 */
interface FeedItem {
    /** The URL of the feed. */
    href: string | null;
    /** The title of the feed. */
    title: string | null;
    /** The type of the feed (e.g., application/rss+xml, application/atom+xml). */
    type: string | null;
    /** Whether the feed is uncertain (e.g., from aggressiveSearch). */
    isUncertain: boolean;
}

interface FindFeedOptions {
    /** Whether to search for feeds in the parent page URL. */
    recursive?: boolean;
    /** Optional request options for the fetch call. */
    requestOptions?: RequestInit;
    /**
     * Whether to perform an aggressive search for feeds, including uncertain ones.
     * When set to `true`, it will heuristically detect RSS feed URLs by exploring links such as `<a href="https://example.com/feed"></a>`.
     * Feeds found using this method will have the `isUncertain` property set to `true`.
     */
    aggressiveSearch?: boolean;
}

/**
 * Get the parent page URL from the given URL.
 * @param url The URL to get the parent page URL from.
 * @returns The parent page URL or null if the URL is the root.
 */
const getParentUrl = (url: string): string | null => {
    const parsedUrl = URL.parse(url);
    if (!parsedUrl?.pathname || parsedUrl.pathname === "/") return null;

    parsedUrl.pathname =
        // eslint-disable-next-line no-magic-numbers
        parsedUrl.pathname.split("/").slice(0, -1).join("/") || "/";
    return parsedUrl.toString();
};

/**
 * Remove duplicate feeds from the given array of feeds.
 * This function considers URLs with or without a trailing slash as identical.
 * @param feeds The array of feeds to remove duplicates from.
 * @returns An array of unique feeds.
 */
const removeDuplicateFeeds = (feeds: FeedItem[]): FeedItem[] => {
    const feedMap = new Map<string, FeedItem>();

    feeds.forEach((feed) => {
        if (!feed.href) return;

        // Normalize the URL by checking both with and without a trailing slash
        const normalizedHref = feed.href.replace(/\/$/u, "");
        const alternateHref = feed.href.endsWith("/") ? feed.href : `${feed.href}/`;

        // If the feed is already in the map, prioritize the one with `isUncertain: false`
        const existingFeed = feedMap.get(normalizedHref) ?? feedMap.get(alternateHref);
        if (existingFeed && !existingFeed.isUncertain) return;

        feedMap.set(normalizedHref, feed);
    });

    return Array.from(feedMap.values());
};

/**
 * Find feeds from <link> elements in the document.
 * @param pageUrl The URL of the page.
 * @param document The parsed HTML document.
 * @returns An array of FeedItem objects.
 */
const findFeedsFromLinks = (pageUrl: string, document: Document): FeedItem[] => {
    const links = document.querySelectorAll<HTMLLinkElement>(
        "link[rel='alternate'][type='application/rss+xml'], link[rel='alternate'][type='application/atom+xml']"
    );

    return [...links].map((link) => {
        const hrefAttribute = link.href;
        const href = hrefAttribute ? new URL(hrefAttribute, pageUrl).toString() : hrefAttribute;

        return {
            href,
            isUncertain: false,
            title: link.title ? link.title.trim() : null,
            type: link.type
        } as const satisfies FeedItem;
    });
};

/**
 * Find feeds from <a> elements in the document.
 * @param pageUrl The URL of the page.
 * @param document The parsed HTML document.
 * @returns An array of FeedItem objects.
 */
const findFeedsFromAnchors = (pageUrl: string, document: Document): FeedItem[] => {
    const possibleFeeds = [...document.querySelectorAll("a")].filter((link) => {
        const { href } = link;
        const parsedHref = URL.parse(href, pageUrl);
        if (!parsedHref) return false;

        const { pathname } = parsedHref;

        // Example: https://example.com/news/rss.xml
        if (/\/(?:feed|feeds|rss|atom|index)\.(?:xml|rss|rdf|atom)$/u.exec(pathname)) return true;

        // Example: https://example.com/news/rss
        if (/\/(?:feed|feeds|rss|atom)$/u.exec(pathname)) return true;

        // Example: https://example.com/rss/news
        if (/\/(?:feed|feeds|rss|atom)\//u.exec(pathname)) return true;

        return false;
    });

    return possibleFeeds.map((link) => {
        const hrefAttribute = link.href;
        const href = hrefAttribute ? new URL(hrefAttribute, pageUrl).toString() : hrefAttribute;

        return {
            href,
            isUncertain: true,
            title: link.textContent ? link.textContent.trim() : null,
            type: null
        } as const satisfies FeedItem;
    });
};

/**
 * Find RSS or Atom feeds in the given page URL.
 * @param pageUrl The URL of the page to search for feeds.
 * @param options Optional options for the search.
 * @returns An array of feed items found in the page.
 */
// eslint-disable-next-line max-statements
const findFeed = async (pageUrl: string, options?: FindFeedOptions): Promise<FeedItem[]> => {
    const { recursive = false, requestOptions = {}, aggressiveSearch = false } = options ?? {};

    const response = await fetch(pageUrl, requestOptions);

    if (!response.ok) return [];

    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/rss+xml")) {
        return [
            {
                href: pageUrl,
                isUncertain: false,
                title: null,
                type: "application/rss+xml"
            }
        ] as const satisfies FeedItem[];
    }

    if (!contentType?.includes("text/html")) return [];

    const text = await response.text();
    const { document } = parseHTML(text);

    const feeds = findFeedsFromLinks(pageUrl, document);
    const possibleFeeds = aggressiveSearch ? findFeedsFromAnchors(pageUrl, document) : [];

    const result = feeds.concat(possibleFeeds);

    if (!recursive) return removeDuplicateFeeds(result);

    const parentUrl = getParentUrl(pageUrl);
    if (!parentUrl) return result;

    const parentFeeds = await findFeed(parentUrl, options);
    const uniqueFeeds = removeDuplicateFeeds(result.concat(parentFeeds));
    return uniqueFeeds;
};

export { type FeedItem, type FindFeedOptions, findFeed };
