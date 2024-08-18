# Angular Product Explorer

## Overview

The Angular Product Explorer is a frontend web application designed to help users explore various products efficiently. The application supports user authentication, product pagination, search, and filtering, as well as cart management. The tech stack used includes Angular 17, SCSS, and NgRx for state management.

## Features

- **User Authentication**: Users can authenticate via Login using the Authentication API.
- **Product Pagination**: Products are displayed in a paginated manner using the Products API.
- **Authentication Guard**: Ensures that only authenticated users can view products.
- **Search Functionality**: Users can search for products by keywords.
- **Product Filtering**: Users can filter products based on categories.
- **Cart Management**: Users can add products to the cart, with the cart showing the number of items.
- **Loading Spinner**: A spinner is displayed during data loading to enhance user experience.
- **Animated Directives**: Custom directives are used for animations to improve the UI experience.

## APIs

- **Authentication API**: [Login](https://dummyjson.com/docs/auth#login)
- **Products API**: [Product List](https://dummyjson.com/docs/products)

## Tech Stack

- **Angular**: Version 18.0.0
- **HTML/CSS**: For structuring and styling the application
- **SASS/SCSS**: For advanced styling and theming
- **NgRx**: For state management (Bonus)
- **GitHub**: Public repository for code hosting

## Installation

To set up and run the project locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/angular-product-explorer.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd angular-product-explorer
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Run the application:**

   ```bash
   ng serve
   ```

   The application will be available at [http://localhost:4200/](http://localhost:4200/).

## Usage

- **Authentication**: Users must log in to access the product pages. Authentication is managed via Angular guards.
- **Product Pagination**: Navigate through product pages using the pagination controls. Products are paginated based on pages.
- **Search**: Use the search bar to filter products by keywords.
- **Filtering**: Filter products by selecting categories.
- **Cart**: Add products to the cart and view the number of items in the cart.
