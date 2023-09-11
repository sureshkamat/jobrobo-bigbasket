<h2>Table of Contents</h2>
    <ol>
        <li><a href="#dependencies">Dependencies</a></li>
        <li><a href="#component-structure">Component Structure</a></li>
        <li><a href="#state-variables">State Variables</a></li>
        <li><a href="#api-calls">API Calls</a></li>
        <li><a href="#user-authentication">User Authentication</a></li>
        <li><a href="#product-management">Product Management</a></li>
        <li><a href="#ui-components">UI Components</a></li>
    </ol>

    <h2>Dependencies <a name="dependencies"></a></h2>
    <ul>
        <li><code>@chakra-ui/react</code>: A popular UI library for styling React applications.</li>
        <li><code>axios</code>: A library for making HTTP requests.</li>
        <li><code>react</code> and <code>react-dom</code>: React library and DOM rendering.</li>
        <li><code>react-feather</code>: Icons for React applications.</li>
        <li><code>./App.css</code>: CSS styles for the application.</li>
    </ul>

    <h2>Component Structure <a name="component-structure"></a></h2>
    <p>The `App` component is the root component of the application. It consists of various UI elements and components for different functionalities.</p>

    <h2>State Variables <a name="state-variables"></a></h2>
    <ul>
        <li><code>data</code>: An array that stores product data fetched from an external API.</li>
        <li><code>cart</code>: A count of items added to the shopping cart.</li>
        <li><code>login</code>: A boolean that tracks whether a user is logged in or not.</li>
        <li><code>user</code>: Stores the username of the logged-in user.</li>
        <li><code>role</code>: Stores the role of the logged-in user (e.g., "admin").</li>
        <li><code>search</code>: Stores the search query entered by the user.</li>
        <li><code>signupdata</code>: An object storing user registration data (first name, last name, email, password).</li>
        <li><code>logindata</code>: An object storing user login data (email and password).</li>
        <li><code>addProduct</code>: An object storing data for adding a new product (name, price, quantity, category, etc.).</li>
        <li><code>isOpenModal2</code>: A boolean to control the visibility of the product addition modal.</li>
    </ul>

    <h2>API Calls <a name="api-calls"></a></h2>
    <ul>
        <li>The `getData` function makes an HTTP GET request to fetch product data from an external API and stores it in the `data` state variable.</li>
        <li>The `handleSignup` function makes an HTTP POST request to register a new user with the provided signup data.</li>
        <li>The `handleLogin` function makes an HTTP POST request to authenticate a user with the provided login data.</li>
        <li>The `handleAddProduct` function makes an HTTP POST request to add a new product with the provided data.</li>
    </ul>

    <h2>User Authentication <a name="user-authentication"></a></h2>
    <ul>
        <li>Users can log in or sign up through a modal dialog.</li>
        <li>If the user successfully logs in, their username and role are stored in the state.</li>
        <li>User authentication is handled using tokens (e.g., JWT) from the server.</li>
    </ul>

    <h2>Product Management <a name="product-management"></a></h2>
    <ul>
        <li>Users with the "admin" role can add new products through a modal dialog.</li>
        <li>Product data includes name, price, quantity, category, subcategory, description, and an image URL.</li>
    </ul>

    <h2>UI Components <a name="ui-components"></a></h2>
    <ul>
        <li>The UI consists of various elements, including buttons, input fields, and menus.</li>
        <li>Users can search for products using a search input field.</li>
        <li>Products are displayed by category, and unique categories are extracted from the data.</li>
        <li>Icons and buttons are used for actions like opening the login/signup modal and adding products.</li>
        <li>Chakra UI components are used for styling and UI elements.</li>
    </ul>
