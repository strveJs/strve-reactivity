import { registerComponent } from './lib/strve.js'
// import { MyComponent, MyChild } from './components/component3.js'
// import { MyComponent, MyChild } from './components/component1.js'
import { MyComponent, MyChild } from './components/component2.js'


// global registration
export default function register() {
    registerComponent(
        'my-child',
        MyChild
    );
    registerComponent(
        'my-component',
        MyComponent
    );

}