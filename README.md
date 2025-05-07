# find-feed

Find the URL of the RSS feed of the specified web page.

## Features

- Retrieve feeds from parent pages
- Obtain `<link rel="alternate>` tags
- Estimate feed URLs from `<a>` tags on the page even if they are not defined in `<link rel="alternate>` tags

## Installation

```bash
npm install find-feed
```

## Usage

```typescript
import { findFeed } from "find-feed";

const feeds = await findFeed("https://example.com/", {
    // Search for feeds in the parent page URL.
    recursive: true,
    // Perform an aggressive search for feeds, including uncertain ones.
    // It will heuristically detect RSS feed URLs by exploring links such as `<a href="https://example.com/feed"></a>`.
    aggressiveSearch: true
});
```

For more details, please refer to the [documentation](./docs/README.md).
