# find-feed

Find the URL of the feed of the specified web page.

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

const feeds = await findFeed("https://example.com/");
```

For more details, please refer to the [documentation](./docs/README.md).
