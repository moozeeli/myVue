<template>
    <div>
        <input @input="inputHandler" :value="value" />
    </div>
</template>
<script>
export default {
    props:{
        value:String,
    },
    methods:{
        inputHandler(e){
            this.$emit('input',e.target.value)
        }
    }
}
</script>

<style scoped>

</style>