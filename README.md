- [Teleport To Live Site](https://nano-workers.web.app/)
- [Server](https://github.com/ThakurSaad/nano-workers-server)

### Credentials

Please use these accounts to easily enjoy all the functionalities as there are already enough data for these accounts. Otherwise, you can always create a new account.

- Worker | email: altair@elegant.com | password: aaaaaa
- Task Creator | email: rose@pose.com | password: aaaaaa
- Admin | email: akaza@uppermoon.com | password: aaaaaa

### Key Features

1. User Roles and Permissions

   - The platform supports three distinct roles: Worker, Task-Creator, and Admin, each with specific functionalities and permissions.

2. Secure User Authentication

   - Users can register and log in securely using email/password or Google Sign-In. Implemented JWT for secure session management.

3. Task Management

   - Task-Creators can create tasks, review submissions, approve/reject them, and pay workers using platform coins.

4. Worker Dashboard

   - Workers can view available tasks, submit completed tasks, track their earnings, and withdraw coins converted to dollars upon admin approval.

5. Admin Control

   - Admins can manage users, modify roles, oversee platform integrity, and manage tasks.

6. Notifications System

   - Real-time notifications keep users informed about task updates, earnings, and other important activities. Users can mark notifications as read.

7. Secure Payments

   - Integrated Stripe-based payment system allows Task-Creators to purchase coins and handle payments securely.

8. Data Security

   - Environment variables are used to securely manage and hide sensitive information such as Firebase config keys and MongoDB credentials.

9. Withdrawal System

   - Workers can convert their earned coins to dollars and withdraw using popular payment methods like Bkash, Rocket, and Nagad etc.

10. Role-Based Authorization

    - Implemented role-based authorization to ensure users access only their allowed functionalities. Unauthorized access is redirected to a forbidden page.

### Technologies

- react-router-dom
- tailwind
- daisyUi
- react-icons
- react-vertical-timeline-component
- swiper js
- react-hook-form
- firebase
- react-spinners
- @tanstack/react-query
- axios
- sweetalert2
- @stripe/react-stripe-js @stripe/stripe-js
- framer-motion
- rc-collapse

### TODO

1. react helmet
2. fix navbar design
3. pagination and advance filtering of tasks
4. countdown on deadline
5. github login
6. more section on home
