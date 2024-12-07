### Install Angular framework

```
npm i -g @angular/cli
```

### Create a project :

```
ng create <project_name>
```

### Run a project :

```
ng serve
```

### Create a component without tests file

```
ng g c components/[component_name] --skip-tests
```

### Create a service without tests file

```
ng g s services/[service_name] --skip-tests
```

### Create an interceptor without tests file

#### An interceptor is a middleware in Express but only for outcoming requests

```
ng generate interceptor interceptors/auth-token --skip-tests
```

### Create a guard without tests file

#### A guard is a middleware in Express but only for incoming requests

```
ng generate guard guards/is-logged-in --skip-tests
```

### Project structure :

/
- /src : contains all the code files of the project
- angular.json : contains the angular's project configuration (compilation options, source files path, and other configs)
- package.json : references all the project's dependencies of npm
- package-lock.json : references all the project's dependencies versions of npm in order to always have the same configuration when sharing the project
- README.md : more detailed informations on how to use the Angular framework
- tsconfig.json : contains the configuration of TypeScript which is used when compiling TypeScript code into JavaScript code
- tsconfig.app.json : inherits from the file tsconfig.json and adds specific configurations when compiling the Angular app
- tsconfig.spec.json : inherits from the file tsconfig.json and adds specific configurations to the tests of the Angular app