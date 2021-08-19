<template>
    <div class='card'>
        <header class="title">
            <slot name='header' v-bind:title="title">
                 this is sloatDemo
            </slot>
        </header>
        <p class="content">
            <slot></slot>
        </p>
        <footer class="footer">
            <slot name='footer'></slot>
        </footer>

    </div>
</template>
<script>
export default {
    data(){
        return{
            title:'inner title'
        }
    }
    
}
</script>

<style scoped >
.title{
    text-align: left;
    padding:10px;
    border-bottom:1px solid #ccc;
    
}
.card{
    border:1px solid #ccc;
    box-shadow: 2px 0px 12px -4px rgba(0, 0, 0, 0.452);
    margin:10px;
}
.content{
    padding:10px;
}
.footer{
    background-color: antiquewhite;
    padding: 0;
}
</style>