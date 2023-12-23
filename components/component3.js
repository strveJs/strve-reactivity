import { html } from 'https://cdn.jsdelivr.net/npm/strve-js@6.2.6/dist/strve.full-esm.js';
import {
    setData,
    ref,
    defineComponent,
    reactive,
    watchProps,
} from '../lib/strve.js';

export const MyComponent = defineComponent(() => {
    const state = reactive({
        text: 'Hello',
        arr: [1, 2]
    });
    const count = ref(4);
    const increase = () => {
        setData(() => {
            state.arr.unshift('1');
        })
    };

    return () => html`<fragment><button onClick=${increase}>add</button><p>${state.arr.toString()}</p><my-child msg=${state.arr.toString()}></my-child></fragment>`;
});

export const MyChild = defineComponent(
    {
        props: ['msg'],
    },
    ({ props }) => {
        const msg = ref('');
        watchProps(() => {
            setData(() => {
                msg.value = props.msg
            })
        })

        return () => html`<p>${msg.value}</p>
    `;
    }
);
