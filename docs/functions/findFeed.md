[**find-feed v1.4.3**](../README.md)

***

[find-feed](../README.md) / findFeed

# Function: findFeed()

> **findFeed**(`pageUrl`, `options?`): `Promise`\<[`FeedItem`](../interfaces/FeedItem.md)[]\>

Defined in: [index.ts:151](https://github.com/Robot-Inventor/find-feed/blob/424b4b19bb90a9d2acf1e35ef830eda5613d8a43/src/index.ts#L151)

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
