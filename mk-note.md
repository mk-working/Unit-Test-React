unit test
React Testing for Beginners

### Latest: 1:14:50

### Learning Note

> Do not skip: Learn Steps by steps so that we can learn the best practices and trick along the way

### Learning Style Enlightenment

> Watch the Video -> Take Note and Detail -> Write the code test and Experiment
> Do not Watch and then Write code at the same time -> lost focus and not understand the concept what the video explaining

### New Things I've learnt

1. auth0
2. json-server

### Unit Test Pattern

- AAA (Act, Arrange, Assert)

### Essential library

1. `vitest` : for
2. `testing-library/react` :
3. `jsdom` : for binding with `vitest environment`
4. `testing-library/jest-dom` : for _extend jest matcher_ customizability that work with the DOM.
5. `testing-library/user-event` : for simulate real user interactions

### JS knowledge

1. ES Module and Common JS Module can not be mixed to gether

- for example when using the
  `require()` must be using with the `module.exports` can not use with `export default`

### VS code - Shortcuts I learn

1. Markdown preview in vs code: `CTRL + SHIFT + V`
2. Typescript reload: `Command Palate (CTRL + SHIFT + P)` -> `Typescript: Reload`
3. Folding
   - Fold all : `CTRL + K + CTRL + 0`
   - Unfold all : `CTRL + K + CTRL + J`

### VS Code - Custom Shortcuts:

#### What I need to improve the working speed in the `vscode`

1. `Move` the `Current Tab` to `New Window`
   - custom shortcut: `CTRL + M + CTRL + W`
2. `Collapse` the `Folder` in the `Explorers`
   - current methods: `ctrl + shift + p` -> `collapse folders in explorer`
   - new methods: custom shortcut: `CTRL + C + CTRL + F`
     - replace with the `CTRL + K + CTRL + F` (problem conflict with the `CTRL + C` for copy )
3. `Transform` to `Uppercase`
   - custom shortcut: `CTRL + T + CTRL + U`

### VS Code Extension

1. vitest snippet ()
2. Testing library snippet()

### Comparison

1. why vitest not Jest?

- JEST: still having problem with ECMAscript and ES Module
- VITEST: support
  - ESM
  - Typescript
  - JSX

### Testing knowledge/concept

- jsdom - provides a set of custom `jest matchers` that you can use to extend jest.
  - what is `jest matcher`? - `test('two plus two is four', () => {
expect(2 + 2).toBe(4);
});` - `expect(2 + 2)` returns an "expectation" object. - `.toBe(4)` is the matcher
  - so the jsdom custom jest matchers is be able to test with the `DOM` not just the node js runtime environment

# I.SETTING UP THE PROJECT

## 0. clone the project

## 1. check package.json

1. mock back end

`script{
    "server": "json-server --watch src/data/db.json --delay 500"
}`

2. starting script (concurrently starting both front end and backend)

`script{
    "start": "concurrently \"npm run server"\ "\npm run dev\" "   
}`

## 2. set up auth0

- create an application

## 3. set up vitest

1. npm i -D vitest
2. add the command to the script in package.json
   `"script": {
    "test": "vitest",
    "test:ui": "vitest --ui" 
}`
3. create a folder in the root directory

   > tests/main.test.ts

4. install the extension `vitest snippet`

5. using `iv` to generate the
   > import { it, expect, describe } from 'vitest'

## 4. set up React Testing Library

purpose:

- allow to render component
- allow to interact with component like an end user

1. installation
   `npm i -D @testing-library/react@14.2.0`

## 5. set up jsdom

purpose:

- emulate the browser run time on node with the (because does not know about the browser event or document object)
  - JSDOM:
  - HappyDOM: faster but lack some api

1. installation `npm i -D jsdom@24.0.0`
2. configure the vitest to use the jsdom environment

- create `vitest.config.ts`
- add the code
  `import { defineConfig } from "vitest/config";
export default defineConfig({
test: {
environment: "jsdom",
},
});`

3. test by using the `npm run test:ui` to make sure no problem in the configuration

## 6. set up the jest-dom

purpose: give a bunch of matcher for writing assertion against the dom

example:

- check if an element is in the dom
- check if the element has the right content

# II.What to test

Questions to ask before testing

1. what to test
2. what to skip the testing

2 major concerns

1. how they render
2. how they respond to user action

> no test > bad test

> don't test style (CSS)

> testing the **`behavior`**, not the `implementation`, not the `style`

# III. TEST RENDERING

### Approach to the rendering test:

- all the test inside a test folder
- the test file is next to the component (mostly use by the community)

### Writing Test

- `render` by `RTL` function render the component in the `virtual DOM` provided by the `JSDOM`
- to see the state of the DOM use the `screen` object with `screen.debug()`

#### React Testing Library - Queries

purpose: find the element on the page

> REACT TESTING LIBRARY -> CORE API -> QUERIES

#### approach

- get
- find
- query

`getByRole` is the most common use and prevent the break when we change the ui, class selector, and focus on accessibility

> Testing the correct behavior, **to prevent false positive (test that is always pass)**. To do so go to the Main component and commented out somethings to see it break or not

- `toBeInTheDocument()` is a part of the `@testing-library/jest-dom/vitest` if not import this we can not use the `toBeInTheDocument()`

`Vitest UI` `Module Graph -> Module info` it show 3 sections type

1. Source
2. Transformed
3. Source Map (V3)

