[**find-feed v1.0.0**](../README.md)

***

[find-feed](../README.md) / findFeed

# Function: findFeed()

> **findFeed**(`pageUrl`, `options?`): `Promise`\<[`FeedItem`](../interfaces/FeedItem.md)[]\>

Defined in: [index.ts:132](https://github.com/Robot-Inventor/find-feed/blob/7c9c63fa67a3329a40222a3dface41ca4bd93223/src/index.ts#L132)

Find RSS or Atom feeds in the given page URL.

## Parameters

### pageUrl

`string`

The URL of the page to search for feeds.

### options?

`FindFeedOptions`

Optional options for the search.

## Returns

`Promise`\<[`FeedItem`](../interfaces/FeedItem.md)[]\>

An array of feed items found in the page.
