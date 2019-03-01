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
	template: '<div class="container">\n\t\t\t\t\t\t<button class="blueBtn" @click="goBack">\u8FD4\u56DE</button> \n\t\t\t\t\t\t<form>\n\t\t\t\t\t\t\t<label>\u8F93\u5165\u59D3\u540D\uFF1A<input v-model="name" id="name"/></label>\t\t\n\t\t\t\t\t\t\t<button @click="submit" class="greenBtn">\u5B8C\u6210</button>\t\t\t\t\t\n\t\t\t\t\t\t</form>\n\t\t\t\t</div>',
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
			this.$router.push('/infoShow/' + encodeURIComponent(that.name));
		}
	}
};

var infoShow = {
	template: '<div  class="container">\n\t\t\t\t\t\t\t<button class="blueBtn" @click="goBack" >\u8FD4\u56DE</button> \n\t\t\t\t\t\t\t<p>\u663E\u793A\u59D3\u540D\uFF1A{{name}}</p>\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t</div>',
	created: function created() {},
	data: function data() {
		return {
			name: this.$route.params.name || "--"
		};
	},

	methods: {
		goBack: function goBack() {
			window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/');
		}
	}
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
		count: {
			type: Number,
			default: 0
		},
		index: {
			type: Number,
			required: true
		}
	},
	template: '<li>  \t\t\t\t\n\t\t\t\t<slot name="info"></slot>\n\t\t\t\t<button class="greenBtn" @click="doClick">\u5B8C\u6210</button>\n\t\t\t</li>',
	data: function data() {
		return {};
	},
	methods: {
		doClick: function doClick() {
			console.log("父组件标题（使用父链引用）：" + this.$parent.message);
			this.$emit("update-data", { index: this.index, count: this.count + 1 });
		}
	}
});

