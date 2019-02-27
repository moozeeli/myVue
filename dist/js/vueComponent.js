'use strict';

var infoEdit = {
	template: '<p>\n\t\t\t\t\t\t<button @click="goBack">\u8FD4\u56DE</button> \n\t\t\t\t\t\t<form>\n\t\t\t\t\t\t\t<label>\u8F93\u5165\u59D3\u540D\uFF1A<input value="" id="name"/></label>\t\t\t\t\t\t\t\n\t\t\t\t\t\t</form>\n\t\t\t\t\t\t</p>',
	created: function created() {
		console.log(this.$router);
	},
	methods: {
		goBack: function goBack() {
			window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/');
		}
	}
};

var infoShow = {
	template: '<p>\n\t\t\t\t\t\t<button @click="goBack">\u8FD4\u56DE</button> \n\t\t\t\t\t\t<p>\u8F93\u5165\u59D3\u540D\uFF1A{{name}}</p>\t\t\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\t\t</p>',
	created: function created() {
		console.log(this.$router);
	},
	data: function data() {
		return {
			name: this.$route.params.name || "--"
		};
	},

	methods: {}
};

Vue.component('todo-item', {
	props: {
		todo: {
			type: String,
			default: ""
		},
		count: {
			type: Number,
			default: 0
		}
	},
	template: '<li>{{todo}}  点击了{{mycount}}次<button class="buttonStyle" @click="mycount+=1">按钮计数</button></li>',
	data: function data() {
		return {
			mycount: this.count
		};
	}

});

var todolist = {
	template: '<div class="container">\t\n\t\t\t\t\t<h4>{{message}}</h4>\n\t\t\t\t\t<p class=\'tips\'>todo-item\u7EC4\u4EF6</p>\n\t\t\t\t\t<ul>\n\t\t\t\t\t\t<todo-item v-for="value in array" :key=\'value.text\' :count="value.count" :todo="value.text" ></todo-item>\n\t\t\t\t\t</ul>\n\t\t\t\t</div>',
	data: function data() {
		return {
			message: 'todo-item 小案例',
			array: [{ text: '早起', count: 12 }, { text: '早餐', count: 13 }, { text: '运动', count: 14 }, { text: '洒扫', count: 15 }, { text: '养生', count: 16 }]
		};
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
	data: function data() {
		return {};
	},
	methods: {
		closeIips: function closeIips() {
			this.$emit("close"); // 组件中注册close事件，修改data,关闭通知
			console.log(this.$route);
		}
	}

});

// 依赖 props-tips.js 与 vue-todo-item.js
var componentTest = {
	template: '<div id="app">\n\t\t\t\t\n\t\t\t\t<div class="container">\t \n\t\t\t\t\t<h4>vue-props-tips \u6848\u4F8B</h4>\n\t\t\t\t\t<button class="buttonStyle" @click=\'showTips()\'>\u663E\u793Atips</button>\n\t\t\t\t\t<vue-props-tips v-model="tipsShow" :content="textContent" v-on:close="tipsShow=false"></vue-props-tips>\t\n\t\t\t\t</div>\n\t\t\t</div>',
	components: {},
	data: function data() {
		return {
			textContent: '消息提示测试内容123',
			tipsShow: false,

			text: { test: 'test' }
		};
	},
	methods: {
		showTips: function showTips() {
			this.tipsShow = true;
			this.textContent = "怎么回事？";
		}
	}
};