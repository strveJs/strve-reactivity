import { html, setData, ref, defineComponent, reactive, onMounted, onUnmounted } from '../lib/strve.js';

export const MyComponent = defineComponent(() => {
  const items = reactive([{
    id: 1,
    tit: 'A'
  }, {
    id: 2,
    tit: 'B'
  }]);
  const count = ref(4);
  const increase = () => {
    setData(() => {
      items.unshift({
        id: count.value++,
        tit: 'C'
      });
    })
  };

  return () => html`
    <fragment>
        <button onclick=${increase}>increase</button>
        <ul>
          ${items.map((item) => html`<li key=${item.id}><span>${item.id}</span><span>-</span><span>${item.tit}</span></li>`)}
        </ul>
        <my-child></my-child>
    </fragment>
  `;
});

export const MyChild = defineComponent(
  () => {
    const state = reactive({ count: 0, msg: '' });
    const increase = () => {
      setData(() => {
        state.count++;
      })
    };

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