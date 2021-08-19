<template>
    <div>
        <template v-for="(item,index) in value"  >
            <input type="checkbox" :id='item.label' :key='item.label' :value="item.label" :checked="item.checked" :name='name' @change="changeHandle(index,$event)"  />
            <label :for='item.label' :key='item.label+`label`'>{{item.label}}</label>
        </template>
     </div>
</template>
<script>
export default {
    props:['value','name'],
    data(){
        return{

        }
    },
    created(){
        console.log(this.value);
        // console.log(this.checked);
    },
    methods:{
        changeHandle(index,e){
            this.value[index].checked = e.target.checked;
            this.$emit('input',this.value)
        }
    }
    
}
</script>