var todolist = {
	//  因为是在字符串模版中引用了 <todo-item>组件，所以 其 props toDo 可以不用转换为小写
	template: '<div class="container">\t\n\t\t\t\t\t<h4>{{message}}</h4>\n\t\t\t\t\t<p class=\'tips\'>\u5F85\u529E\u5217\u8868</p>\t\t\t\t\t\n\t\t\t\t\t<ul>\n\t\t\t\t\t\t<todo-item\n\t\t\t\t\t\t\tstyle="margin-bottom:2px"\n\t\t\t\t\t\t\tv-for="(value,index) in array" \n\t\t\t\t\t\t\t:index="index" \n\t\t\t\t\t\t\t:key=\'value.text\' \n\t\t\t\t\t\t\t:count="value.doneCount" \t\t\n\t\t\t\t\t\t\t:score="value.score"\n\t\t\t\t\t\t\t@update-data = "updateCount"\n\t\t\t\t\t\t >\n\t\t\t\t\t\t <P slot="info" style="display:inline-block;width:200px">{{value.text}}  \u5B8C\u6210{{value.doneCount}}\u6B21\uFF0C\u5956\u52B1{{value.score}}\u79EF\u5206 </p>\n\t\t\t\t\t\t </todo-item>\n\t\t\t\t\t</ul>\n\t\t\t\t\t<p>\u5171\u8BA1\uFF1A{{sumCount}}\u79EF\u5206</p>\n\t\t\t\t</div>',
	data: function data() {
		return {
			message: 'todo-item 小案例',
			array: [{ text: '早起', doneCount: 0, accumulator: 5, score: 0 }, { text: '早餐', doneCount: 0, accumulator: 2, score: 0 }, { text: '运动', doneCount: 0, accumulator: 1, score: 0 }, { text: '洒扫', doneCount: 0, accumulator: 3, score: 0 }, { text: '养生', doneCount: 0, accumulator: 1, score: 0
				// 描述，完成次数, 累加，分数
			}]
		};
	},
	methods: {
		updateCount: function updateCount(payload) {
			var item = this.array[payload.index];
			item.doneCount = payload.count;
			item.score = payload.count * item.accumulator;
		}
	},
	computed: {
		sumCount: function sumCount() {
			var result = 0;
			this.array.map(function (value, index, arr) {
				result += value.score;
			});
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
				this.$emit("on-deleterecord");
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

function isNumber(value) {
	var patrn = /^(-)?\d+(\.\d+)?$/;
	if (patrn.exec(value) == null || value == "") {
		return false;
	} else {
		return true;
	}
}

var inputNumber = {
	props: {
		value: {
			type: Number,
			required: true
		},
		maxVal: {
			type: Number,
			default: Infinity
		},
		minVal: {
			type: Number,
			default: -Infinity
		},
		step: { // 累加值
			type: Number,
			default: 1
		}
	},
	template: '<div>\n\t\t\t\t<input :value="myVal"  @change="handleChange" @keyup.up="increase" @keyup.down="decrease"  />\n\t\t\t\t<button @click="decrease" :disabled="myVal<=minVal" >-</button>\n\t\t\t\t<button @click="increase" :disabled="myVal>=maxVal">+</button>\n\t\t\t</div>',
	data: function data() {
		return {
			myVal: -1
		};
	},
	mounted: function mounted() {
		// 为防止 vlue值不在限定范围内，需要进行过滤
		this.updateNum(this.value);
	},

	methods: {
		increase: function increase() {
			this.updateNum(this.myVal + this.step);
		},
		decrease: function decrease() {
			this.updateNum(this.myVal - this.step);
		},
		decreaseTest: function decreaseTest() {
			alert("asdf");
		},
		updateNum: function updateNum(val) {
			// 更新数值,对[minVal,maxVal]区间外值进行过滤；
			if (typeof val === "undefined") {
				return;
			}
			if (val < this.minVal) {
				val = this.minVal;
			} // 重置 val
			if (val > this.maxVal) {
				val = this.maxVal;
			} // 重置 val
			this.myVal = val;
		},
		handleChange: function handleChange(event) {
			// 处理 onchange事件,要 myVal直接赋值。如果交给updateNum,有可能会导致myVal不变，导致输入与data不一致问题。
			var val = event.target.value.trim();
			if (isNumber(val)) {
				val = Number(val);
				this.myVal = val;
				this.updateNum(val); // 更新data中的 myVal
			} else {
				// 重置输入的value
				event.target.value = this.myVal;
			}
		}
	},
	watch: {
		value: function value(newVal) {
			this.updateNum(newVal);
		},
		myVal: function myVal(newVal) {
			// 监听myVal修改，触发props更新,(关联父子组件数据)
			this.$emit("input", newVal);
		}
	}

	// 标签页组件
};var tabs = {
	template: '\n\t\t<div class="tabs">\t\t\t\n\t\t\t<div class="tabs-bar">\n\t\t\t\t<button v-for="(item,index) in navList" @click="">{{item.label}}</button>\n\t\t\t</div> <!--\u8FD9\u91CC\u662F\u6807\u7B7E-->\n\t\t\t<div class="tabs-content"> <!--\u8FD9\u91CC\u662F\u6807\u7B7E-\u5185\u5BB9 -->\n\t\t\t\t <slot></slot>\n\t\t\t</div>\n\t\t</div>\n\t',
	mounted: function mounted() {
		this.getTabs();
	},
	data: function data() {
		return {
			navList: [], //{label:'',name:""}
			currentValue: ""
		};
	},

	methods: {
		getTabs: function getTabs() {
			var panes = this.$children.filter(function (item) {
				return item.$options._componentTag === 'pane';
			});
			console.log(panes);
			return panes;
		},
		updateNav: function updateNav() {
			this.navList = [];
			var _this = this;
			this.getTabs().forEach(function (pane, index) {
				// 遍历 pane子组件
				_this.navList.push({
					label: pane.label,
					name: pane.name || index
				});
				if (!pane.name) {
					pane.name = index;
				}
				if (index === 0) {
					if (!_this.currentValue) {
						_this.currentValue = pane.name || index;
					}
				}
			});
		},

		// 显示控制
		updateStatus: function updateStatus() {
			var tabs = this.getTabs();
			var _this = this;
			tabs.forEach(function (tab) {
				return tab.show = tab.anme === _this.currentValue; // 直接修改 pane 数据
			});
		}
	}

	//  标签页内容面板组件,面板的显示隐藏通过props控制
};var pane = {
	props: {
		name: { // 标签标识符，
			type: [String, Number],
			required: true
		},
		label: { // 标签上显示的名称,类似于浏览器页面的title,是可以动态修改的。【
			type: String,
			default: "标签名",
			required: true
		}
	},
	template: '\n\t\t<div class="pane" v-show="show">\n\t\t\t<slot></slot>\n\t\t</div>\n\t',
	data: function data() {
		return {
			show: false,
			mylabel: this.label
		};
	},

	methods: {
		updateNav: function updateNav() {
			this.$parent.updateNav(); // 调用父组件方法
		}
	},
	watch: {
		label: function label() {
			this.updateNav();
		}
	},
	mounted: function mounted() {
		this.updateNav();
	}
};

// tabPage 用于展示tab组件
var tabPage = {
	template: '<div class="container">\n\t\t\t\t<tab-box />\n\n\t\t\t\t<tabs>\n\t\t\t\t\t<pane  v-for="(item,index) in tabs" :key="index" :name="item.name" :label="item.label" >\n\t\t\t\t\t\t<component  :is="item.component"></component >\n\t\t\t\t\t</pane>\n\t\t\t\t</tabs>\n\n\t\t\t</div>',
	components: {
		"tab-box": tabBox,
		"tabs": tabs,
		"pane": pane,
		"listButton": listButton,
		"todolist": todolist,
		"infoEdit": infoEdit
	},
	data: function data() {
		return {
			tabs: [{ name: "name1", label: "多个按钮", component: "listButton" }, { name: "name2", label: "代办列表", component: "todolist" }, { name: "name3", label: "输入姓名", component: "infoEdit" }, { name: "name4", label: "输入姓名2", component: "infoEdit" }] // 标签列表
		};
	}
};

var simpleCrm = {
	template: '<div>\n\t\t\t\t\t<lt_table @on-deleterecord="deleteRecord"></lt_table>\n\t\t\t\t\t<button class="greenBtn" @click=\'showTips()\'>\u663E\u793Atips</button>\n\t\t\t\t\t<button class="greenBtn" @click=\'toEdit()\'>toEdit</button>\n\t\t\t\t\t<vue-props-tips v-model="tipsShow" :content="textContent" v-on:close="tipsShow=false"></vue-props-tips>\t\n\t\t\t\t\t<input_number v-model="inputNumber" :max-val="60" :min-val="2" :step="1" />\t\t\t\t\t\n\t\t\t\t</div>',
	components: {
		lt_table: lt_table,
		input_number: inputNumber
	},
	data: function data() {
		return {
			inputNumber: 1, // 数字输入框
			textContent: '消息提示测试内容123',
			tipsShow: false

		};
	},

	methods: {
		showTips: function showTips() {
			this.tipsShow = true;
			this.textContent = "tips 显示测试";
		},
		deleteRecord: function deleteRecord() {
			this.tipsShow = true;
			this.textContent = "删除一条记录！";
		},
		toEdit: function toEdit() {
			this.$router.push("/infoEdit");
		}
	}
};