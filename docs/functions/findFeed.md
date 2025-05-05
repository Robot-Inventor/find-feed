[**find-feed v0.1.0**](../README.md)

***

[find-feed](../README.md) / findFeed

# Function: findFeed()

> **findFeed**(`pageUrl`, `recursive`, `requestOptions?`): `Promise`\<[`FeedItem`](../interfaces/FeedItem.md)[]\>

Defined in: [index.ts:46](https://github.com/Robot-Inventor/find-feed/blob/6c4461a1bc18e0b86c61512b2974b08825317f8a/src/index.ts#L46)

Find RSS or Atom feeds in the given page URL.

## Parameters

### pageUrl

`string`

The URL of the page to search for feeds.

### recursive

`boolean` = `false`

Whether to search for feeds in the parent page URL.

### requestOptions?

`RequestInit`

Optional request options for the fetch call.

## Returns

`Promise`\<[`FeedItem`](../interfaces/FeedItem.md)[]\>

An array of feed items found in the page.
