
var infoEdit = {
	template:`<div>
						<button @click="goBack">返回</button> 
						<form>
							<label>输入姓名：<input v-model="name" id="name"/></label>		
							<button @click="submit">完成</button>					
						</form>
						</div>`,
	created:function(){

	},
	data(){
		return{
			name:""
		}
	},
	methods:{
		goBack () {
	      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/');
		},
		submit(){
			let that  = this;
			this.$router.push(`/infoShow/${that.name}`);
		}
	}
};

var infoShow = {
	template: `<div>
							<button >返回</button> 
							<p>显示姓名：{{name}}</p>												
						</div>`,
	created: function () {

	},
	data(){
		return{
			name: this.$route.params.name||"--"
		}
	},
	methods: {

	}
};




Vue.component('todo-item',{	
		props:{
			todo:{
				type:String,
				default:""
			},
			count:{
				type:Number,
				default:0
			}
		},
		template:'<li>{{todo}}  点击了{{mycount}}次<button class="buttonStyle" @click="mycount+=1">按钮计数</button></li>',
		data:function(){
			return {
				mycount:this.count,
			}
		}
		
	});

var  todolist = {
	template:`<div class="container">	
					<h4>{{message}}</h4>
					<p class='tips'>todo-item组件</p>
					<ul>
						<todo-item v-for="value in array" :key='value.text' :count="value.count" :todo="value.text" ></todo-item>
					</ul>
				</div>`,
	data:function(){
		return{
			message:'todo-item 小案例',
			array:[
				{text:'早起',count:12},
				{text:'早餐',count:13},
				{text:'运动',count:14},
				{text:'洒扫',count:15},
				{text:'养生',count:16}
			],
		}
	}
}

Vue.component('vue-props-tips',{	
		props:{
			content:{
				type:String,
				default:"信息提示"
			},
			tipsShow:{
				type:Boolean,
				default:false
			},
			value:{
				type:Boolean,
				default:false
			}
		},
		template:'<transition name="slide-fade"><div class="vuePropsTips" v-if="value">{{content}}\
					<span class="closeTipsIcon" @click="closeIips" >X</span>\
				</div></transition>',
		data:function(){
			return {}
		},
		methods:{
			closeIips:function(){
				this.$emit("close"); // 组件中注册close事件，修改data,关闭通知
				console.log(this.$route);
			}
		}
		
	});



// 依赖 props-tips.js 与 vue-todo-item.js
var componentTest = {
	template:`<div id="app">
				
				<div class="container">	 
					<h4>vue-props-tips 案例</h4>
					<button class="buttonStyle" @click='showTips()'>显示tips</button>
					<vue-props-tips v-model="tipsShow" :content="textContent" v-on:close="tipsShow=false"></vue-props-tips>	
				</div>
			</div>`,
	components: {
	},
	data:function(){
		return {
			textContent:'消息提示测试内容123',
			tipsShow:false,
			
			text:{test:'test'}
		}
	},
	methods:{
		showTips:function(){
			this.tipsShow=true;
			this.textContent="怎么回事？"
		}
	}
}





