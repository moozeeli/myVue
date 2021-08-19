
var vuePropsTips = {
		props:{
			content:{
				type:String,
				default:"信息提示"
			},
			tipsShow:{
				type:Boolean,
				default:false
			}
		},
		template:'<transition name="slide-fade"><div class="vuePropsTips">{{content}}\
					<span class="closeTipsIcon" @click="closeIips" >X</span>\
				</div></transition>',
		data:function(){
			return {}
		},
		methods:{
			closeIips:function(){
				this.$emit("close"); // 组件中注册close事件，修改data,关闭通知
			}
		}
}