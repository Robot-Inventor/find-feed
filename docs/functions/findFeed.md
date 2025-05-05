[**find-feed v0.1.1**](../README.md)

***

[find-feed](../README.md) / findFeed

# Function: findFeed()

> **findFeed**(`pageUrl`, `recursive`, `requestOptions?`): `Promise`\<[`FeedItem`](../interfaces/FeedItem.md)[]\>

Defined in: [index.ts:46](https://github.com/Robot-Inventor/find-feed/blob/50bb94790f41d7d58a7b84b6dd766be1f13602e7/src/index.ts#L46)

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
