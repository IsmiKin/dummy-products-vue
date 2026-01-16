# Dummy Products

A modern Vue 3 application for managing and viewing products, built with Vite and TypeScript.

## 🚀 About

This project demonstrates a robust architecture using Vue 3 (Composition API). It fetches product data from [DummyJSON](https://dummyjson.com/) and provides a clean, responsive user interface.

**Key Features:**
- **State Management:** Powered by [Pinia](https://pinia.vuejs.org/).
- **Data Fetching:** Efficient server state management using [TanStack Query](https://tanstack.com/query/latest).
- **UI Components:** Built with [Shadcn Vue](https://www.shadcn-vue.com/) and styled with [Tailwind CSS](https://tailwindcss.com/).
- **Routing:** SPA navigation with [Vue Router](https://router.vuejs.org/).
- **Validation:** Form handling and validation using [VeeValidate](https://vee-validate.logaretm.com/) and [Zod](https://zod.dev/).

## 🛠️ Prerequisites

- **Node.js**: Version 20.19.0 or >=22.12.0.
- **Yarn**: Recommended package manager.

## 📦 Installation

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd dummy-products-vue
   ```

2. **Install dependencies:**
   ```sh
   yarn install
   ```

3. **Environment Setup:**
   The project requires environment variables to run. Copy the template file to create your local configuration:
   ```sh
   cp .env.template .env
   ```
   *Note: The default values in `.env.template` are sufficient for local development.*

## 📂 Project Structure

A brief overview of the `src` directory:

- **`api/`**: API integration and HTTP clients.
- **`components/`**: Reusable UI components (including Shadcn UI elements).
- **`layouts/`**: App layout wrappers (e.g., headers, sidebars).
- **`products/`**: Feature-specific module for product management (views, routes, logic).
- **`router/`**: Vue Router configuration and route definitions.
- **`shared/`**: Shared constants, types, and utilities.
- **`stores/`**: Global Pinia stores.
- **`views/`**: General page views (e.g., About, generic pages).

## 📜 Available Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| **Development** | `yarn dev` | Starts the development server with Hot Module Replacement (HMR). |
| **Production Preview** | `yarn start` | Previews the production build locally. |
| **Build** | `yarn build` | Runs type checks and builds the application for production. |
| **Test (Unit)** | `yarn test` | Runs unit tests using Vitest. |
| **Test (E2E)** | `yarn test:e2e` | Runs end-to-end tests using Playwright. |
| **Lint** | `yarn lint` | Lints and fixes code style issues with ESLint. |

## 🧪 Testing

### Unit Tests
Run unit tests to verify individual components and logic:
```sh
yarn test
```

### End-to-End Tests
Run e2e tests to simulate user interactions:
```sh
# Install browsers (first time only)
npx playwright install

# Run tests
yarn test:e2e
```

### Linting
Run linting to check for code style issues:
```sh
yarn lint
```

## 📚 Documentation
// TODO: Update links
- [About](https://dummy-products-vue.vercel.app/about)
- [Tech Stack](https://dummy-products-vue.vercel.app/tech-stack)

## :bulb: Key technical decisions and trade-offs.
* In order to prepare the data and have the more smooth UX experience, the composables includes some logic to prepare the following page or the possible visited product using the "prefetchQuery" from TanStack Query.
* Use of different components to don't over use modals and to have a better UX experience.
* Use properly the scopes of the components by domain
* Use of Zod and VeeValidate for proper validation in data fetching and form validation


## :construction: Limitations

* Dummy JSON doesn't allow to filter by category on the main endpoint and neither accepts more search params in the category one, what makes the code a bit more complex and not as clean as it could be. For the sake of the exercise, I had only allow to filter by category or by search separately.

## :book: Pending Improvements
* Use of IndexedDB to store the products and categories data in order to have some initial data when app is loaded.
* Use of the query params in order to save the "status" of the filters and the search and allow share links with other users.
* More tests specially on the E2E part, for the fails scenarios as lone as only the happy path had been covered.
* More features such as sorting
* Have more stores to separate the logic
* Split the composables in smaller ones in order to have a better code organization

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
