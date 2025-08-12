[**find-feed v1.4.2**](../README.md)

***

[find-feed](../README.md) / findFeed

# Function: findFeed()

> **findFeed**(`pageUrl`, `options?`): `Promise`\<[`FeedItem`](../interfaces/FeedItem.md)[]\>

Defined in: [index.ts:151](https://github.com/Robot-Inventor/find-feed/blob/a39402f72b2254fe5bb485f97bb51800ec237ea5/src/index.ts#L151)

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
