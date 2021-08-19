<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div>{{text}}</div>
    

    <slot-demo>
      <template v-slot:header='scope' >asdfasdf  
        <span class="tag">
          {{scope.title}}
        </span>
        
      </template>
      <mode-test></mode-test>
      <template v-slot:footer >footer</template>
    </slot-demo>

     <slot-demo >
        <button @click="showFormDemo = !showFormDemo">显示 异步组件 form-demo</button>
        <form-demo v-if="showFormDemo"></form-demo>
     </slot-demo>



    
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import ModeTest from './components/modeTest/ModeTest.vue'
import SlotDemo from './components/SlotDemo.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    ModeTest,
    SlotDemo,
    FormDemo:()=>import('./components/FormDemo.vue')
  },
  data(){
    return {
      text:'asdfadf',
      showFormDemo:false,
    }
  }
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .tag{
    background:red;
    border-radius: 4px;
    padding:2px 4px;
    color: white;
  }
</style>