_[visual figma note](https://www.figma.com/design/r0ALSytysEyLKAZVE2sWKa/Testing?node-id=3-2&p=f&t=oFWdCZcrxcUb8oeR-0)_

> A `test suite` is a group of related test cases. It usually tests **one file**, **component**, or **feature**.

> A `test case` is a single test. It checks **one specific behavior** of your code.

# IV. SIMPLIFY TEST SETUP

### 1. Improvement: Eliminate the import `import { it, expect, describe } from "vitest"` on every test file

1. go to `vitest.config.ts`
   - configure: ` test :{ global: true }`
     - it will eliminate the
       `import { it, expect, describe } from "vitest"` on every test file
2. After change to global, the typescript will be screaming
   - to solve this problem we have to configure the `tsconfig.json` - `compilerOptions: {
"types": "[vitest/globals]"
   }`

### 2. Improvement: Eliminate the import `@testing-library/jest-dom/vitest` to get the `custom matcher` on every file

1. create the `setup.ts` file in the `root` test folder
2. move the
   `import "@testing-library/jest-dom/vitest"` to the `setup.ts`
3. configure the `vitest.config.ts`
   - Add reference to setup file: `test: {setupFiles: "tests/setup.ts"}`
     - the `setup.ts` is run before each test file

### 3. Improvement: Shortcut for `import { render, screen } from "@testing-library/react";` with **`itr`** by using `testing library snippets` extension

# Exercise: Test the `behavior` of the `UserAccount` Component

hint: there are 3 test cases for the component

1. test case 1: `user.name` should render in the `DOM`
   - can not use the `getByRole` because it render by the `div`
     - and the `div` does not have the role by default
       - unless we define it using the `role property` in the div
         - define the role property in the div is unnecessary
           - solution: `getByText`
2. test case 2 & 3: `user.isAdmin` if true should render the `Edit button` vice versa
   - can not use the `getByRole` because in the case of the user.isAdmin is false vitest will throw the error because the element does not exist in the DOM
     - solution: `queryByRole` and `expect().not.toBeInTheDocument()`

# V. TESTING LIST

#### jest-dom: matcher (I learn)

- `toHaveAttribute("href", "/url")`

#### RTL: Expectation (I learn)

- `screen.getByText(/regex/i)`

#### BEST PRACTICE

- For the **`getByText`** is to use the `keyword` + `regular expression` to prevent the problem that if the text is change

#### TESTING PRINCIPLE NOTE

- we **`should not run our test`** base on our `production code`
  - the production code might have a bug
    - if we write assertion based on our production code we will end up with `false positive` (the test will pass but the production code will have a bug)
      - **ideally: we `write our test` based on `requirement`**
        - in another word: we should treat our component as a `black box`, we should not care **what is inside**, **what the implementation**
          - we should test what is it supposed to do

# Exercise: test the `ProductImageGallery` component

#### test case #1: assert that the `DOM (screen: from RTL) is empty` when the `imageUrls` is empty

#### test case #2: assert that the `component` render a list of `url` with `image`, and the `source attribute` rendered in the DOM

#### jest-dom: matcher (I learn)

- `toBeEmptyDOMElement()`
- `toHaveLength(2)`

### RTL: Expectation (I learn)

- `screen.getAllByRole('img')`
- `screen.getByRole('img')`

# VI. TESTING USER INTERACTION

#### CSS: Custom Class

- btn:disabled

#### jest-dom: matcher (I learn)

- `toBeChecked()`
- `.not.toBeChecked()`
- `toBeDisabled()`
- `toBeEnabled()`

### RTL: Expectation (I learn)

- `screen.getByRole('button', {name: /submit/i} )`: get by roles with options

## Simulate the User Interaction

### Approach to simulate the user interaction:

1. **user-event**
   - `user-event` from `testing-library`
2. **fireEvent**
   - `fireEvent` from `dispatchEvent` (lightweight wrapper around browser's low level dispatchEvent API)
     - problem: it does not simulate the real worlds scenario

### `AAA (Arrange, Act, Assert)`: `Pattern` for writing good `unit test`

- unit test

### Javascript: I learnt

- when the `Return Type` of the fn is **`Promise`**
  - we need to handle it by using the
    - `async/await`
    - `.then()`

# Exercise: `ExpandableText` component

### Tip

- `lorem100`: will generate 100 words
- `qt`(shortcut from extension **_testing library snippet_**): will generate the `queryByText()`
- `tbind`: shortcut for `toBeInTheDocument()`
- `'a'.repeat(256)` : will generate a for 256 characters (string method)

### Realization: `MK's Unit Test Methodology`

1. `Define` the `Test Case Mentally`
   - `input`: by reviewing the component
   - `output`: how many test case in a test suite

### Realization: `MK's React Code Reading`

1. understand the `syntax` of `JS` and `TS`
2. understand the `state` and `props` of a component
3. understand the `logic` of the component
4. understand the `pure component`
5. understand the `effect` and `rendering`

#### Define `Test Case` for the `ExpandableText` component

1. **Test Case #1**: when text is short (under 255 characters) the full text is rendered
2. **Test Case #2**: when the text is above the limit the text is truncate and show the button

> single assertion in the test is impractical
> logically in a particular state of a component

# VII. SIMPLIFY TESTING

### Techniques #1: Duplication of the `Looking up the element` in the `DOM`

- **Example**: `screen.getByRole("button")`, `screen.getByRole("button")`, `screen.getByRole("button")`

- **Solution**:

1. define `helper function` for **rendering the component** and returning the common element that we want to `query`
   - code:
   
>     const renderComponent = () => {
>     render(<TermsAndConditions/>);
>
>     return {
>     heading: screen.getByRole("heading"),
>     checkbox: screen.getByRole("checkbox"),
>     button: screen.getByRole("button") }}
    
