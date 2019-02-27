
var  listButton = {
	template:`<ul class="myul">
				<li v-for="(item,index) in list" @click="changeName(index)">{{item.name}}</li>
			</ul>`,
	data(){
		return {
			list: [
				{ name: '123', key: 0 },
				{ name: '123', key: 1 },
				{ name: '123', key: 2 },
				{ name: '123', key: 3 },
			]

		}
	},
	methods: {
		changeName: function (index) {
			this.list[index].name = "您点击了";
		}
	}
}

var infoEdit = {
	template:`<div class="container">
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
	template: `<div  class="container">
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



var tabBox = {
	template:`<div class="box">    
				<ul class='box-list'>
					<li class="box-menuItem"
						v-for="(value,key) in list"
						v-bind:class="{active: activeIndex == key }"
						v-on:click='activeIndex = key'
					>{{value.text}}</li>
				</ul>
				<p class='content'> 您点击了：{{list[activeIndex].text}}</p>
			</div>`,
	data(){
		return {
			list: [
				{ text: 'item1', isActive: true },
				{ text: 'item2', isActive: false },
				{ text: 'item3', isActive: false },
				{ text: 'item4', isActive: false }
			],
			activeIndex:0,
			text: "item1"
		}
	},
	methods: {
		factive: function (key) {
			// 使用循环有些浪费，不知道有没有更简便的方法。
			for (var i in this.list) {
				this.list[i].isActive = false;
			}
			this.list[key].isActive = true;
			this.text = this.list[key].text;
		}
	}   
}


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


let lt_table = {
	template: `<div class="container">
					<transition name="fade">     
						<div class="modal" v-show="addShow"> <!-- add Modal -->
							<div class="modalDialog">			
								<div class="modalHead">新增</div>
								<div class="modalContent">			
										<p class="row"><span class="left">name :</span> <input class="right" v-model.trim="newPerson.name" type="text"> </p>
										<p class="row"><span class="left">age :</span> <input class="right"  v-model.number ="newPerson.age" type="text"> </p>
										<p class="row"><span class="left">sex :</span> <input class="right"  v-model="newPerson.sex" type="text"> </p>
								</div>
								<div class="modalBottom">
									<div class="optionButton">
										<button id="add" class="btn blue" @click="addPerson">确定</button>
										<button class="btn blue" @click="addShow=false">取消</button> 
									</div>
								</div>
							</div>
						</div>  <!-- add Modal--End -->
					</transition>
					<div class="optionButton">
						<button id="add" class="btn" @click="addShow=true">新增</button>
						<button class="btn blue" @click="save"> 保存</button> 
						<button class="btn red" @click="delAll"> 删除全部</button> 
					</div>
					<table class='table'>
						<tr>
							<th >name</th>
							<th >age</th>
							<th >sex</th>
							<th >option</th>
						</tr>
						<template v-if="tableData.length>0">
							<tr v-for='(value, key) in tableData'   >
								<td>{{ value.name }}</td>
								<td>{{ value.age }}</td>
								<td>{{ value.sex }}</td>
								<td><button unselectable="on" class="delBtn" v-on:click="delThis(key)">del</button></td>
							</tr>
						</template>
						<template v-else>
							<tr height="300">
								<td colspan="4">暂无数据</td>
							</tr>			
						</template>
					</table>
				</div>`,	
	data() {
		return {
			tableData: [],
			newPerson: {
				name: '',
				age: '',
				sex: '',
			},
			addShow: false,
		}
	},
	methods: {
		delThis: function (key) {
			if (typeof key == 'number') {
				this.tableData.splice(key, 1);
			} else {
				alert('meiyou key')
			}
		},
		addPerson: function () {
			if (this.newPerson.name == '' || this.newPerson.age == '' || this.newPerson.sex == '') {
				alert('没有输入正确')
			} else {

				this.tableData.push(this.newPerson);
				this.newPerson = { name: '', age: '', sex: '' };
				this.addShow = false;
			}
		},
		save: function () {
			console.count('保存');
			localStorage.setItem("tableData", JSON.stringify(this.tableData));
		},
		delAll: function () {
			console.count('delAll');
			this.tableData = [];
		}
	},
	created: function () {
		if (localStorage.tableData) {
			this.tableData = JSON.parse(localStorage.tableData);
		}
	},
	updated: function () { // 数据更新后保存到localStroage
		console.count('updated');
		localStorage.setItem("tableData", JSON.stringify(this.tableData));
	}
	
}


let simpleCrm = {
	template :`<div>
					<lt_table></lt_table>
				</div>`,
	components:{
		lt_table: lt_table
	},
	data(){
		return{
			title:'adfs'
		}
	}
}

