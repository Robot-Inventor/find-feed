[**find-feed v1.1.1**](../README.md)

***

[find-feed](../README.md) / FindFeedOptions

# Interface: FindFeedOptions

Defined in: [index.ts:17](https://github.com/Robot-Inventor/find-feed/blob/e127bf360d24e8f251b186822042bfba62823e80/src/index.ts#L17)

## Properties

### aggressiveSearch?

> `optional` **aggressiveSearch**: `boolean`

Defined in: [index.ts:27](https://github.com/Robot-Inventor/find-feed/blob/e127bf360d24e8f251b186822042bfba62823e80/src/index.ts#L27)

Whether to perform an aggressive search for feeds, including uncertain ones.
When set to `true`, it will heuristically detect RSS feed URLs by exploring links such as `<a href="https://example.com/feed"></a>`.
Feeds found using this method will have the `isUncertain` property set to `true`.

***

### recursive?

> `optional` **recursive**: `boolean`

Defined in: [index.ts:19](https://github.com/Robot-Inventor/find-feed/blob/e127bf360d24e8f251b186822042bfba62823e80/src/index.ts#L19)

Whether to search for feeds in the parent page URL.

***

### requestOptions?

> `optional` **requestOptions**: `RequestInit`

Defined in: [index.ts:21](https://github.com/Robot-Inventor/find-feed/blob/e127bf360d24e8f251b186822042bfba62823e80/src/index.ts#L21)

Optional request options for the fetch call.
