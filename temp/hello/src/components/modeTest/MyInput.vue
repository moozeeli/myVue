<template>
    <div>
        <p>this is my input</p>
        <input type="text" :value='text' @input="$emit('change',$event.target.value)" />
    </div>
</template>
<script>
export default {
    props:{
        text:String,
    },
    model:{
        prop:'text',
        event:"change"
    },
}
</script>

<style scoped>

</style>