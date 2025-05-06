[**find-feed v1.1.0**](../README.md)

***

[find-feed](../README.md) / findFeed

# Function: findFeed()

> **findFeed**(`pageUrl`, `options?`): `Promise`\<[`FeedItem`](../interfaces/FeedItem.md)[]\>

Defined in: [index.ts:132](https://github.com/Robot-Inventor/find-feed/blob/01bf482556ac00afd3236fd2570071a3253a8a66/src/index.ts#L132)

Find RSS or Atom feeds in the given page URL.

## Parameters

### pageUrl

`string`

The URL of the page to search for feeds.

### options?

[`FindFeedOptions`](../interfaces/FindFeedOptions.md)

Optional options for the search.

## Returns

`Promise`\<[`FeedItem`](../interfaces/FeedItem.md)[]\>

An array of feed items found in the page.
