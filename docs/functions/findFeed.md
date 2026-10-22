[**find-feed v1.4.9**](../README.md)

***

[find-feed](../README.md) / findFeed

# Function: findFeed()

> **findFeed**(`pageUrl`, `options?`): `Promise`\<[`FeedItem`](../interfaces/FeedItem.md)[]\>

Defined in: [index.ts:150](https://github.com/Robot-Inventor/find-feed/blob/f64bd18988a03471d9ce67186914904383ff0958/src/index.ts#L150)

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
