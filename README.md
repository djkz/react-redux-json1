# react-redux-json1

This is a sample app using json v1 and redux to normalize data relationships so it can be used instead of graphQL and relay

## API Reducer

Takes data serialized by active-model-serializer and insert/replaces the data currently in the state.api for redux. Initial api structure initialized in the Root component and can be preloaded when the component is initialized.

## Form Reducer

Allows to use RESTful routes without adding extra code (currently only with create, new and show actions, but it should be easy to add edit, update and destroy using the appropriate api reducer actions.

## App Structure

Using above reducers you should be able to add any kind of structure on the backend side, without adding any complexity to the front end. I have used bare minimum when it comes to dependencies, but you should be able to easily add router and any other reducers to support your specific app.

## Installation

```
git clone https://github.com/djkz/react-redux-json1
cd react-redux-json1
bundle install
npm install
rake db:migrate
```

### original project is based on https://github.com/suzan2go/react-rails-redux-sample.git
