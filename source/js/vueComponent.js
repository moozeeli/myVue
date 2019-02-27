
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
						<button class="blueBtn" @click="goBack">返回</button> 
						<form>
							<label>输入姓名：<input v-model="name" id="name"/></label>		
							<button @click="submit" class="greenBtn">完成</button>					
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
			this.$router.push(`/infoShow/${encodeURIComponent(that.name)}`);
		}
	}
};

var infoShow = {
	template: `<div  class="container">
							<button class="blueBtn" @click="goBack" >返回</button> 
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
		goBack() {
			window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/');
		},
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
	template:'<li>{{todo}}  点击了{{mycount}}次<button class="greenBtn" @click="mycount+=1">按钮计数</button></li>',
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
};

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




let lt_modal = {
	props:{
		editdata:{
			default(){
				return {};
			},
			type:Object
		},	
		value:{
			default:false,
			type:Boolean
		},
		title:{
			default:"编辑",
			type:String
		}	
	},
	template:`<div class="modal" v-if="value"> 
					<div class="modalDialog">			
						<div class="modalHead">{{myTitle}}</div>
						<div class="modalContent">			
								<p class="row"><span class="left">name :</span> <input class="right" v-model.trim="newPerson.name" type="text"> </p>
								<p class="row"><span class="left">age :</span> <input class="right"  v-model.number ="newPerson.age" type="text"> </p>
								<p class="row"><span class="left">sex :</span> <input class="right"  v-model="newPerson.sex" type="text"> </p>
						</div>
						<div class="modalBottom">
							<div class="optionButton">
								<button id="add" class="btn blue" @click="submit" @keyup="submit">确定</button>
								<button class="btn blue" @click="hideModal">取消</button> 
							</div>
						</div>
					</div>
				</div>  
	`,
	data(){
		return{
			myTitle:this.title,
			newPerson: {
				name: this.editdata.name||'',
				age: this.editdata.age ||'',
				sex: this.editdata.sex ||'',
			},
		}
	},
	methods:{
		hideModal(){
			this.clear();
			this.$emit("on-hidemodal");
		},
		submit(){
			// 验证
			let a = { 
				name: this.newPerson.name,
				age: this.newPerson.age,
				sex: this.newPerson.sex,
			 }
			this.$emit("on-ok", a);
			this.clear();
		},
		clear(){
			this.newPerson = {
				name: '',
				age: '',
				sex: ''
			}
		}
	},
	watch:{
		title: function (newVal,oldVal) {
			this.myTitle = newVal;
		},
		editdata: function (newVal, oldVal)  {
			this.newPerson = {
				name: newVal.name,
				age: newVal.age,
				sex: newVal.sex
			}		
		}
	}
}

let lt_table = {
	template: `<div class="container">
					<transition name="fade"> 
					 <lt_modal :title="modelTitle" v-model="isModelShow" :editdata="editdata" @on-hidemodal="hideModal" @on-ok="addPerson"></lt_modal>						
					</transition>
					<div class="optionButton">
						<button class="btn" @click="showAddModal">新增</button>
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
								<td>
								    <button unselectable="on" class="editBtn" v-on:click="editThis(key)">edit</button>
									<button unselectable="on" class="delBtn" v-on:click="delThis(key)">del</button>
								</td>
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
			isModelShow: false,
			editdata:{},
			modelTitle:"--"
		}
	},
	components:{
		lt_modal: lt_modal
	},
	methods: {
		delThis: function (key) {
			if (typeof key == 'number') {
				this.tableData.splice(key, 1);
				this.$emit("on-deleterecord");
			} else {
				console.error('lost key');
			}
		},
		editThis(key){
			this.modelTitle = "编辑";
			console.log(key);
			if (typeof key == 'number') {
				this.editdata = {
					name: this.tableData[key].name,
					age: this.tableData[key].name,
					sex: this.tableData[key].name
				}
				this.isModelShow=true;				
			} else {
				alert('meiyou key')
			}			
		},
		hideModal:function () {
			this.isModelShow=false;
		},
		showAddModal() {
			this.modelTitle = "新增";
			this.isModelShow = true;
		},
		addPerson: function (newPerson) {
			if (newPerson.name == '' || newPerson.age == '' || newPerson.sex == '') {
				alert('没有输入正确')
			} else {
				this.tableData.push(newPerson);
				newPerson.name == '' ;
				newPerson.age == '' ;
				newPerson.sex == '';

				this.isModelShow = false;
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
		localStorage.setItem("tableData", JSON.stringify(this.tableData));
	}	
}

let simpleCrm = {
	template :`<div>
					<lt_table @on-deleterecord="deleteRecord"></lt_table>
					<button class="greenBtn" @click='showTips()'>显示tips</button>
					<button class="greenBtn" @click='toEdit()'>toEdit</button>
					<vue-props-tips v-model="tipsShow" :content="textContent" v-on:close="tipsShow=false"></vue-props-tips>	
				</div>`,
	components:{
		lt_table: lt_table
	},
	data(){
		return{
			textContent: '消息提示测试内容123',
			tipsShow: false,
		}
	},
	methods: {
		showTips: function () {
			this.tipsShow = true;
			this.textContent = "tips 显示测试"
		},
		deleteRecord(){
			this.tipsShow = true;
			this.textContent = "删除一条记录！"
		},
		toEdit(){
			this.$router.push("/infoEdit");
		}
	}	
}
