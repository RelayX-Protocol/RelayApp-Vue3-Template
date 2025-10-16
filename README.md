# relayapp-vue3-template

A RelayApp frontend template built with Vue 3 + TypeScript + Vite, using relayx-api for message communication.

## Features

- Complete relayx-api usage examples
- Dynamic forms and real-time result display
- Vue 3 + TypeScript + Ant Design Vue
- Component-based architecture, easy to extend

## Tech Stack

- Node.js: 20.0 or higher
- Vue 3 + TypeScript + Vite
- Ant Design Vue 4.x
- [relayx-api](https://www.npmjs.com/package/relayx-api)

## Quick Start

```bash
git clone https://github.com/RelayX-Protocol/RelayApp-Vue3-Template.git
cd RelayApp-Vue3-Template

# Install dependencies
npm install

# Start development
npm run dev
```

## Basic Usage

```javascript
import { RelayXClient } from 'relayx-api';

const relayx = new RelayXClient();

// API call example
const response = await relayx.getLanguage();
console.log('Current language:', response.result);
```

## Output Directory Configuration

In production builds, the project uses the environment variable VITE_RELAYAPP_ADDRESS to control the build output directory.

### Environment Configuration File

Configure the production RelayApp address in the .env.production file:

```bash
VITE_RELAYAPP_ADDRESS=your_relayapp_address
```

### Production Build Output

After running npm run build, files are output directly to the RelayApp address directory:

```
{VITE_RELAYAPP_ADDRESS}/
├── index.html
├── assets/
├── icon.png
└── ...
```

## Build

```bash
npm run build
```

## Documentation

For more details, please refer to the [RelayApp Development Documentation](https://relayx.gitbook.io/docs/).

## License

MIT
