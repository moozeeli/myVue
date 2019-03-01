
var listButton = {
	template: `<ul class="myul">
				<li v-for="(item,index) in list" @click="changeName(index)">{{item.name}}</li>
			</ul>`,
	data() {
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
	template: `<div class="container">
						<button class="blueBtn" @click="goBack">返回</button> 
						<form>
							<label>输入姓名：<input v-model="name" id="name"/></label>		
							<button @click="submit" class="greenBtn">完成</button>					
						</form>
				</div>`,
	created: function () {

	},
	data() {
		return {
			name: ""
		}
	},
	methods: {
		goBack() {
			window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/');
		},
		submit() {
			let that = this;
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
	data() {
		return {
			name: this.$route.params.name || "--"
		}
	},
	methods: {
		goBack() {
			window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/');
		},
	}
};



var tabBox = {
	template: `<div class="box">    
				<ul class='box-list'>
					<li class="box-menuItem"
						v-for="(value,key) in list"
						v-bind:class="{active: activeIndex == key }"
						v-on:click='activeIndex = key'
					>{{value.text}}</li>
				</ul>
				<p class='content'> 您点击了：{{list[activeIndex].text}}</p>
			</div>`,
	data() {
		return {
			list: [
				{ text: 'item1', isActive: true },
				{ text: 'item2', isActive: false },
				{ text: 'item3', isActive: false },
				{ text: 'item4', isActive: false }
			],
			activeIndex: 0,
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


Vue.component('todo-item', {
	props: {
		count: {
			type: Number,
			default: 0
		},
		index: {
			type: Number,
			required: true
		}
	},
	template:`<li>  				
				<slot name="info"></slot>
				<button class="greenBtn" @click="doClick">完成</button>
			</li>`,
	data: function () {return{}},
	methods: {
		doClick() {
			console.log("父组件标题（使用父链引用）："+this.$parent.message);
			this.$emit("update-data", { index: this.index, count: this.count + 1 });
		}
	}
});

var todolist = {
	//  因为是在字符串模版中引用了 <todo-item>组件，所以 其 props toDo 可以不用转换为小写
	template: `<div class="container">	
					<h4>{{message}}</h4>
					<p class='tips'>待办列表</p>					
					<ul>
						<todo-item
							style="margin-bottom:2px"
							v-for="(value,index) in array" 
							:index="index" 
							:key='value.text' 
							:count="value.doneCount" 		
							:score="value.score"
							@update-data = "updateCount"
						 >
						 <P slot="info" style="display:inline-block;width:200px">{{value.text}}  完成{{value.doneCount}}次，奖励{{value.score}}积分 </p>
						 </todo-item>
					</ul>
					<p>共计：{{sumCount}}积分</p>
				</div>`,
	data: function () {
		return {
			message: 'todo-item 小案例',
			array: [
				{ text: '早起', doneCount: 0, accumulator: 5, score: 0 },
				{ text: '早餐', doneCount: 0, accumulator: 2, score: 0},
				{ text: '运动', doneCount: 0, accumulator: 1, score: 0},
				{ text: '洒扫', doneCount: 0, accumulator: 3, score: 0},
				{ text: '养生', doneCount: 0, accumulator: 1, score: 0}
				// 描述，完成次数, 累加，分数
			],
		}
	},
	methods:{
		updateCount(payload){
			let item = this.array[payload.index];
			item.doneCount = payload.count;
			item.score = payload.count * item.accumulator;
		}
	},
	computed: {
		sumCount: function () {
			let result = 0;
			this.array.map(function (value, index, arr) {
				result += value.score;
			})
			return result;
		}
	}
};

Vue.component('vue-props-tips', {
	props: {
		content: {
			type: String,
			default: "信息提示"
		},
		tipsShow: {
			type: Boolean,
			default: false
		},
		value: {
			type: Boolean,
			default: false
		}
	},
	template: '<transition name="slide-fade"><div class="vuePropsTips" v-if="value">{{content}}\
					<span class="closeTipsIcon" @click="closeIips" >X</span>\
				</div></transition>',
	data: function () {
		return {}
	},
	methods: {
		closeIips: function () {
			this.$emit("close"); // 组件中注册close事件，修改data,关闭通知
			console.log(this.$route);
		}
	}
});




let lt_modal = {
	props: {
		editdata: {
			default() {
				return {};
			},
			type: Object
		},
		value: {
			default: false,
			type: Boolean
		},
		title: {
			default: "编辑",
			type: String
		}
	},
	template: `<div class="modal" v-if="value"> 
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
	data() {
		return {
			myTitle: this.title,
			newPerson: {
				name: this.editdata.name || '',
				age: this.editdata.age || '',
				sex: this.editdata.sex || '',
			},
		}
	},
	methods: {
		hideModal() {
			this.clear();
			this.$emit("on-hidemodal");
		},
		submit() {
			// 验证
			let a = {
				name: this.newPerson.name,
				age: this.newPerson.age,
				sex: this.newPerson.sex,
			}
			this.$emit("on-ok", a);
			this.clear();
		},
		clear() {
			this.newPerson = {
				name: '',
				age: '',
				sex: ''
			}
		}
	},
	watch: {
		title: function (newVal, oldVal) {
			this.myTitle = newVal;
		},
		editdata: function (newVal, oldVal) {
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
			editdata: {},
			modelTitle: "--"
		}
	},
	components: {
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
		editThis(key) {
			this.modelTitle = "编辑";
			console.log(key);
			if (typeof key == 'number') {
				this.editdata = {
					name: this.tableData[key].name,
					age: this.tableData[key].name,
					sex: this.tableData[key].name
				}
				this.isModelShow = true;
			} else {
				alert('meiyou key')
			}
		},
		hideModal: function () {
			this.isModelShow = false;
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
				newPerson.name == '';
				newPerson.age == '';
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



function isNumber(value) {
	var patrn = /^(-)?\d+(\.\d+)?$/;
	if (patrn.exec(value) == null || value == "") {
		return false
	} else {
		return true
	}
}

let inputNumber = {
	props: {
		value: {
			type: Number,
			required: true
		},
		maxVal:{
			type:Number,
			default:Infinity			
		},
		minVal:{
			type:Number,
			default:-Infinity
		},
		step:{ // 累加值
			type:Number,
			default:1
		}
	},
	template: `<div>
				<input :value="myVal"  @change="handleChange" @keyup.up="increase" @keyup.down="decrease"  />
				<button @click="decrease" :disabled="myVal<=minVal" >-</button>
				<button @click="increase" :disabled="myVal>=maxVal">+</button>
			</div>`,
	data(){
		return {
			myVal: -1
		}
	},
	mounted(){ 
		// 为防止 vlue值不在限定范围内，需要进行过滤
		this.updateNum(this.value);
	},
	methods: {
		increase() {			
			this.updateNum(this.myVal + this.step);
		},
		decrease() {
			this.updateNum(this.myVal - this.step);
		},
		decreaseTest(){
			alert("asdf");
		},
		updateNum(val) { // 更新数值,对[minVal,maxVal]区间外值进行过滤；
			if (typeof val==="undefined") { return; }
			if (val < this.minVal) { val = this.minVal;} // 重置 val
			if (val > this.maxVal) { val = this.maxVal; } // 重置 val
			this.myVal = val;
		},
		handleChange(event){ // 处理 onchange事件,要 myVal直接赋值。如果交给updateNum,有可能会导致myVal不变，导致输入与data不一致问题。
			let val = event.target.value.trim();						
			if (isNumber(val)){
				val = Number(val);
				this.myVal = val;
				this.updateNum(val); // 更新data中的 myVal
			}else{ // 重置输入的value
				event.target.value = this.myVal;
			}
		}
	},
	watch:{
		value(newVal){
			this.updateNum(newVal);
		},
		myVal(newVal){ // 监听myVal修改，触发props更新,(关联父子组件数据)
			this.$emit("input",newVal)
		}

	}
}

let simpleCrm = {
	template: `<div>
					<lt_table @on-deleterecord="deleteRecord"></lt_table>
					<button class="greenBtn" @click='showTips()'>显示tips</button>
					<button class="greenBtn" @click='toEdit()'>toEdit</button>
					<vue-props-tips v-model="tipsShow" :content="textContent" v-on:close="tipsShow=false"></vue-props-tips>	
					<input_number v-model="inputNumber" :max-val="60" :min-val="2" :step="1" />
				</div>`,
	components: {
		lt_table: lt_table,
		input_number: inputNumber
	},
	data() {
		return {
			inputNumber:1, // 数字输入框
			textContent: '消息提示测试内容123',
			tipsShow: false,
		}
	},
	methods: {
		showTips: function () {
			this.tipsShow = true;
			this.textContent = "tips 显示测试"
		},
		deleteRecord() {
			this.tipsShow = true;
			this.textContent = "删除一条记录！"
		},
		toEdit() {
			this.$router.push("/infoEdit");
		}
	}
}



// 标签页组件
let tabs = {
	template:`
		<div class="tabs">			
			<div class="tabs-bar></div> <!--这里是标签-->
			<div class="tabs-content"> <!--这里是标签-内容 -->
				<slot></slot>
			</div
		</div>
	`,
}

//  标签页内容面板组件,面板的显示隐藏通过props控制
let pane = {
	props:{
		show:{
			type:Boolean,
			default:false
		},
		name:{// 标签标识符，
			type: [String,Number],
			required: true,
		},
		label:{ // 标签上显示的名称,类似于浏览器页面的title,是可以动态修改的。【
			type:String,
			default:"标签名",
			required:true,			
		}
	},	
	template:`
		<div class="pane" v-show="show">
			<slot></slot>
		</div>
	`,
	data(){
		return{
			mylabel:this.label
		}
	},
	methods:{
		updateNav(){
			this.$parent.updateNav(); // 调用父组件方法
		}
	},
	watch:{
		label(){
			this.updateNav();			
		}
	},
	mounted(){
		this.updateNav();		
	}

}

