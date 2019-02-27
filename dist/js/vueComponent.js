'use strict';

var listButton = {
	template: '<ul class="myul">\n\t\t\t\t<li v-for="(item,index) in list" @click="changeName(index)">{{item.name}}</li>\n\t\t\t</ul>',
	data: function data() {
		return {
			list: [{ name: '123', key: 0 }, { name: '123', key: 1 }, { name: '123', key: 2 }, { name: '123', key: 3 }]

		};
	},

	methods: {
		changeName: function changeName(index) {
			this.list[index].name = "您点击了";
		}
	}
};

var infoEdit = {
	template: '<div class="container">\n\t\t\t\t\t\t<button @click="goBack">\u8FD4\u56DE</button> \n\t\t\t\t\t\t<form>\n\t\t\t\t\t\t\t<label>\u8F93\u5165\u59D3\u540D\uFF1A<input v-model="name" id="name"/></label>\t\t\n\t\t\t\t\t\t\t<button @click="submit">\u5B8C\u6210</button>\t\t\t\t\t\n\t\t\t\t\t\t</form>\n\t\t\t\t</div>',
	created: function created() {},
	data: function data() {
		return {
			name: ""
		};
	},

	methods: {
		goBack: function goBack() {
			window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/');
		},
		submit: function submit() {
			var that = this;
			this.$router.push('/infoShow/' + that.name);
		}
	}
};

var infoShow = {
	template: '<div  class="container">\n\t\t\t\t\t\t\t<button >\u8FD4\u56DE</button> \n\t\t\t\t\t\t\t<p>\u663E\u793A\u59D3\u540D\uFF1A{{name}}</p>\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t</div>',
	created: function created() {},
	data: function data() {
		return {
			name: this.$route.params.name || "--"
		};
	},

	methods: {}
};

