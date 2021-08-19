<template>
  <div class="wrap">
    <h1>测试自定义 v-model</h1>

    <p>my-input: 使用model选项及自定义事件</p>
    <div>{{text}}</div>
    <my-input v-model="text"></my-input>
    <br>

    <p>my-input1: $emit 触发input </p>
    <div>{{text}}</div>
    <my-input1 v-model="text"></my-input1>
    <br>

    <p>checkbox test</p>
    <p>{{checked}}</p>
    <my-checkbox v-model="checkedList" name="test" ></my-checkbox>
    <br>


    <p>checkbox2 test</p>
    <p>{{checked}}</p>
    <my-checkbox2 v-model="checkedList" name="test2" ></my-checkbox2>
    asdf



  </div>
</template>

<script>

import MyInput from './MyInput.vue'
import MyInput1 from './MyInput1.vue'
import MyCheckbox from './MyCheckbox.vue';
import MyCheckbox2 from './MyCheckbox2.vue';

export default {
  name: 'App',
  components: {
    MyInput,
    MyInput1,
    MyCheckbox,
    MyCheckbox2,
  },
  data(){
    return {
      text:'asdfadf',
      checkedList:[
        {label:'aaa',checked:true},
        {label:'bbb',checked:false},
        {label:'ccc',checked:false}
      ]
    }
  },
  computed:{
    checked(){
      return this.checkedList.filter(item=>{
        return item.checked;
      })
    }
  }
}
</script>

<style>
h1{
  font-size: 20px;
}
.wrap{
    border:1px solid #ccc;
}
</style>
