# Gentify MERN E-commerce App ⭐️

Gentify is a comprehensive MERN (MongoDB, Express.js, React, Node.js) stack e-commerce application tailored for purchasing clothes. It offers a range of features aimed at enhancing the user experience and facilitating smooth transactions. This README provides an overview of the app's functionality, architecture, and usage instructions.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Folder Structure](#folder-structure)
6. [Technologies Used](#technologies-used)
7. [Contributing](#contributing)
8. [License](#license)

## Introduction

Gentify is a full-stack e-commerce application developed using the MERN stack. It enables users to browse, search, and purchase clothes with ease. The app incorporates various features to enhance user engagement, streamline the shopping process, and provide administrative capabilities for managing products, orders, and users.


![Screenshot 2024-04-30 100921](https://github.com/mohd-ashif/E-commerce/assets/134498212/86f39a0e-d2a5-4487-aac7-1f37e39b3b28)

![Screenshot 2024-04-30 100930](https://github.com/mohd-ashif/E-commerce/assets/134498212/3f07a65e-84c3-45ab-bb3b-1efcb22b84ed)

## Features

### User-Facing Features:

1. **Product Listing**: Users can browse through a wide range of clothing products categorized and displayed in an intuitive manner.

2. **Search and Filter**: Users can search for specific products using keywords and apply filters based on categories, sizes, colors, etc., to narrow down their search results.

3. **Shopping Cart Management**: Users can add items to their shopping cart, update quantities, remove items, and proceed to checkout seamlessly.

4. **Product Details**: Detailed product information including images, descriptions, prices, and availability status (in-stock or out-of-stock) are provided to users.

5. **Image Zoom and Magnifier**: Users can zoom in on product images to view details and use a magnifier to inspect specific areas for a closer look.

6. **Offer Prices**: Special offer prices are displayed for products on sale, providing users with discounts and incentives to make purchases.

7. **User Authentication**: Secure user authentication and authorization mechanisms are implemented, allowing users to sign in, sign up, and manage their profiles.

8. **Shipping Address Form**: During checkout, users can input their shipping address details to ensure accurate and timely delivery of their orders.

9. **Payment Integration with PayPal**: Seamless integration with PayPal enables users to make secure payments for their orders.

10. **User Profile Management**: Registered users can update their personal information, including passwords, usernames, and email addresses, through their profile settings.

11. **Order History**: Users can view their order history, including details such as order dates, items purchased, quantities, and total amounts.

12. **Product Comments and Ratings**: Users can leave comments and star ratings for products, providing valuable feedback for other users and the platform.

### Admin-Facing Features:

1. **Dashboard**: Administrators have access to a dashboard displaying key metrics and sales charts/graphs to monitor the performance of the e-commerce platform.

2. **Product Management**: Admins can add new products, update existing ones, manage inventory, and categorize products effectively.

3. **Order Management**: Admins can view and process orders, mark them as shipped, and manage order statuses to ensure timely fulfillment.

4. **User Management**: Administrators can view user accounts, manage permissions, and perform actions such as approving new user registrations.

## Installation

To install and run the Gentify MERN E-commerce app locally, follow these steps:

1. Clone the repository:

2.git clone <repository-url>

3.npm install 

4. Set up environment variables:

- Create a `.env` file in the `backend` directory and configure necessary environment variables such as database connection strings, API keys, etc.

5. Start the development servers:

- For the frontend:

  ```
  npm run dev
  ```

- For the backend:

  ```
  npm start
  ```

6. Access the application locally via your web browser.

## Usage

Once the application is running locally, users can navigate through the various features offered by Gentify, including browsing products, adding items to the cart, completing the checkout process, managing user profiles, leaving feedback, and more. Admins can access the admin dashboard to manage products, orders, users, and monitor sales performance.

## Folder Structure

The Gentify project follows a modular folder structure for both frontend and backend components. Here's a brief overview:

- **`front-end`**: Contains all frontend-related files and folders, including React components, stylesheets, and assets.
- **`backend`**: Houses all backend-related files and folders, including Express.js routes, controllers, models, middleware, and configuration files.

## Technologies Used

Gentify leverages a range of technologies and libraries to deliver its functionality, including:

- **Frontend**:
- React
- React Router
- Redux (for state management)
- Styled Components (for styling)
- Axios (for HTTP requests)
- Chart.js (for data visualization)

- **Backend**:
- Node.js
- Express.js
- MongoDB (with Mongoose ORM)
- JWT (for authentication)
- Nodemailer (for sending emails)
- PayPal SDK (for payment integration)

## Contributing

Contributions to the Gentify project are welcome! Feel free to submit bug reports, feature requests, or pull requests via GitHub.

## License

Gentify is licensed under the [MIT License](LICENSE).

---

This README provides an overview of the Gentify MERN E-commerce app, highlighting its key features, architecture, installation steps, and usage instructions. For detailed documentation and support, please refer to the project repository on GitHub. Thank you for choosing Gentify for your e-commerce needs! ⭐️
