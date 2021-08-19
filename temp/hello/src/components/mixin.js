module.exports = {
    data(){
        return {
            age:123,
        };
    },
    created(){
        console.log('created in mixin');
    },
    methods:{
        showName(){
            console.log('name');
        },
        showAge(){
            console.log('age');
            
        }
    }
}