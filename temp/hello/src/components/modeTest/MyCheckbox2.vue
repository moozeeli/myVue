<template>
  <div>
    <template v-for="(item,index) in checkList">
      <input
        type="checkbox"
        :id="item.label"
        :key="item.label"
        :value="item.label"
        :checked="item.checked"
        :name="name"
        @change="changeHandle(index,$event)"
      />
      <label :for="item.label" :key="item.label+`label`">{{item.label}}</label>
    </template>
  </div>
</template>
<script>
export default {
  props: ["checkList", "name",'value'],
  model:{
      prop:'checkList',
      event:'myChange'
  },
  data() {
    return {};
  },
  created() {
    console.log(this.checkList);
    // console.log(this.checked);
  },
  methods: {
    changeHandle(index, e) {
      this.checkList[index].checked = e.target.checked;
      this.$emit("myChange", this.checkList);
    }
  }
};
</script>