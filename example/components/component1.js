import { html } from 'https://cdn.jsdelivr.net/npm/strve-js/dist/strve.full-esm.js';
import {
    setData,
    defineComponent,
    reactive,
    onMounted,
    onUnmounted,
    watchProps
} from '../../dist/strve-reactivity.esm.js';

export const MyComponent = defineComponent(() => {
    const state = reactive({
        text: 'hello',
        show: true,
    });
    const toggle = () => {
        setData(() => {
            state.show = !state.show;
        })
    };
    const onInput = (e) => {
        setData(() => {
            state.text = e.target.value;
        })
    };

    return () => html`
    <fragment>
      <button onClick=${toggle}>toggle child</button>
      <p><span>${state.text}</span><input value=${state.text} onInput=${onInput} /></p>
      <fragment
        >${state.show
            ? html`<my-child msg=${state.text}></my-child>`
            : html`<null></null>`}</fragment
      >
    </fragment>
  `;
});

export const MyChild = defineComponent(
    {
        props: ['msg'],
    },
    ({ props }) => {
        const state = reactive({ count: 0, msg: '' });
        const increase = () => {
            setData(() => {
                state.count++;
            })
        };

        watchProps(() => {
            setData(() => {
                state.msg = props.msg;
            })
        })

        onMounted(() => {
            console.log('child mounted');
        });

        onUnmounted(() => {
            console.log('child unmounted');
        });

        return () => html`
      <fragment>
        <p>${state.msg}</p>
        <p>${state.count}</p>
        <button onClick=${increase}>increase</button>
      </fragment>
    `;
    }
);


