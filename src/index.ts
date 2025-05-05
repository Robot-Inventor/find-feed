import { parseHTML } from "linkedom";

interface FeedItem {
    href: string | null;
    title: string | null;
    type: string | null;
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
 * @param feeds The array of feeds to remove duplicates from.
 * @returns An array of unique feeds.
 */
const removeDuplicateFeeds = (feeds: FeedItem[]): FeedItem[] =>
    Array.from(new Map(feeds.map((feed) => [feed.href, feed])).values());

/**
 * Find RSS or Atom feeds in the given page URL.
 * @param pageUrl The URL of the page to search for feeds.
 * @param recursive Whether to search for feeds in the parent page URL.
 * @param requestOptions Optional request options for the fetch call.
 * @returns An array of feed items found in the page.
 */
// eslint-disable-next-line max-statements
const findFeed = async (pageUrl: string, recursive = false, requestOptions?: RequestInit): Promise<FeedItem[]> => {
    const response = await fetch(pageUrl, requestOptions);
    const text = await response.text();
    const { document } = parseHTML(text);

    const links = document.querySelectorAll(
        "link[rel='alternate'][type='application/rss+xml'], link[rel='alternate'][type='application/atom+xml']"
    );
    const feeds = [...links].map((link) => ({
        href: link.getAttribute("href"),
        title: link.getAttribute("title"),
        type: link.getAttribute("type")
    }));

    const parentUrl = getParentUrl(pageUrl);
    if (!recursive || !parentUrl) {
        return feeds;
    }

    const parentFeeds = await findFeed(parentUrl, true, requestOptions);
    const uniqueFeeds = removeDuplicateFeeds(feeds.concat(parentFeeds));
    return uniqueFeeds;
};

export { findFeed };
