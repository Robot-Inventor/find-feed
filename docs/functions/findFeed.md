[**find-feed v1.4.1**](../README.md)

***

[find-feed](../README.md) / findFeed

# Function: findFeed()

> **findFeed**(`pageUrl`, `options?`): `Promise`\<[`FeedItem`](../interfaces/FeedItem.md)[]\>

Defined in: [index.ts:151](https://github.com/Robot-Inventor/find-feed/blob/67b2b2268555945f81f32962c932b236376c58e6/src/index.ts#L151)

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