var tabBox = {
	template: '<div class="box">    \n\t\t\t\t<ul class=\'box-list\'>\n\t\t\t\t\t<li class="box-menuItem"\n\t\t\t\t\t\tv-for="(value,key) in list"\n\t\t\t\t\t\tv-bind:class="{active: activeIndex == key }"\n\t\t\t\t\t\tv-on:click=\'activeIndex = key\'\n\t\t\t\t\t>{{value.text}}</li>\n\t\t\t\t</ul>\n\t\t\t\t<p class=\'content\'> \u60A8\u70B9\u51FB\u4E86\uFF1A{{list[activeIndex].text}}</p>\n\t\t\t</div>',
	data: function data() {
		return {
			list: [{ text: 'item1', isActive: true }, { text: 'item2', isActive: false }, { text: 'item3', isActive: false }, { text: 'item4', isActive: false }],
			activeIndex: 0,
			text: "item1"
		};
	},

	methods: {
		factive: function factive(key) {
			// 使用循环有些浪费，不知道有没有更简便的方法。
			for (var i in this.list) {
				this.list[i].isActive = false;
			}
			this.list[key].isActive = true;
			this.text = this.list[key].text;
		}
	}
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
	template: '<li>{{todo}}  点击了{{mycount}}次<button class="greenBtn" @click="mycount+=1">按钮计数</button></li>',
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
	template: '<div id="app">\n\t\t\t\t\n\t\t\t\t<div class="container">\t \n\t\t\t\t\t<h4>vue-props-tips \u6848\u4F8B</h4>\n\t\t\t\t\t<button class="greenBtn" @click=\'showTips()\'>\u663E\u793Atips</button>\n\t\t\t\t\t<vue-props-tips v-model="tipsShow" :content="textContent" v-on:close="tipsShow=false"></vue-props-tips>\t\n\t\t\t\t</div>\n\t\t\t</div>',
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

var lt_modal = {
	props: {
		editdata: {
			default: function _default() {
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
	template: '<div class="modal" v-if="value"> \n\t\t\t\t\t<div class="modalDialog">\t\t\t\n\t\t\t\t\t\t<div class="modalHead">{{myTitle}}</div>\n\t\t\t\t\t\t<div class="modalContent">\t\t\t\n\t\t\t\t\t\t\t\t<p class="row"><span class="left">name :</span> <input class="right" v-model.trim="newPerson.name" type="text"> </p>\n\t\t\t\t\t\t\t\t<p class="row"><span class="left">age :</span> <input class="right"  v-model.number ="newPerson.age" type="text"> </p>\n\t\t\t\t\t\t\t\t<p class="row"><span class="left">sex :</span> <input class="right"  v-model="newPerson.sex" type="text"> </p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="modalBottom">\n\t\t\t\t\t\t\t<div class="optionButton">\n\t\t\t\t\t\t\t\t<button id="add" class="btn blue" @click="submit" @keyup="submit">\u786E\u5B9A</button>\n\t\t\t\t\t\t\t\t<button class="btn blue" @click="hideModal">\u53D6\u6D88</button> \n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>  \n\t',
	data: function data() {
		return {
			myTitle: this.title,
			newPerson: {
				name: this.editdata.name || '',
				age: this.editdata.age || '',
				sex: this.editdata.sex || ''
			}
		};
	},

	methods: {
		hideModal: function hideModal() {
			this.clear();
			this.$emit("on-hidemodal");
		},
		submit: function submit() {
			// 验证
			var a = {
				name: this.newPerson.name,
				age: this.newPerson.age,
				sex: this.newPerson.sex
			};
			this.$emit("on-ok", a);
			this.clear();
		},
		clear: function clear() {
			this.newPerson = {
				name: '',
				age: '',
				sex: ''
			};
		}
	},
	watch: {
		title: function title(newVal, oldVal) {
			this.myTitle = newVal;
		},
		editdata: function editdata(newVal, oldVal) {
			this.newPerson = {
				name: newVal.name,
				age: newVal.age,
				sex: newVal.sex
			};
		}
	}
};

var lt_table = {
	template: '<div class="container">\n\t\t\t\t\t<transition name="fade"> \n\t\t\t\t\t <lt_modal :title="modelTitle" v-model="isModelShow" :editdata="editdata" @on-hidemodal="hideModal" @on-ok="addPerson"></lt_modal>\t\t\t\t\t\t\n\t\t\t\t\t</transition>\n\t\t\t\t\t<div class="optionButton">\n\t\t\t\t\t\t<button class="btn" @click="showAddModal">\u65B0\u589E</button>\n\t\t\t\t\t\t<button class="btn blue" @click="save"> \u4FDD\u5B58</button> \n\t\t\t\t\t\t<button class="btn red" @click="delAll"> \u5220\u9664\u5168\u90E8</button> \n\t\t\t\t\t</div>\n\t\t\t\t\t<table class=\'table\'>\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<th >name</th>\n\t\t\t\t\t\t\t<th >age</th>\n\t\t\t\t\t\t\t<th >sex</th>\n\t\t\t\t\t\t\t<th >option</th>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t<template v-if="tableData.length>0">\n\t\t\t\t\t\t\t<tr v-for=\'(value, key) in tableData\'   >\n\t\t\t\t\t\t\t\t<td>{{ value.name }}</td>\n\t\t\t\t\t\t\t\t<td>{{ value.age }}</td>\n\t\t\t\t\t\t\t\t<td>{{ value.sex }}</td>\n\t\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t    <button unselectable="on" class="editBtn" v-on:click="editThis(key)">edit</button>\n\t\t\t\t\t\t\t\t\t<button unselectable="on" class="delBtn" v-on:click="delThis(key)">del</button>\n\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t</template>\n\t\t\t\t\t\t<template v-else>\n\t\t\t\t\t\t\t<tr height="300">\n\t\t\t\t\t\t\t\t<td colspan="4">\u6682\u65E0\u6570\u636E</td>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t</template>\n\t\t\t\t\t</table>\n\t\t\t\t</div>',
	data: function data() {
		return {
			tableData: [],
			isModelShow: false,
			editdata: {},
			modelTitle: "--"
		};
	},

	components: {
		lt_modal: lt_modal
	},
	methods: {
		delThis: function delThis(key) {
			if (typeof key == 'number') {
				this.tableData.splice(key, 1);
			} else {
				console.error('lost key');
			}
		},
		editThis: function editThis(key) {
			this.modelTitle = "编辑";
			console.log(key);
			if (typeof key == 'number') {
				this.editdata = {
					name: this.tableData[key].name,
					age: this.tableData[key].name,
					sex: this.tableData[key].name
				};
				this.isModelShow = true;
			} else {
				alert('meiyou key');
			}
		},

		hideModal: function hideModal() {
			this.isModelShow = false;
		},
		showAddModal: function showAddModal() {
			this.modelTitle = "新增";
			this.isModelShow = true;
		},

		addPerson: function addPerson(newPerson) {
			if (newPerson.name == '' || newPerson.age == '' || newPerson.sex == '') {
				alert('没有输入正确');
			} else {
				this.tableData.push(newPerson);
				newPerson.name == '';
				newPerson.age == '';
				newPerson.sex == '';

				this.isModelShow = false;
			}
		},
		save: function save() {
			console.count('保存');
			localStorage.setItem("tableData", JSON.stringify(this.tableData));
		},
		delAll: function delAll() {
			console.count('delAll');
			this.tableData = [];
		}
	},
	created: function created() {
		if (localStorage.tableData) {
			this.tableData = JSON.parse(localStorage.tableData);
		}
	},
	updated: function updated() {
		// 数据更新后保存到localStroage
		localStorage.setItem("tableData", JSON.stringify(this.tableData));
	}
};

var simpleCrm = {
	template: '<div>\n\t\t\t\t\t<lt_table></lt_table>\n\t\t\t\t</div>',
	components: {
		lt_table: lt_table
	},
	data: function data() {
		return {
			title: 'adfs'
		};
	}
};