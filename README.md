# Virtual Menu manager

This app was being developed to serve as an administrators' panel to a virtual menu. It was built with the **React Native library**, making use of **React's Hooks API**, **Context API** and a combination of stack and tab navigators from **React Navigation**.

**React Native Paper** (a component implementation of Google's Material Design for React Native) was used alongside the **Styled Components** library to create and customize the UI.

The user would be able to create categories (making them a subcategory or not) and products for each shop or business through a REST API.

Categories and products would compose the menu's body, which would be modifiable by assigning a product or a category to a different parent category (or making a child category a new parent category) or by modifying data (name, description and price) and commiting these changes to the database through the API.

Requests would only be sent to the server if something had changed (e. g. if the user selected a different business or modified data related to any database-mapped entity such as a category, a product or the shop itself and commited these modifications through the REST API). The creation of the categories and products component tree occurs recursively, right after "awaiting" for the server's response containing JSON data describing the categories and products associated to the currently selected business.
